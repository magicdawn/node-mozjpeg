# CHANGELOG

## v0.4.1 2020-12-21

- fix `symbol not found ____chkstk_darwin` issue on macOS 10.12.6, see [stackoverflow](https://stackoverflow.com/questions/61889358/macos-app-compiled-with-deployment-10-10-on-catalina-crashes-on-versions-highs)

## v0.4.0 2020-11-13

- sync encode.cc code from squoosh, to fix specific img in dc.
- remove support for channels=3, require ImageData like channels=4

## v0.3.2 2020-10-21

- use `-fPIC` to fix Linux builds, but no prebuilds.

## v0.3.1 2020-10-20

- fix `const {assert} = require('console')` vscode auto import to `const assert = require('assert')`

## v0.3.0 2020-10-19

- the binding need channels info, decide by `buf.byteLength / width / height` in js lib

## v0.2.3 2020-10-19

- fix prev version error

## v0.2.2 2020-10-19

- like `simple-mac-clipboard`, make this module webpack friendly and external-able

## v0.2.1 2020-07-02

- adapt windows prebuild, some c++ source modifications

## v0.2.0 2020-06-23

- rename `encode` to `encodeSync`, `encodeAsync` to `encode`

## v0.1.3 2020-06-23

- remove wrapper `async`, `encode` & `encodeAsync` are plain functions returns `bindings[method]()`

## v0.1.2 2020-06-23

- add jsdelivr binary host

## v0.1.1 2020-06-23

- prevent `types/index.test-d.ts` from publish

## v0.1.0 2020-06-23

- add `Napi::AsyncWorker` version `encodeAsync`, do not block the EventLoop

## v0.0.3 2020-06-19

- fix `prebuild-install` command not found

## v0.0.2 2020-06-19

- fix package.json install script, when prebuild-install download success, do not build

## v0.0.1 2020-06-02

- first release
