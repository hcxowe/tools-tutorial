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

import dialog2 from '@/components/dialog'
import dialog1 from '@/components/dialog1'
export default {
  data () {
    return {
      dialogFormVisible1: false,
      dialogFormVisible: true
    }
  },
  mounted() {
    this.$bus.on('opend', () => {
        this.dialogFormVisible1 = true;
    });
  },
  components: {
    dialog2,
    dialog1
  },
  methods: {
    openDialog1(value) {
    }
  }
}
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
