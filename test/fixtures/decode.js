const sharp = require('sharp')

/**
 * decode img to raw RGB|RGBA pixel data
 */

module.exports = async function decode(input) {
  const {data, info} = await sharp(input).raw().toBuffer({resolveWithObject: true})
  const dataRgba = await sharp(input).ensureAlpha().raw().toBuffer()

  // example info
  // info: {
  //   format: 'raw',
  //   width: 750,
  //   height: 1334,
  //   channels: 3,
  //   premultiplied: false,
  //   size: 3001500
  // }
  const {width, height, channels} = info
  return {data, dataRgba, width, height, channels}
}
