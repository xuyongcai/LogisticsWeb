<template>
    <el-row v-loading.body="Loading" element-loading-text="请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row style="margin-top: 50px">
            <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="150px" class="demo-ruleForm">

                <el-row>
                    <el-col :span="8">
                        <el-row>
                            <el-form-item label="账户名">
                                <el-input v-model="userForm.username" :disabled="true"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="头像">
                                <el-upload
                                    class="avatar-uploader"
                                    action="http://upload-z2.qiniu.com"
                                    :data="uploadToken"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :on-progress="progressUpload">
                                    <img v-if="userInfoForm.img" :src="userInfoForm.img" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="imagePercente" style="width: 200px"></el-progress>
                            </el-form-item>
                        </el-row>

                        <el-row>
                            <el-form-item label="昵称">
                                <el-input v-model="userInfoForm.nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="userInfoForm.sex">
                                    <el-radio class="radio" label="男"></el-radio>
                                    <el-radio class="radio" label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="公司名称" prop="company">
                                <el-input v-model="userInfoForm.company"></el-input>
                            </el-form-item>
                        </el-row>
                    </el-col>

                    <el-col :span="8" :offset="1">
                        <el-form-item label="账户余额:">
                            <p style="font-size:25px">{{userInfoForm.money}} 元</p>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('userInfoForm')" icon="upload">更新账户</el-button>
                    <el-button type="warning" @click="showPasswordDialog" icon="edit">修改密码</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-dialog title="重置密码" :visible.sync="dialogPasswordVisible">
            <el-form :model="passwordForm">
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="passwordForm.old_password" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="passwordForm.new_password" style="width: 400px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="password()">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script>
    import { getInfo,updateInfo,updatePassword } from '@/api/user/customer.js'
    import { getUploadToken } from '@/api/util.js'
    import { parseTime } from '@/utils/time'

    export default {
        data() {
            return {
                Loading: false,
                LoadingParam:{
                    token: localStorage.getItem('customer_token')
                },
                uploadToken: {
                    token:''
                },
                userInfoForm: {
                    id: '',
                    user_id: '',
                    nickname: '',
                    sex: '',
                    img: '',
                    birthday: '',
                    company: '',
                    money: 0,
                    token: '',
                },
                userForm: {
                    id: '',
                    username: '',
                    phone: '',
                    type: '',
                    regtime: '',
                },
                passwordForm:{
                    token: localStorage.getItem('customer_token'),
                    old_password:'',
                    new_password:'',
                },
                dialogPasswordVisible: false,
                rules: {
                    sex: [
                        {required: true, message: '请选择性别'}
                    ],
                    company: [
                        {required: true, message: '请输入公司名称'}
                    ]
                },
                imagePercente: 0,
            };
        },
        created() {
            this.loadForm();
        },
        methods: {
            loadForm(){
                this.Loading = true;
                getInfo(this.LoadingParam).then(response => {
                    this.userInfoForm = response.data.userInfo;
                    this.userForm = response.data.user;
                    this.userInfoForm.token = localStorage.getItem('customer_token');
                    this.userInfoForm.birthday = parseTime(this.userInfoForm.birthday,"{y}/{m}/{d}");
                    this.Loading = false;
                });

                getUploadToken().then(response => {
                    this.uploadToken.token = response.data;
                });
            },
            handleAvatarSuccess(res, file) {
                this.userInfoForm.img ='http://otj3hc8no.bkt.clouddn.com/'+ res.key
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            progressUpload(event, file, fileList){
                this.imagePercente = event.percent;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        updateInfo(this.userInfoForm).then(response => {
                                this.listLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            },
                            error =>{
                                this.listLoading = false;
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            showPasswordDialog(){
                this.dialogPasswordVisible = true;
            },
            password(){
                this.dialogPasswordVisible = false;
                updatePassword(this.passwordForm).then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改密码成功!'
                    });
                });
            },
        }
    }
</script>


<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 200px;
        width: 200px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 200px;
        height: 200px;
        display: block;
    }
</style>
