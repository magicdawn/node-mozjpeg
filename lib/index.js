const bindings = require('bindings')('mozjpeg')

/* eslint camelcase: off */

const defaultOptions = {
  quality: 75,
  baseline: false,
  arithmetic: false,
  progressive: true,
  optimize_coding: true,
  smoothing: 0,
  color_space: 3, // J_COLOR_SPACE.JCS_YCbCr
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

async function encode(data, width, height, options) {
  options = Object.assign({}, defaultOptions, options)
  const compressed = await bindings.encode(data, width, height, options)

  console.log(compressed)

  // compressed is Uint8Array
  // const buf = Buffer.from(compressed)
  // return buf
}

module.exports = {
  version: bindings.version,
  encode,
}
