<template>
    <div>
        <el-row>
            <el-col :span="24" style="border:1px solid #ccc;">
                <div style="background:#20a0ff;color:#fff;padding:10px;text-align:center;border-bottom:1px solid #ccc;">填写产品信息</div>
                <el-form label-width="80px" style="margin-top: 10px;padding:5px;" ref="left_form">
                    <el-form-item label="客户名称:">
                        <label style="display:block;">友伦</label>
                    </el-form-item>
                    <el-form-item label="产品名称:">
                        <label style="display:block;">五香豆腐干</label>
                    </el-form-item>
                    <el-form-item label="产品编号:">
                        <label style="display:block;">SDF23423424</label>
                    </el-form-item>
                    <el-form-item label="产品单价:">
                        <el-select value="1" style="display:block;">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            <el-option label="3" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下单数量:">
                        <el-input-number :min="1" :max="10" style="display:block;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="折扣率:">
                        <el-input-number :min="1" :max="10" style="display:block;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="交货日期:">
                        <el-date-picker style="display:block;" type="date" placeholder="选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="text-align: right;margin-top:10px;">
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>    
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$bus.on('opend', (value) => {
        console.log(value);
    });
}
}
</script>

<style scoped>
.el-date-editor.el-input {
   width: 100%;
}

.el-input-number {
   width: 100%;
}
</style>
