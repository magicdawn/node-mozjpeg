const path = require('path')
const decode = require('../test/fixtures/decode')
const {encodeSync, encode} = require('..')
// const {encode: encodeUseWasm} = require('handy-img/lib/codec/mozjpeg.js')
const assert = require('assert')
const {Suite} = require('benchmark')

const suite = new Suite()
const img = path.join(__dirname + '/../test/fixtures/test.jpg')

async function main() {
  const {data, width, height, channels} = await decode(img)
  assert(data.byteLength === width * height * channels)

  suite
    .add('node-mozjpeg encode', {
      defer: true,
      fn(defered) {
        ;(async () => {
          const encoded = await encode(data, width, height)
        })().then(
          () => defered.resolve(),
          (e) => {
            throw e
          }
        )
      },
    })
    .add('node-mozjpeg encodeSync', () => {
      const encoded = encodeSync(data, width, height)
    })

    //
    // can not complete benchmark
    // RuntimeError: memory access out of bounds
    //
    // .add('wasm', {
    //   defer: true,
    //   fn(defered) {
    //     ;(async () => {
    //       const encoded = await encodeUseWasm(data, width, height)
    //     })().then(
    //       () => defered.resolve(),
    //       (e) => {
    //         throw e
    //       }
    //     )
    //   },
    // })
    // add listeners
    .on('cycle', function (event) {
      console.log(String(event.target))
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    // run async
    .run({async: true})
}
main()
