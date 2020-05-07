import jwt from '../lib/jwt'
import ImgUpload from '../controller/imgUpload'
import multer from '../lib/multer'

export default router => {
  router.post('/api/common/upload/image', jwt, multer, ImgUpload.uploaded)
}
