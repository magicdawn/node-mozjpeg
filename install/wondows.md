use mingw-w64 run

```sh
cd node_modules/mozjpeg-src
export JPEG_LIB_VERSION="80"
autoreconf -fiv
```

use VS command promot to run

```sh
cd node_modules/mozjpeg-src
mkdir build

cd build
cmake -G"NMake Makefiles" -DCMAKE_BUILD_TYPE=Release ../
nmake jpeg-static
```

use `node_modules/mozjpeg-src/build/jpeg-static.lib`
