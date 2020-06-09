{
  "targets": [
    {
      "target_name": "mozjpeg",
      "sources": [
        "src/*.cc",
        "node_modules/mozjpeg-src/.libs/libjpeg.a",
        "node_modules/mozjpeg-src/rdswitch.c"
      ],
      "cflags!": ["-fno-exceptions", "-x c++", "-std=c++11", "-Wsign-compare"],
      "cflags_cc!": ["-fno-exceptions", "-x c++", "-std=c++11", "-Wsign-compare"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "node_modules/mozjpeg-src/"
      ],
      "link_settings": {
        "conditions": [
          [
            "OS=='mac'",
            {
              "cflags+": ["-fvisibility=hidden"],
              "xcode_settings": {
                "GCC_SYMBOLS_PRIVATE_EXTERN": "YES"
              }
            }
          ]
        ]
      },
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
        "CLANG_CXX_LIBRARY": "libc++",
        "MACOSX_DEPLOYMENT_TARGET": "10.7"
      },
      "msvs_settings": {
        "VCCLCompilerTool": {"ExceptionHandling": 1}
      }
    }
  ]
}
