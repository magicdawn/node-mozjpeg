#include <napi.h>
#include "./common.h"
#include "./encode.h"
#include "./encode_worker.h"

using namespace Napi;

MozjpegEncodeWorker::MozjpegEncodeWorker(
    Napi::Env &env,
    Promise::Deferred deferred,
    EncodeInput i)
    : AsyncWorker(env), deferred(deferred), input(i){};

MozjpegEncodeWorker::~MozjpegEncodeWorker(){
    // noop
};

// worker thread
void MozjpegEncodeWorker::Execute()
{
  this->result = encode(this->input);
};

// eventloop thread
void MozjpegEncodeWorker::OnOK()
{
  uint8_t *output = this->result.output;
  unsigned long size = this->result.size;

  Buffer<uint8_t> buf =
      Buffer<uint8_t>::New(Env(), output, size, encodeFinalizeCallback);
  this->deferred.Resolve(buf);
};