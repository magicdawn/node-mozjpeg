#pragma once

#include <napi.h>
#include "./common.h"

using namespace Napi;

class MozjpegEncodeWorker : public AsyncWorker
{
public:
  MozjpegEncodeWorker(Napi::Env &env, Promise::Deferred deferred, EncodeInput i);
  ~MozjpegEncodeWorker();

  // This code will be executed on the worker thread
  void Execute() override;
  void OnOK() override;

private:
  // for promise
  Promise::Deferred deferred;

  // for encode
  EncodeInput input;
  EncodeResult result;
};