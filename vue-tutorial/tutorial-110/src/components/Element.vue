<template>
    <div>
        <div class="alert-container container">
            <el-alert title="成功提示的文案" type="success">
            </el-alert>
            <el-alert title="消息提示的文案" type="info" description="hcxowe">
            </el-alert>
            <el-alert title="警告提示dfd 的文案" type="warning" :closable="false" close-text="close">
            </el-alert>
            <el-alert title="错误提示的文案" type="error" show-icon>
            </el-alert>
        </div>

        <div class="badge-container container">
            <el-badge :value="12" class="item">
                <el-button size="small">评论</el-button>
            </el-badge>
            <el-badge :value="999" :max="99" class="item">
                <el-button size="small">回复</el-button>
            </el-badge>

            <el-badge value="new" class="item">
                <el-button size="small">回复</el-button>
            </el-badge>

            <el-badge is-dot class="item">
                <el-button size="small">回复</el-button>
            </el-badge>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    点我查看
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="clearfix">
                        评论
                        <el-badge class="mark" :value="12" />
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix">
                        回复
                        <el-badge class="mark" :value="3" />
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="layout-container container">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark"></div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8" :offset="4">
                    <div class="grid-content bg-purple"></div>
                </el-col>

                <el-col :span="8">
                    <div class="grid-content bg-purple"></div>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-around">
                <el-col :span="6">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :xs="8" :sm="6" :md="4" :lg="2">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="2">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="2">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="2">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="2">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="2">
                    <div class="grid-content bg-purple"></div>
                </el-col>
            </el-row>
        </div>

        <div class="table-container container">
            <el-table :data="tableData" style="width: 100%" height="250" max-height="300" stripe border :row-class-name="tableRowClassName" highlight-current-row @current-change="handleCurrentChange" :show-overflow-tooltip="true">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="date" label="日期" style="width: 200px" align="center" fixed></el-table-column>
                <el-table-column label="配送信息" align="center">
                    <el-table-column prop="name" label="姓名" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="地址" style="width: 200px" align="center">
                    </el-table-column>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="tree-container container">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" show-checkbox></el-tree>
        </div>

        <div class="breadcrumb-container container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="btton-contaner container">
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="text">文字按钮</el-button>

            <el-button :plain="true" :disabled="true">主要按钮</el-button>
            <el-button type="primary" :disabled="true">主要按钮</el-button>
            <el-button type="text" :disabled="true">文字按钮</el-button>

            <el-button type="success">成功按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
            <el-button type="info">信息按钮</el-button>

            <el-button :plain="true" type="success">成功按钮</el-button>
            <el-button :plain="true" type="warning">警告按钮</el-button>
            <el-button :plain="true" type="danger">危险按钮</el-button>
            <el-button :plain="true" type="info">信息按钮</el-button>

            <el-button type="primary" icon="edit"></el-button>
            <el-button type="primary" icon="share"></el-button>
            <el-button type="primary" icon="delete"></el-button>
            <el-button type="primary" icon="search">搜索</el-button>
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>

            
            <el-button-group>
                <el-button type="primary" icon="arrow-left">上一页</el-button>
                <el-button type="primary">下一页
                    <i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
            </el-button-group>
            <el-button-group>
                <el-button type="primary" icon="edit"></el-button>
                <el-button type="primary" icon="share"></el-button>
                <el-button type="primary" icon="delete"></el-button>
            </el-button-group>

            <el-button type="primary" :loading="true">加载中</el-button>

            <el-button type="primary" size="large">大型按钮</el-button>
            <el-button type="primary">正常按钮</el-button>
            <el-button type="primary" size="small">小型按钮</el-button>
            <el-button type="primary" size="mini">超小按钮</el-button>
        </div>

        <div class="card-container container">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="line-height: 36px;">卡片名称</span>
                    <el-button style="float: right;" type="primary">操作按钮</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'列表内容 ' + o }}
                </div>
            </el-card>
        </div>

        <div class="container">
            <el-checkbox v-model="checked">备选项</el-checkbox>
            <el-checkbox v-model="checked" disabled>备选项</el-checkbox>
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
            </el-checkbox-group>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkboxGroup1">
                <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkboxGroup2" size="small">
                <el-checkbox-button v-for="city in cities" :label="city" :disabled="city === '深圳'" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkboxGroup3" size="large" fill="#324057" text-color="#a4aebd" :min="1" :max="3">
                <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
            </el-checkbox-group>
        </div>

        <div class="container collapse-container" style="text-align:left;">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="一致性 Consistency" name="1">
                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="效率 Efficiency" name="3">
                    <div>简化流程：设计简洁直观的操作流程；</div>
                    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <div class="container">
            <div class="block">
                <span class="demonstration">有默认值</span>
                <el-color-picker v-model="color1"></el-color-picker>
            </div>
            <div class="block">
                <span class="demonstration">无默认值</span>
                <el-color-picker v-model="color2"></el-color-picker>
            </div>

            <el-color-picker v-model="color3" show-alpha></el-color-picker>
        </div>

        <div class="container">
            <div class="block">
                <span class="demonstration">默认</span>
                <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">带快捷选项</span>
                <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
                </el-date-picker>
            </div>
        </div>

        <div class="container">
            <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
            <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            size="tiny"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
        </div>

        <div class="container">
            <el-dropdown>
                <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="container" style="text-align:left;">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送">
                    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质">
                    <el-checkbox-group v-model="form.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="container" style="text-align:left;">
            <template>
                <el-table v-loading.body="loading" :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                </el-table>
            </template>
        </div>

        <div class="container" style="text-align:left;">
            <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>

            <div class="line"></div>

            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </div>

        <div class="container">
            <el-button type="text" @click="open">点击打开 Message Box</el-button>
            <el-button :plain="true" @click="open">打开消息提示</el-button>
            <el-button :plain="true" @click="openVn">VNode</el-button>      
        </div>

        <div class="container">
            <span class="demonstration">页数较少时的效果</span>
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
            </div>
            <div class="block">
            <span class="demonstration">大于 7 页时的效果</span>
            <el-pagination
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>

        <div class="container">
            <el-popover ref="popover1" placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">

            </el-popover>

            <el-popover ref="popover2" placement="bottom" title="标题" width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            </el-popover>

            <el-button v-popover:popover1>hover 激活</el-button>
            <el-button v-popover:popover2>click 激活</el-button>
            <el-popover placement="right" title="标题" width="200" trigger="focus" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-button slot="reference">focus 激活</el-button>
            </el-popover>
        </div>

        <div class="container">
            <el-progress :percentage="0"></el-progress>
            <el-progress :percentage="70"></el-progress>
            <el-progress :percentage="100" status="success"></el-progress>
            <el-progress :percentage="50" status="exception"></el-progress>
        </div>

        <div class="container">
            <div class="block">
                <span class="demonstration">默认不区分颜色</span>
                    <el-rate v-model="value1"></el-rate>
            </div>
            <div class="block">
                <span class="demonstration">区分颜色</span>
                <el-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
            </div>
        </div>

        <div class="container" style="text-align:left;">
            <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>

            <el-transfer v-model="value21" :data="data21"></el-transfer>
        </div>

        <div class="container">
            <div>
                <el-button @click="show = !show">Click Me</el-button>

                <div style="display: flex; margin-top: 20px; height: 100px;">
                    <transition name="el-fade-in-linear">
                        <div v-show="show" class="transition-box">.el-fade-in-linear</div>
                    </transition>
                    <transition name="el-fade-in">
                        <div v-show="show" class="transition-box">.el-fade-in</div>
                    </transition>
                </div>
            </div>
        </div>

        <div class="container" style="text-align:left;">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
    </div>
