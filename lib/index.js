const bindings = require('bindings')('mozjpeg')

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
 * @param {Object} options
 * @returns {Buffer}
 */

function encodeSync(buf, width, height, options) {
  options = Object.assign({}, defaultOptions, options)
  return bindings.encodeSync(buf, width, height, options)
}

function encode(buf, width, height, options) {
  options = Object.assign({}, defaultOptions, options)
  return bindings.encode(buf, width, height, options)
}

module.exports = {
  ColorSpace,
  version: bindings.version,
  encodeSync,
  encode,
}
