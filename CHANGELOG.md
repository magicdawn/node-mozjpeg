# CHANGELOG

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
