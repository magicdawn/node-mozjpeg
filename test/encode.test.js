const decode = require('./fixtures/decode')
const {encode, encodeSync} = require('..')

const file = __dirname + '/fixtures/test.jpg'

describe('encode', function () {
  it('encodeSync', async function () {
    const {data, dataRgba, width, height} = await decode(file)
    let buf

    // channels=4
    buf = encodeSync(dataRgba, width, height)
    buf.should.be.instanceof(Buffer)
    buf.length.should.above(0)
  })

  it('encode', async () => {
    const {data, dataRgba, width, height} = await decode(file)
    let buf

    // channels=4
    buf = await encode(dataRgba, width, height)
    buf.should.be.instanceof(Buffer)
    buf.length.should.above(0)
  })
})
