{
  "targets": [
    {
      "target_name": "mozjpeg",
      'defines': [
        'NAPI_VERSION=3'
      ],
      "libraries": ["<(module_root_dir)/node_modules/mozjpeg-src/.libs/libjpeg.a"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "node_modules/mozjpeg-src/"
      ],
      "sources": [
        "node_modules/mozjpeg-src/rdswitch.c",
        "src/encode.cc",
        "src/encode_worker.cc",
        "src/mozjpeg.cc"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "xcode_settings": {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7'
      },
      "msvs_settings": {
        "VCCLCompilerTool": {
          "ExceptionHandling": 1
        }
      },
      "conditions": [
        [
          'OS=="mac"',
          {
            'cflags+': ['-fvisibility=hidden'],
            'xcode_settings': {
              'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES', # -fvisibility=hidden
            }
          }
        ]
      ]
    }
  ]
}
