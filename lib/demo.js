const {encode} = require('./index')
const {decode} = require('/Users/magicdawn/projects/handy-img/lib/codec/decode.js')

const img = '/Users/magicdawn/Pictures/pap.er/44oFcp01cVU.jpg'

async function main() {
  const {data, width, height} = await decode(img)
  const encoded = await encode(Buffer.from(data), width, height)
  console.log(encoded)
}

main()
