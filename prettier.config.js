module.exports = {
  ...require('@magicdawn/prettier-config'),
  overrides: [
    {
      files: 'binding.gyp',
      options: {parser: 'json'},
    },
  ],
}
