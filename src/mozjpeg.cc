#include <inttypes.h>
#include <iostream>
#include <setjmp.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// prevent format
#include "./common.h"
#include "./encode.h"
#include "./encode_worker.h"
#include <jpeglib.h>
#include <napi.h>

//
// take from here
// https://raw.githubusercontent.com/GoogleChromeLabs/squoosh/master/codecs/mozjpeg_enc/mozjpeg_enc.cpp
// https :
// //github.com/saschazar21/webassembly/blob/%40saschazar/wasm-webp%401.3.1/packages/mozjpeg/main.cpp
//

extern "C" {
#include "cdjpeg.h"
}

using namespace Napi;
using namespace std;

// MozJPEG doesn’t expose a numeric version, so I have to do some fun C macro
// hackery to turn it into a string. More details here:
// https://gcc.gnu.org/onlinedocs/cpp/Stringizing.html
#define xstr(s) str(s)
#define str(s) #s

bool inline checkParameters(const CallbackInfo &info) {
  Env env = info.Env();

  if (info.Length() < 5) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return false;
  }

  // !info[0].IsBuffer() ||
  if (!info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsNumber() ||
      !info[4].IsObject()) {
    Napi::TypeError::New(env, "expect (buf: Buffer, width: number, height: "
                              "number, channels: number, options: Object")
        .ThrowAsJavaScriptException();
    return false;
  }

  return true;
}

Value BindEncodeSync(const CallbackInfo &info) {
  Env env = info.Env();
  HandleScope scope(env);

  bool next = checkParameters(info);
  if (!next) {
    return env.Null();
  }

  // EncodeInput i = getEncodeInput(info);
  // #ifdef DEBUG
  // printf("i.input = 0x%" PRIXPTR "\n", (uintptr_t)i.input);
  // printf("i.input is %s \n", i.input == NULL ? "empty" : "not empty");
  // printf("width = %d, height = %d, i.options.quality = %d \n", i.width,
  // i.height, i.options.quality); #endif

  Buffer<uint8_t> buf = info[0].As<Buffer<uint8_t>>();
  int width = info[1].As<Number>().Int32Value();
  int height = info[2].As<Number>().Int32Value();
  int channels = info[3].As<Number>().Int32Value();
  Object options = info[4].ToObject();
  EncodeInput i = {buf.Data(), width, height, channels,
                   getMozjpegOptions(options)};

  EncodeResult encodeResult = encode(i);
  uint8_t *output = encodeResult.output;
  unsigned long size = encodeResult.size;

  Buffer<uint8_t> result =
      Buffer<uint8_t>::New(env, output, size, encodeFinalizeCallback);
  return result;
}

Value BindEncode(const CallbackInfo &info) {
  Env env = info.Env();
  bool next = checkParameters(info);
  if (!next) {
    return env.Null();
  }

  Buffer<uint8_t> buf = info[0].As<Buffer<uint8_t>>();
  int width = info[1].As<Number>().Int32Value();
  int height = info[2].As<Number>().Int32Value();
  int channels = info[3].As<Number>().Int32Value();
  Object options = info[4].ToObject();
  EncodeInput i = {buf.Data(), width, height, channels,
                   getMozjpegOptions(options)};

  Promise::Deferred d = Promise::Deferred::New(env);

  MozjpegEncodeWorker *w = new MozjpegEncodeWorker(env, d, i);
  w->Queue();

  return d.Promise();
}

#define export_function(name, fn)                                              \
  exports.Set(String::New(env, name), Function::New<fn>(env))

Object Init(Env env, Object exports) {
  // version
  exports.Set(String::New(env, "version"),
              String::New(env, xstr(MOZJPEG_VERSION)));

  // encode
  export_function("encodeSync", BindEncodeSync);

  // encodeAsync
  export_function("encode", BindEncode);

  return exports;
}

NODE_API_MODULE(mozjpeg, Init)
