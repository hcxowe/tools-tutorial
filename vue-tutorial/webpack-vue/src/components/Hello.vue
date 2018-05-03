<template>
  <div class="hello">
    <el-button type="text" @click="dialogFormVisible = true">打开Dialog</el-button>
    <el-dialog title="收货地址详细" custom-class="my-dialog1" :visible.sync="dialogFormVisible1">
      <dialog1></dialog1>
    </el-dialog>
    <el-dialog title="收货地址" custom-class="my-dialog" :visible.sync="dialogFormVisible">
      <dialog2></dialog2>
    </el-dialog>
  </div>
</template>

<script>






</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .my-dialog1 {
    width: 450px;
  }

  .my-dialog {
    width: 1000px;
  }
</style>
