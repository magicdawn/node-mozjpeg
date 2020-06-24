# node-mozjpeg

> mozjpeg node binding

[![Build Status](https://img.shields.io/travis/magicdawn/node-mozjpeg.svg?style=flat-square)](https://travis-ci.org/magicdawn/node-mozjpeg)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/node-mozjpeg.svg?style=flat-square)](https://codecov.io/gh/magicdawn/node-mozjpeg)
[![npm version](https://img.shields.io/npm/v/node-mozjpeg.svg?style=flat-square)](https://www.npmjs.com/package/node-mozjpeg)
[![npm downloads](https://img.shields.io/npm/dm/node-mozjpeg.svg?style=flat-square)](https://www.npmjs.com/package/node-mozjpeg)
[![npm license](https://img.shields.io/npm/l/node-mozjpeg.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Features

- [x] for a 10MB jpeg file, 2x fast than squoosh or @saschazar/wasm-mozjpeg wasm version.
- [x] None blocking mozjpeg compress. (u should wrap wasm version it in a WebWorker or node.js Worker)

## Install

```sh
$ npm i -S node-mozjpeg
```

## API

```js
const mozjpeg = require('node-mozjpeg')
```

### types

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
```

### encodeSync

this will **block** the EventLoop, **do not** use in production

```ts
export function encodeSync(
  input: Buffer,
  width: number,
  height: number,
  options?: EncodeOptions
): Buffer
```

### encode

same as `encodeSync` except it's using libuv to encode and return Promise

```ts
export function encode(
  input: Buffer,
  width: number,
  height: number,
  options?: EncodeOptions
): Promise<Buffer>
```

### defaultOptions

```js
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
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License [LICENSE](LICENSE)
