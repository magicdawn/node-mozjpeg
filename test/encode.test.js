const should = require('should')
const sharp = require('sharp')
const {encode, encodeSync} = require('..')

const file = __dirname + '/fixtures/test.jpg'

/**
 * decode img to raw RGB|RGBA pixel data
 */

async function decode(input) {
  const {data, info} = await sharp(input).raw().toBuffer({resolveWithObject: true})

  // example info
  // info: {
  //   format: 'raw',
  //   width: 750,
  //   height: 1334,
  //   channels: 3,
  //   premultiplied: false,
  //   size: 3001500
  // }
  const {width, height} = info

  return {data, width, height}
}

describe('encode', function () {
  it('encodeSync', async function () {
    const {data, width, height} = await decode(file)
    const buf = encodeSync(data, width, height)
    buf.should.be.instanceof(Buffer)
    buf.length.should.above(0)
  })

  it('encode', async () => {
    const {data, width, height} = await decode(file)
    const buf = await encode(data, width, height)
    buf.should.be.instanceof(Buffer)
    buf.length.should.above(0)
  })
})
