const assert = require('node:assert')

const tryRelease = () => {
  try {
    // prevent webpack error
    const type = 'Release'
    return require(`./build/${type}/mozjpeg.node`)
  } catch {
    //  noop
  }
}
const tryDebug = () => {
  try {
    // prevent webpack error
    const type = 'Debug'
    return require(`./build/${type}/mozjpeg.node`)
  } catch {
    //  noop
  }
}

const bindings = tryRelease() || tryDebug() || require('bindings')('mozjpeg')

/* eslint camelcase: off */

// from squoosh
const ColorSpace = {
  GRAYSCALE: 1,
  RGB: 2,
  YCbCr: 3,
}

const defaultOptions = {
  quality: 75,
  baseline: false,
  arithmetic: false,
  progressive: true,
  optimize_coding: true,
  smoothing: 0,
  color_space: ColorSpace.YCbCr,
  quant_table: 3,
  trellis_multipass: false,
  trellis_opt_zero: false,
  trellis_opt_table: false,
  trellis_loops: 1,
  auto_subsample: true,
  chroma_subsample: 2,
  separate_chroma_quality: false,
  chroma_quality: 75,
}

/**
 * compress img
 * @param {Buffer} buf
 * @param {number} width
 * @param {number} height
 * @param {object} options
 * @returns {Buffer}
 */

const makeBinding = (fn) =>
  function (buf, width, height, options) {
    const channels = buf.byteLength / width / height
    assert([3, 4].includes(channels), 'channels should be 3 or 4')
    options = Object.assign({}, defaultOptions, options)
    return fn(buf, width, height, channels, options)
  }

const encodeSync = makeBinding(bindings.encodeSync)
const encode = makeBinding(bindings.encode)

module.exports = {
  ColorSpace,
  version: bindings.version,
  encodeSync,
  encode,
}
