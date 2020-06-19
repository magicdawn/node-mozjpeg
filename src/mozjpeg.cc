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
#include "common.h"
#include "encode.h"
#include "encode_worker.h"

//
// take from here
// https://raw.githubusercontent.com/GoogleChromeLabs/squoosh/master/codecs/mozjpeg_enc/mozjpeg_enc.cpp
// https :
// //github.com/saschazar21/webassembly/blob/%40saschazar/wasm-webp%401.3.1/packages/mozjpeg/main.cpp
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

bool inline checkParameters(const CallbackInfo &info)
{
  Env env = info.Env();

  if (info.Length() < 4)
  {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return false;
  }

  // !info[0].IsBuffer() ||
  if (!info[1].IsNumber() || !info[2].IsNumber() || !info[3].IsObject())
  {
    Napi::TypeError::New(
        env,
        "expect (buf: Buffer, width: number, height: number, options: Object")
        .ThrowAsJavaScriptException();
    return false;
  }

  return true;
}

Value BindEncode(const CallbackInfo &info)
{
  Env env = info.Env();
  bool next = checkParameters(info);
  if (!next)
  {
    return env.Null();
  }

  EncodeInput i = getEncodeInput(info);
  EncodeResult encodeResult = encode(i);
  uint8_t *output = encodeResult.output;
  unsigned long size = encodeResult.size;
  // cout << "encodeResult.size = " << size << endl;

  Buffer<uint8_t> result =
      Buffer<uint8_t>::New(env, output, size, encodeFinalizeCallback);
  return result;
}

Value BindEncodeAsync(const CallbackInfo &info)
{
  Env env = info.Env();
  bool next = checkParameters(info);
  if (!next)
  {
    return env.Null();
  }

  EncodeInput i = getEncodeInput(info);
  Promise::Deferred d = Promise::Deferred::New(env);

  MozjpegEncodeWorker *w = new MozjpegEncodeWorker(env, d, i);
  w->Queue();

  return d.Promise();
}

#define export_function(name, fn) \
  exports.Set(String::New(env, name), Function::New<fn>(env))

Object Init(Env env, Object exports)
{
  // version
  exports.Set(String::New(env, "version"),
              String::New(env, xstr(MOZJPEG_VERSION)));

  // encode
  export_function("encode", BindEncode);

  // encodeAsync
  export_function("encodeAsync", BindEncodeAsync);

  return exports;
}

NODE_API_MODULE(mozjpeg, Init)