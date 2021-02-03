<template>
    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="height: 200px;"></quill-editor>
</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor';

  export default {
    props: {
      title: {
        type: String,
        default: 'hello world'
      }
    },
    data(){
      return{
        content: '',
        editorOption: {
          modules:{
            toolbar:[// toggled buttons
              [{ 'list': 'ordered'}, { 'list': 'bullet'},],
            ]
          },
          placeholder:"insert text here..",
        },
      }
    },
    components: {
      quillEditor
    },
    methods:{
      onEditorChange({ editor, html, text }) {
        this.content = html;
      },
    }
  }
</script>
