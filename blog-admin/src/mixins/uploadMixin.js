export default {
  data () {
    return {
      showPreviewImg: false,
      imgUploadHeader: {
        Authorization: 'Bearer ' + localStorage.getItem('token') || ''
      }
    }
  },
  methods: {
    previewImage () {
      this.showPreviewImg = true
    },
    cancelPreview () {
      this.showPreviewImg = false
    }
  }
}