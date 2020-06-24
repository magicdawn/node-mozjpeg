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

{% block extra %}
{% endblock %}

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License [LICENSE](LICENSE)
