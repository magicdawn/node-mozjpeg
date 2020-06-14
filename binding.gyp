{
  "targets": [
    {
      "target_name": "mozjpeg",
      "sources": [
        "src/*.cc",
        "node_modules/mozjpeg-src/.libs/libjpeg.a",
        "node_modules/mozjpeg-src/rdswitch.c"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "node_modules/mozjpeg-src/"
      ],
      "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
      "conditions": [
        [
          "OS=='win'",
          {
            "defines": ["uint=unsigned int"]
          }
        ],
        [
          "OS=='mac'",
          {
            "cflags+": ["-fvisibility=hidden"],
          }
        ]
      ],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
        "CLANG_CXX_LIBRARY": "libc++",
        "GCC_SYMBOLS_PRIVATE_EXTERN": "YES"
      },
      "msvs_settings": {
        "VCCLCompilerTool": {
          "ExceptionHandling": 1
        }
      },
    }
  ]
}
