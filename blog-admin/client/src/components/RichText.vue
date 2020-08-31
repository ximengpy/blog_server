<template>
  <!-- <div>
    <textarea ref="demo" :value="value" id="demo" style="display: none;"></textarea>
  </div> -->
  <div>
    <mavon-editor
        v-model="content"
        :ishljs = "true"
        ref="md"
        @change="change"
        style="min-height: 600px"
    />

  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: "RichText",
    data(){
      return {
        layedit : null,
        index : 0,
        content:'', // 输入的markdown
        html:'',    // 及时转的html
      }
    },
    components: {
        mavonEditor,
    },
    props:["value"],
    watch:{
      // value(){
      //   this.$refs.demo.value = this.value;
      //   layui.use('layedit', ()=>{
      //     this.layedit = layui.layedit;
      //     this.index = this.layedit.build('demo');
      //   });
      // }
    },
      // mounted() {
      //   layui.use('layedit', ()=>{
      //     this.layedit = layui.layedit;
      //     this.index = this.layedit.build('demo');
      //   });
      // }
      methods: {
        // 所有操作都会被解析重新渲染
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
      }
  }
</script>

<style scoped>
</style>
