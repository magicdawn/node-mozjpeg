<!-- AUTO_GENERATED_UNTOUCHED_FLAG -->

# node-mozjpeg

> mozjpeg node binding

[![Build Status](https://img.shields.io/travis/magicdawn/node-mozjpeg.svg?style=flat-square)](https://travis-ci.org/magicdawn/node-mozjpeg)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/node-mozjpeg.svg?style=flat-square)](https://codecov.io/gh/magicdawn/node-mozjpeg)
[![npm version](https://img.shields.io/npm/v/node-mozjpeg.svg?style=flat-square)](https://www.npmjs.com/package/node-mozjpeg)
[![npm downloads](https://img.shields.io/npm/dm/node-mozjpeg.svg?style=flat-square)](https://www.npmjs.com/package/node-mozjpeg)
[![npm license](https://img.shields.io/npm/l/node-mozjpeg.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ npm i -S node-mozjpeg
```

## API

```js
const mozjpeg = require('node-mozjpeg')
```

### encode

```ts
export const version: string

export enum ColorSpace {
  GRAYSCALE = 1,
  RGB,
  YCbCr,
}

export interface EncodeOptions {
  quality: number
  baseline: boolean
  arithmetic: boolean
  progressive: boolean
  optimize_coding: boolean
  smoothing: number
  color_space: ColorSpace
  quant_table: number
  trellis_multipass: boolean
  trellis_opt_zero: boolean
  trellis_opt_table: boolean
  trellis_loops: number
  auto_subsample: boolean
  chroma_subsample: number
  separate_chroma_quality: boolean
  chroma_quality: number
}

export function encode(input: Buffer, width: number, height: number, options: EncodeOptions): Buffer
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
