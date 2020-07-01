#include <inttypes.h>
#include <iostream>
#include <setjmp.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// prevent format
#include <config.h>
#include <jpeglib.h>
#include <napi.h>
#include "./common.h"
#include "./encode.h"

//
// take from here
// https://raw.githubusercontent.com/GoogleChromeLabs/squoosh/master/codecs/mozjpeg_enc/mozjpeg_enc.cpp
// https : //github.com/saschazar21/webassembly/blob/%40saschazar/wasm-webp%401.3.1/packages/mozjpeg/main.cpp
//

extern "C"
{
#include "cdjpeg.h"
}

using namespace Napi;
using namespace std;

// MozJPEG doesn’t expose a numeric version, so I have to do some fun C macro
// hackery to turn it into a string. More details here:
// https://gcc.gnu.org/onlinedocs/cpp/Stringizing.html
#define xstr(s) str(s)
#define str(s) #s

EncodeResult encode(const EncodeInput &i)
{
  // deconstruct
  uint8_t *image_in = i.input;
  int image_width = i.width;
  int image_height = i.height;
  MozJpegOptions opts = i.options;

  uint8_t *buffer = image_in;
  uint8_t *output;

  int channels = 3;
  int height;
  int width;
  int row_stride;
  unsigned long length = 0;

  width = image_width;
  height = image_height;
  row_stride = width * channels;

  JSAMPROW row_pointer[1];
  struct jpeg_error_mgr jerr;
  struct jpeg_compress_struct compress;

  compress.err = jpeg_std_error(&jerr);

  jpeg_create_compress(&compress);
  jpeg_mem_dest(&compress, &output, &length);

  compress.image_width = width;
  compress.image_height = height;
  compress.input_components = channels;
  compress.in_color_space = JCS_RGB;

  jpeg_set_defaults(&compress);
  jpeg_set_colorspace(&compress, (J_COLOR_SPACE)opts.color_space);

  if (opts.quant_table != -1)
  {
    jpeg_c_set_int_param(&compress, JINT_BASE_QUANT_TBL_IDX, opts.quant_table);
  }

  compress.optimize_coding = opts.optimize_coding;

  if (opts.arithmetic)
  {
    compress.arith_code = TRUE;
    compress.optimize_coding = FALSE;
  }

  compress.smoothing_factor = opts.smoothing;

  jpeg_c_set_bool_param(&compress, JBOOLEAN_USE_SCANS_IN_TRELLIS,
                        opts.trellis_multipass);
  jpeg_c_set_bool_param(&compress, JBOOLEAN_TRELLIS_EOB_OPT,
                        opts.trellis_opt_zero);
  jpeg_c_set_bool_param(&compress, JBOOLEAN_TRELLIS_Q_OPT,
                        opts.trellis_opt_table);
  jpeg_c_set_int_param(&compress, JINT_TRELLIS_NUM_LOOPS, opts.trellis_loops);

  std::string quality_str = std::to_string(opts.quality);

  if (opts.separate_chroma_quality && opts.color_space == JCS_YCbCr)
  {
    quality_str += "," + std::to_string(opts.chroma_quality);
  }

  char const *pqual = quality_str.c_str();

  set_quality_ratings(&compress, (char *)pqual, opts.baseline);

  if (!opts.auto_subsample && opts.color_space == JCS_YCbCr)
  {
    compress.comp_info[0].h_samp_factor = opts.chroma_subsample;
    compress.comp_info[0].v_samp_factor = opts.chroma_subsample;
  }

  if (!opts.baseline && opts.progressive)
  {
    jpeg_simple_progression(&compress);
  }
  else
  {
    compress.num_scans = 0;
    compress.scan_info = NULL;
  }

  jpeg_start_compress(&compress, TRUE);

  while (compress.next_scanline < compress.image_height)
  {
    row_pointer[0] = &buffer[compress.next_scanline * row_stride];
    jpeg_write_scanlines(&compress, row_pointer, 1);
  }

  jpeg_finish_compress(&compress);
  jpeg_destroy_compress(&compress);

  EncodeResult ret = {output, length};
  return ret;
}

MozJpegOptions getMozjpegOptions(const Object &o)
{
  MozJpegOptions options;
#define mozjpeg_options_get_int(prop) \
  options.prop = o.Get(#prop).As<Number>().Int32Value()
#define mozjpeg_options_get_bool(prop) options.prop = o.Get(#prop).As<Boolean>()

  mozjpeg_options_get_int(quality);
  mozjpeg_options_get_bool(baseline);
  mozjpeg_options_get_bool(arithmetic);
  mozjpeg_options_get_bool(progressive);
  mozjpeg_options_get_bool(optimize_coding);
  mozjpeg_options_get_int(smoothing);
  mozjpeg_options_get_int(color_space);
  mozjpeg_options_get_int(quant_table);
  mozjpeg_options_get_bool(trellis_multipass);
  mozjpeg_options_get_bool(trellis_opt_zero);
  mozjpeg_options_get_bool(trellis_opt_table);
  mozjpeg_options_get_int(trellis_loops);
  mozjpeg_options_get_bool(auto_subsample);
  mozjpeg_options_get_int(chroma_subsample);
  mozjpeg_options_get_bool(separate_chroma_quality);
  mozjpeg_options_get_int(chroma_quality);

#undef mozjpeg_options_get_int
#undef mozjpeg_options_get_bool
  return options;
}

EncodeInput getEncodeInput(const CallbackInfo &info)
{
  // EscapableHandleScope escope(info.Env());
  // escope.Escape(buf).As<Buffer<uint8_t>>().Data(),

  Buffer<uint8_t> buf = info[0].As<Buffer<uint8_t>>();
  int width = info[1].As<Number>().Int32Value();
  int height = info[2].As<Number>().Int32Value();
  Object options = info[3].ToObject();

  EncodeInput i = {
      buf.Data(),
      width,
      height,
      getMozjpegOptions(options)};
  return i;
}

void encodeFinalizeCallback(Napi::Env env, uint8_t *data)
{
  delete[] data;
}