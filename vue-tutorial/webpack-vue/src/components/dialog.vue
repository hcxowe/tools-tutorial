<template>
    <div>
        <el-row>
            <el-col :span="18">
                <div style="border:1px solid #dfe6ec; padding:10px 10px;border-bottom:none;" ref="search">
                    <el-row style="margin-bottom:10px;">
                    <el-col :span="3">
                        <p style="text-align:center;line-height: 36px;margin:0;">客户名称:</p>
                    </el-col>
                    <el-col :span="9">
                        <el-input style="width:100%;"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <p style="text-align:center;line-height: 36px;margin:0;">币种:</p>    
                    </el-col>
                    <el-col :span="9">
                        <el-select placeholder="请选择币种"  value="1" style="width:100%;">
                        <el-option label="人民币" value="0"></el-option>
                        <el-option label="美元" value="1"></el-option>
                        </el-select>
                    </el-col>
                    </el-row> 
                    <el-row style="margin-bottom:10px;">
                    <el-col :span="3">
                        <p style="text-align:center;line-height: 36px;margin:0;">客户名称:</p>
                    </el-col>
                    <el-col :span="9">
                        <el-input style="width:100%;"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <p style="text-align:center;line-height: 36px;margin:0;">币种:</p>    
                    </el-col>
                    <el-col :span="9">
                        <el-select placeholder="请选择币种" value="1" style="width:100%;">
                        <el-option label="人民币" value="0"></el-option>
                        <el-option label="美元" value="1"></el-option>
                        </el-select>
                    </el-col>
                    </el-row> 
                    <el-row style="">
                    <el-col :span="3">
                        <p style="text-align:center;line-height: 36px;margin:0;">客户名称:</p>
                    </el-col>
                    <el-col :span="9">
                        <el-input style="width:100%;"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <p style="text-align:center;line-height: 36px;margin:0;">币种:</p>    
                    </el-col>
                    <el-col :span="9">
                        <el-select placeholder="请选择币种" value="1" style="width:100%;">
                        <el-option label="人民币" value="0"></el-option>
                        <el-option label="美元" value="1"></el-option>
                        </el-select>
                    </el-col>
                    </el-row> 
                </div>

                <el-table :data="gridData" border ref="search1">
                    <el-table-column property="date" label="日期" width="150"></el-table-column>
                    <el-table-column property="name" label="姓名" width="200"></el-table-column>
                    <el-table-column property="address" label="地址"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="80">
                        <template scope="scope">
                            <el-button type="text" size="small" v-if="scope.row.date">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>  
                <p style="line-height:40px;border:1px solid #dfe6ec;margin:0;border-top:none;">
                    <span style="display:inline-block;border-right:1px solid #dfe6ec;line-height:40px;width:15%;text-align:center;font-size: 14px;color: #1f2d3d;">合计</span>
                    <span style="display:inline-block;border-right:1px solid #dfe6ec;line-height:40px;width:35%;text-align:center;font-size: 14px;color: #1f2d3d;">12345.33</span>
                    <span style="display:inline-block;border-right:1px solid #dfe6ec;line-height:40px;width:15%;text-align:center;font-size: 14px;color: #1f2d3d;">合计</span>
                    <span style="display:inline-block;line-height:40px;width:30%;text-align:center;font-size: 14px;color: #1f2d3d;">12345.33</span>
                </p>
            </el-col>
            <el-col :span="6" style="border:1px solid #dfe6ec;" :style="{height: leftHeight+'px'}">
                <el-row>
                <el-col :span="24">
                    <div style="line-height:40px;text-align:center;border-bottom:1px solid #ccc;">添加产品</div>        
                </el-col>
                </el-row>
                <el-row style="border-bottom:1px solid #ccc;padding:5px;line-height:40px;">
                <el-col :span="19">
                    <el-input placeholder="请输入产品编号"></el-input>
                </el-col>
                <el-col :span="5" style="text-align: center;">
                    <el-button icon="plus" @click="dialogFormVisible1=true" type="primary"></el-button>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="24">
                    <div style="line-height:40px;text-align:center;border-bottom:1px solid #ccc;">客户历史产品</div>        
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="24" style="padding:10px;">
                    <p class="prodcut-item">麻辣香干-123456<el-button icon="plus" size="mini" style="float:right;" type="primary" @click="openXX"></el-button></p>
                    <p class="prodcut-item">麻辣香干-123456<el-button icon="plus" size="mini" style="float:right;" type="primary"></el-button></p>
                    <p class="prodcut-item">麻辣香干-123456<el-button icon="plus" size="mini" style="float:right;" type="primary"></el-button></p>
                    <p class="prodcut-item">麻辣香干-123456<el-button icon="plus" size="mini" style="float:right;" type="primary"></el-button></p>
                </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '',
                    name: '',
                    address: ''
                }],
                dialogFormVisible1: false,
                dialogFormVisible: true,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                leftHeight: null
            }
        },
        methods: {
            openXX () {
                console.log(this.$bus);
                this.$bus.emit('opend', {value: 1, date: 2});
            }
        }
    }
</script>

<style>
    .prodcut-item {
        margin:5px 0;
        padding:10px;
        border:1px solid #ccc;
        border-radius: 6px;
    }

    .prodcut-item:hover {
        background-color: #eef1f6;
    }
</style>
