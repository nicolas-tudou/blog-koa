import multer from 'koa-multer'
const path = require('path')

function getStorage() {
  return multer.diskStorage({
    destination: path.resolve(__dirname, `../../../../static/upload/image/${new Date().getFullYear()}/${new Date().getMonth() + 1}`),
    filename(ctx, file, cb) {
      let filenames = file.originalname.split('.')
      let suffix = filenames.pop()
      cb(null, `${filenames.join('_')}.${Date.now()}.${suffix}`)
    }
  })
}

export default multer({ storage: getStorage() }).single('file')
