{
  "targets": [
    {
      "target_name": "mozjpeg",
      'defines': [
        'NAPI_VERSION=3'
      ],
      "libraries": ["<(module_root_dir)/node_modules/mozjpeg-src/.libs/libjpeg.a"],
      "sources": [
        "node_modules/mozjpeg-src/rdswitch.c",
        "src/encode.cc",
        "src/encode_worker.cc",
        "src/mozjpeg.cc"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "node_modules/mozjpeg-src/"
      ],
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
        'CLANG_CXX_LANGUAGE_STANDARD': 'c++11',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7',
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'GCC_ENABLE_CPP_RTTI': 'YES'
      },
      "msvs_settings": {
        "VCCLCompilerTool": {
          "ExceptionHandling": 1
        }
      },
    }
  ]
}
