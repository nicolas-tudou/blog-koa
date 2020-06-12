export default class ImageUpload {
  static async uploaded(ctx) {
    ctx.body = {
      success: true,
      data: {
        imgUrl: 'http://todo-fordream.club/' + ctx.req.file.path.replace(/.*static\//, ''),
        msg: '图片上传成功'
      }
    }
  }
}
