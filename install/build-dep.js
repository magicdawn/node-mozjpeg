// napa &&
//

// set -e
//
// export OPTIMIZE="-Oz"
// export LDFLAGS="${OPTIMIZE}"
// export CFLAGS="${OPTIMIZE}"
// export CPPFLAGS="${OPTIMIZE}"
//
//
// cd node_modules/mozjpeg-src/
// autoreconf -fiv
// JPEG_LIB_VERSION="80" ./configure --without-simd
// make libjpeg.la
// exit 0

const {join} = require('path')
const {execSync} = require('child_process')
const fs = require('fs')

const exec = (cmd) => {
  console.log('[exec]: %s', cmd)
  execSync(cmd, {
    stdio: 'inherit',
  })
}

// download
exec('npx napa')

// build
const mozjpegDir = `${__dirname}/../node_modules/mozjpeg-src`
const libFile = `${mozjpegDir}/.libs/libjpeg.a`

if (fs.existsSync(libFile) && !process.env.FORCE_BUILD_MOZJPEG) {
  process.exit(0)
}

// env
const OPTIMIZE = '-Oz'
Object.assign(process.env, {
  OPTIMIZE,
  LDFLAGS: OPTIMIZE,
  CFLAGS: OPTIMIZE,
  CPPFLAGS: OPTIMIZE,
  JPEG_LIB_VERSION: '80',
})

process.chdir(mozjpegDir)
exec('autoreconf -fiv')
exec('./configure --without-simd')
exec('make libjpeg.la')