</template>

<style lang="less">
    .transition-box {
        margin-bottom: 10px;
        width: 200px;
        height: 100px;
        border-radius: 4px;
        background-color: #20A0FF;
        text-align: center;
        color: #fff;
        padding: 40px 20px;
        box-sizing: border-box;
        margin-right: 20px;
    }
    .container {
        padding: 10px;
        border: 1px solid #ccc;
    }

    .badge-container {
        .item {
            margin-right: 40px;
            margin-top: 10px;
        }
    }

    .layout-container {
        .el-row {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .el-col {
            border-radius: 4px;
        }
        .bg-purple-dark {
            background: #99a9bf;
        }
        .bg-purple {
            background: #d3dce6;
        }
        .bg-purple-light {
            background: #e5e9f2;
        }
        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
    }
    
    .table-container {
        .el-table .info-row {
            background: #c9e5f5;
        }

        .el-table .positive-row {
            background: #e2f0e4;
        }
    }

    .card-container {
        .text {
            font-size: 14px;
        }

        .item {
            padding: 18px 0;
        }

        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }

        .box-card {
            width: 480px;
        }
    }

</style>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        openVn() {
            const h = this.$createElement;
            this.$message({
                message: h('p', null, [
                    h('span', null, '内容可以是 '),
                    h('i', { style: 'color: teal' }, 'VNode')
                ])
            });
        },
        open() {
            this.$message('这是一条消息提示');

            this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${ action }`
                    });
                }
            });
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        onSubmit() {
            console.log('submit!');
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        tableRowClassName(row, index) {
            if (index === 1) {
                return 'info-row';
            } else if (index === 2) {
                return 'positive-row';
            }
            return '';
        },
        handleCurrentChange(val) {
            console.log(val);
        },
        handleNodeClick(data) {
            console.log(data);
        }
    },
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 15; i++) {
            data.push({
                key: i,
                label: `备选项 ${ i }`,
                disabled: i % 4 === 0
            });
            }
            return data;
        };
        return {
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            show: true,            
            data21: generateData(),
            value21: [1, 4],  
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            value: '',
            value1: null,
            value2: null,
            activeIndex: '1',
            activeIndex2: '1',          
            loading: false,
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
            dialogVisible: false,
            pickerOptions0: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
            }
            },
            pickerOptions1: {
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
                }
            }]
            },
            value1: '',
            value2: '',
            color1: '#20a0ff',
            color2: null,       
            color3: 'rgba(19, 206, 102, 0.8)',
            activeNames: ['1'],
            checkboxGroup1: ['上海'],
            checkboxGroup2: ['北京'],
            checkboxGroup3: ['广州'],
            cities: cityOptions,
            checkList: ['选中且禁用','复选框 A'],
            checked: true,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    }
}
</script>

