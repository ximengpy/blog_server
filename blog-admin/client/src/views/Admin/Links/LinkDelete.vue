<template>
  <el-table
      :data="diaryList"
      style="width: 100%">
    <el-table-column
        label="名称"
        width="200"
        prop="name"
    >
    </el-table-column>
    <el-table-column
        label="地址"
        width="200"
        prop="txt"
    >
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <img v-if="scope.row.img" :src="scope.row.icon" height="50" alt="">
      </template>
    </el-table-column>
    <el-table-column
        label="描述"
        width="200"
        prop="des"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {getLinks,deleteLinks} from "../../../api";

  export default {
    name: "DiaryManage",
    data() {
      return {
        diaryList: []
      }
    },
    methods:{
      handleDelete(index,row){
        deleteLinks(row._id)
          .then(()=>{
            this.getList();
          })
      },

      getList(){
        getLinks().then(res => {
          this.diaryList = res.data.data;
        })
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style scoped>

</style>
