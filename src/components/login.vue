<template>
    <div class="login_panel">
        <el-form :model="formData" :rules="rules2" ref="formData" label-position="left" label-width="0px"
            class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="formData.account" auto-complete="off" placeholder="账号"
                    @keyup.enter.native="handleSubmit2" autofocus="autofocus"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="formData.password" auto-complete="off" placeholder="密码"
                    @keyup.enter.native="handleSubmit2"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">
                    登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import storage from '../services/storageService';

    export default {
        data() {
            return {
                logining: false,
                formData: {
                    account: 'admin',
                    password: 'admin'
                },
                rules2: {
                    account: [{
                            required: true,
                            message: '请输入账号',
                            trigger: 'blur'
                        },
                        //{ validator: validaePass }
                    ],
                    password: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            }
        },
        mounted() {

        },
        destroyed() {},
        methods: {
            //获取当前时间戳
            getTimestamp() {
                return Math.round(new Date().getTime());
                //getTime()返回数值的单位是毫秒
            },
            handleReset2() {
                this.$refs.formData.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                _this.logining = true;

                if (_this.formData.password == "") {
                    _this.logining = false;
                    return;
                }

                $ajax({
                    url: "/api/user/login",
                    type: "post",
                    data: {
                        account: _this.formData.account,
                        password: _this.formData.password
                    }
                }).then(ret => {
                    setTimeout(function () {
                        _this.logining = false;
                    }, 500);
                    // console.log("登录成功");
                    // return

                    if (ret.code == "0") {
                        this.$notify.success({
                            title: '提示',
                            message: ret.msg
                        });
                        setTimeout(function () {
                            storage.setItem("userLoginInfo", {
                                account: _this.formData.account,
                                password: _this.formData.password,
                                curTimestamp: _this.getTimestamp()
                            }, configService.login_deadline);
                            _this.$router.push({
                                path: '/helloWorld'
                            });
                        }, 500);
                    } else {
                        this.$notify.error({
                            title: '提示',
                            message: ret.msg
                        });
                    }
                });
            }
        }
    };

</script>
<style>
    .login_panel {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_panel .el-checkbox {
        margin-bottom: 22px;
    }

</style>
