const { performance } = require('node:perf_hooks')
const start = performance.now()
const assert = require('node:assert')
const fs = require('node:fs')

const path = require('node:path')
const blocked = require('blocked')
const blockedAt = require('blocked-at')

// const {encode: encodeUseWasm} = require('handy-img/lib/codec/mozjpeg.js')
const bytes = require('bytes')
const sleep = require('promise.sleep')
const { encodeSync, encode } = require('..')
// cnpm i blocked-at blocked promise.sleep
const decode = require('../test/fixtures/decode')

const img = path.join(`${__dirname}/../test/fixtures/test.jpg`)
console.log(img)

// NOTE: blockedAt stacktrace 不准
// blockedAt((time, stack) => {
//   console.log(`Blocked for ${time}ms, operation started here:`, stack)
// })

blocked(
  (ms) => {
    console.log(`!!! Blocked for ${ms}ms`)
  },
  { threshold: 50, interval: 10 },
)

// blockedAt((time, stack) => {
//   console.log(`Blocked for ${time}ms, operation started here:`, stack)
// })

async function main() {
  const { data, dataRgba, width, height, channels } = await decode(img)
  assert(data.byteLength === width * height * channels)

  {
    console.log('---------------------addon encodeSync-----------------')
    const s = performance.now()
    const encoded = encodeSync(dataRgba, width, height)
    console.log(encoded, bytes(encoded.byteLength))
    fs.writeFileSync(`${__dirname}/compress-via-addon-encode.jpg`, encoded)
    console.log('time encode-use-addon %sms', (performance.now() - s).toFixed())
    console.log('---------------------addon encodeSync-----------------')
  }

  {
    console.log('---------------------addon encode-----------------')
    const s = performance.now()
    const encoded = await encode(dataRgba, width, height)
    console.log(encoded, bytes(encoded.byteLength))
    fs.writeFileSync(`${__dirname}/compress-via-addon-encodeAsync.jpg`, encoded)
    console.log('time encode-use-addon %sms', (performance.now() - s).toFixed())
    console.log('---------------------addon encode-----------------')
  }

  // {
  //   console.log('---------------------wasm-----------------')
  //   const s = performance.now()
  //   const encoded = await encodeUseWasm(data, width, height)
  //   console.log(encoded, bytes(encoded.byteLength))
  //   fs.writeFileSync(__dirname + '/compress-via-wasm.jpg', encoded)
  //   console.log('time encode-use-wasm %sms', (performance.now() - s).toFixed())
  //   console.log('---------------------wasm-----------------')
  // }

  console.log('total time %sms', (performance.now() - start).toFixed())

  // wait report wasm block
  await sleep('1s')
}

main().catch((e) => console.error(e.stack || e))
