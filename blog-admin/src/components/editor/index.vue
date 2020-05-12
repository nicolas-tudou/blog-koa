<template>
  <div :id="id"></div>
</template>

<script>
import { v4 as uuid4 } from 'uuid'
import jquery from 'jquery'
export default {
  name: 'Editor',
  props: {
    id: {
      type: String,
      default: uuid4()
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      editor: null,
      defaultOptions: {
        mode: 'markdown',
        path : '/lib/editor.md/lib/',
        value: '',
        markDown: '',
        placeholder: '开始创建博客啦～～',
        saveHTMLToTextarea: true,
        readOnly: false,
        tabSize: 2,
        indentUnit: 2,
        lineNumbers: false,
        imageUpload: true,
        imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
        imageUploadURL: '',
        crossDomainUpload: true,
        uploadCallbackURL: '',
        tocm: true,
        tocDropdown: true,
        flowChart: true,
        sequenceDiagram: true,
        onchange: this.editorChange,
        onload: this.editorLoad
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.requireEditor(() => {
        this.editor = window.editormd(this.id, this.getOptions())
      })
    }, 700)
  },
  methods: {
    /**
     * @function 获取编辑器配置信息
     */
    getOptions () {
      return Object.assign({}, this.defaultOptions, this.options)
    },
    /**
     * @function 生成编辑器
     */
    requireEditor(callback){
      //设置全局变量，因为editormd依赖jquery
      const $ = jquery
      window.$=window.jQuery=$;
      $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/lib/editor.md/css/editormd.min.css'))
      //异步加载并执行
      $.getScript("/lib/editor.md/editormd.min.js",function(){
        callback();
      })
    },
    setValue (content) {
      this.editor.setValue(content)
    },
    /**
     * @function 编辑器内容改变
     * @param {Object} e 改变的值
     */
    editorChange () {
      console.log('editorChange:')
      this.$emit('change', this.editor.getValue())
    },
    /**
     * @function 编辑器加载完成图片
     */
    editorLoad () {
      console.log('editorload:')
      this.$emit('load')
    }
  }
}
</script>
