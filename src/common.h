#pragma once

#include <inttypes.h>
#include <napi.h>

struct MozJpegOptions
{
  int quality;
  bool baseline;
  bool arithmetic;
  bool progressive;
  bool optimize_coding;
  int smoothing;
  int color_space;
  int quant_table;
  bool trellis_multipass;
  bool trellis_opt_zero;
  bool trellis_opt_table;
  int trellis_loops;
  bool auto_subsample;
  int chroma_subsample;
  bool separate_chroma_quality;
  int chroma_quality;
};

struct EncodeInput
{
  uint8_t *input;
  int width;
  int height;
  MozJpegOptions options;
};

struct EncodeResult
{
  uint8_t *output;
  unsigned long size;
};