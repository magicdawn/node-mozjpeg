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
process.chdir(mozjpegDir)

// cmds
if (process.platform === 'win32') {
  if (isIa32()) {
    console.log('[build win32-ia32]')
    buildWinIa32()
  } else {
    console.log('[build win32-x64]')
    buildWin()
  }
} else {
  console.log('[build unix]')
  buildUnix()
}

function buildUnix() {
  const libFile = `${mozjpegDir}/.libs/libjpeg.a`

  if (fs.existsSync(libFile) && !process.env.FORCE_BUILD_MOZJPEG) {
    return
  }

  // env
  const OPTIMIZE = '-O3'
  Object.assign(process.env, {
    OPTIMIZE,
    LDFLAGS: OPTIMIZE,
    CFLAGS: OPTIMIZE,
    CPPFLAGS: OPTIMIZE,
    JPEG_LIB_VERSION: '80',
  })

  // require autoconf libtool etc... on mac // Linux not tested
  exec('autoreconf -fiv')

  try {
    exec('./configure --without-simd')
  } catch (e) {
    console.log('config error, config.log : ')
    exec('cat config.log')
    throw e
  }

  exec('make libjpeg.la')
}

function buildWin() {
  // env
  Object.assign(process.env, {
    JPEG_LIB_VERSION: '80',
  })

  // require cmake & nmake & nasm & `cl.exe`(visual studio)
  exec('cmake -G"NMake Makefiles" -DCMAKE_BUILD_TYPE=Release ./')
  exec('nmake jpeg-static')
}

// windows 32bit
function buildWinIa32() {
  const flags = '-m32'
  Object.assign(process.env, {
    LDFLAGS: flags,
    CFLAGS: flags,
    CPPFLAGS: flags,
  })

  // same
  buildWin()
}

function isIa32() {
  if (process.env.npm_config_arch === 'ia32') return true

  for (let item of process.argv) {
    if (item && item.includes('ia32')) {
      return true
    }
  }

  return false
}
