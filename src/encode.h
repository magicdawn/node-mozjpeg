#pragma once

#include <napi.h>
#include "./common.h"

using namespace Napi;

// encode
EncodeResult encode(EncodeInput i);

// getOption
MozJpegOptions getMozjpegOptions(const Napi::Object &o);

// getEncodeInput
EncodeInput getEncodeInput(const CallbackInfo &info);

void encodeFinalizeCallback(Napi::Env env, uint8_t *data);