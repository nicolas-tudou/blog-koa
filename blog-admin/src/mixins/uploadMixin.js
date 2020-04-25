export default {
  data () {
    return {
      showPreviewImg: false,
      imgUploadHeader: {
        token: ''
      }
    }
  },
  methods: {
    beforeUpload (e) {
      console.log(e)
    },
    uploadImage (e) {
      console.log(e)
    },
    previewImage (e) {
      console.log(e)
      this.showPreviewImg = true
    },
    cancelPreview () {
      this.showPreviewImg = false
    }
  }
}