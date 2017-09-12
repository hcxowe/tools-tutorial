<template>
    <div class="wrap">
        <div class="login-container">
            <el-row class="login-row" type="flex" justify="center" align="middle">
                <el-col :span="24">
                    <h1><i class="fa fa-meetup"></i>正新订单管理系统</h1>
                    <div class="login-wrap">
                        <el-form :model="userInfo" label-position="top" :rules="rules">
                            <el-form-item prop="username">
                                <el-input v-model="userInfo.username" placeholder="请输入用户名称" icon="fa-user" size="large"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="userInfo.password" placeholder="请输入登录密码" icon="fa-lock" size="large" type="password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" style="width:100%;" size="large">登录</el-button>  
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="footer">
            <el-row>
                <el-col :span="24">
                    <p>所有方: xmnode</p>
                    <p> Copyright ©2008-2017 heda, All Rights Reserved.</p>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' }
                    ]
                }
            };
        }
    }
</script>

<style lang="less">
    .wrap {
        position: relative;
        width: 100%;
        height: 100%;
        color: #2395ff;
        background: #FFF;
    }

    .login-row {
        height: 100%;
    }

    h1 {
        font-size: 3em;
    }

    .login-wrap {
        width: 350px;
        margin: 0 auto 50px;
    }

    .login-container {
        position:absolute;
        top:0;left:0;right:0;bottom:100px;
    }

    .footer {
        position:absolute;
        left:0;right:0;bottom:0px;
        height:100px;
        padding:10px;
        background:#F5F5F5;
        color:#000;
        font-size:14px;
    }
</style>

