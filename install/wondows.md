## create windows prebuilds

- clone or download source
- clean up prebuilds dir

### 64bit

- open visual studio **x64** prompt, cd to source dir
- yarn run build-native
- yarn run prebuild

### 32bit

- open visual studio **x64** prompt, cd to source dir
- yarn run build-native-ia32
- yarn run prebuild --arch ia32

then `prebuilds` dir are ok

---

use VS command promot to run

```sh
# build
cd node_modules/mozjpeg-src
cmake -G"NMake Makefiles" -DCMAKE_BUILD_TYPE=Release ./
nmake jpeg-static
```

use `node_modules/mozjpeg-src/build/jpeg-static.lib`
