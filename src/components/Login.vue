<template>
    <div class="login-wrap" >
        <div class="ms-title">欢迎使用tms系统</div>
        <div class="ms-login"  v-loading.body="listLoading" element-loading-text="正在登录中">

            <template>
                <el-radio class="radio" v-model="type" label="company">用户</el-radio>
                <el-radio class="radio" v-model="type" style="float:right" label="admin">管理员</el-radio>
            </template>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm" style="margin-top: 30px">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>

                <el-row style="margin-top: 20px">
                    <el-col :span="12"><el-button type="text" @click="onPasswrod">忘记密码？</el-button></el-col>
                </el-row>
            </el-form>
        </div>

        <el-dialog title="新用户注册" :visible.sync="dialogFormVisible" size="tiny">
            <el-form :model="registerForm" :rules="registerRules" ref="registerForm" style="padding-right: 20px"  v-loading.body="registerLoading">
                <el-form-item label="手机号：" label-width="100px" prop="phone">
                    <el-input v-model="registerForm.phone"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="验证码：" label-width="100px" prop="code">
                            <el-input v-model="registerForm.code" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-button type="primary" @click="onGetMsg" :disabled="msgVisible">{{msgButton}}</el-button>
                    </el-col>
                </el-row>
                <el-form-item label="密码：" label-width="100px" prop="password">
                    <el-input type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onRegisterSubmit('registerForm')">确认注册</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { AdminLogin } from '@/api/user/admin';
    import { CustomerLogin,sendRegisterSms,registerSms } from '@/api/user/customer';
    import { CompanyLogin } from '@/api/user/company';

    export default {
        data: function(){
            return {
                type:'company',
                ruleForm: {
                    username: '',
                    password: ''
                },
                registerForm: {
                    phone: '',
                    password: '',
                    code:'',
                    cookie:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                registerRules: {
                    phone: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                },
                listLoading: false,
                dialogFormVisible: false,
                msgButton:'',
                msgCount:0,
                msgVisible:false,
                mInterval:null,
                registerLoading:false,
            }
        },
        methods: {
            onPasswrod(){
                if(this.type == 'admin'){
                    this.$alert('请联系管理员重置密码', '密码找回', {
                        confirmButtonText: '确定',
                    });
                }else if(this.type == 'company'){
                    this.$alert('请联系管理员重置密码', '密码找回', {
                        confirmButtonText: '确定',
                    });
                }else{

                }
            },
            onRegisterSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.registerLoading = true;
                        registerSms(this.registerForm).then(response => {
                            this.registerLoading = false;
                            this.dialogFormVisible = false;
                            this.$message({
                                type: 'success',
                                message: '注册成功!'
                            });
                        });
                    }
                });

            },
            onRegister(){
                this.dialogFormVisible = true;
                this.msgButton = "获取验证码";
                this.msgCount = 60;
                this.msgVisible = false;
                clearInterval(this.mInterval);
            },
            onGetMsg(){
                //查看手机号
                if(this.registerForm.phone.length != 11)
                {
                    this.$message('手机号格式不正确');
                    return;
                }
                //短信获取
                this.registerLoading = true;
                sendRegisterSms(this.registerForm).then(response => {
                    this.registerLoading = false;
                    this.registerForm.cookie = response.data.cookie;

                    var _this = this;
                    _this.msgButton = "获取验证码（"+ _this.msgCount +"）";
                    _this.msgVisible = true;
                    this.mInterval = setInterval(function(){
                        _this.msgButton = "获取验证码（"+ _this.msgCount +"）";
                        _this.msgCount--;
                        if(_this.msgCount == 0){
                            _this.msgButton = "获取验证码";
                            _this.msgCount = 60;
                            _this.msgVisible = false;
                            clearInterval(_this.mInterval);
                        }
                    },1000);
                });

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        if (this.type == 'admin') {
                            AdminLogin(this.ruleForm).then(response => {
                                    this.listLoading = false;
                                    this.$message({
                                        type: 'success',
                                        message: '登录成功!'
                                    });
                                    localStorage.setItem('admin_username', this.ruleForm.username);
                                    localStorage.setItem('token', response.data.token);
                                    localStorage.setItem('type', 'admin');
                                    this.$router.push('/admin/home');
                                },
                                error => {
                                    this.listLoading = false;
                                });
                        } else if (this.type == 'customer') {
                            CustomerLogin(this.ruleForm).then(response => {
                                    this.listLoading = false;
                                    this.$message({
                                        type: 'success',
                                        message: '登录成功!'
                                    });
                                    localStorage.setItem('customer_username', this.ruleForm.username);
                                    localStorage.setItem('customer_token', response.data.token);
                                    localStorage.setItem('type', 'customer');
                                    this.$router.push('/customer/home');
                                },
                                error => {
                                    this.listLoading = false;
                                });
                        } else if (this.type == 'company') {
                            CompanyLogin(this.ruleForm).then(response => {
                                    this.listLoading = false;
                                    this.$message({
                                        type: 'success',
                                        message: '登录成功!'
                                    });
                                    localStorage.setItem('company_username', this.ruleForm.username);
                                    localStorage.setItem('company_token', response.data.token);
                                    localStorage.setItem('type', 'company');
                                    this.$router.push('/company/home');
                                },
                                error => {
                                    this.listLoading = false;
                                });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:230px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
