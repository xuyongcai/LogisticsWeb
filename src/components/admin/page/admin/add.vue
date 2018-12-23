<template>
    <el-row>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../admin' }">账户管理</el-breadcrumb-item>
            <el-breadcrumb-item>增加账户</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col style="margin-top: 50px" :span="12">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></el-input>
                    </el-form-item>

                    <el-form-item label="昵称">
                        <el-input v-model="ruleForm.nickname" ></el-input>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-radio-group v-model="ruleForm.sex">
                            <el-radio class="radio" label="男"></el-radio>
                            <el-radio class="radio" label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            action="http://upload-z2.qiniu.com"
                            :data="uploadToken"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :on-progress="progressUpload">
                            <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="imagePercente"></el-progress>
                    </el-form-item>

                <el-form-item style="margin-top: 30px" >
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-col>


    </el-row>
</template>
<script>
    import { addAdmin } from '@/api/user';
    import { getUploadToken } from '@/api/util.js';

    export default {
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    nickname: '',
                    sex: '',
                    img: '/static/img/avatar.jpg',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名'}
                    ],
                    password: [
                        {required: true, message: '请输入密码'}
                    ]
                },
                listLoading: false,
                uploadToken: {
                    token:''
                },
                imagePercente: 0,

            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
                getUploadToken().then(response => {
                    this.uploadToken.token = response.data;
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        addAdmin(this.ruleForm).then(response => {
                            this.listLoading = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.push('/admin/home/admin');
                        },
                        error =>{
                            this.listLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.img = 'http://otj3hc8no.bkt.clouddn.com/'+ res.key;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            progressUpload(event, file, fileList){
                this.imagePercente = event.percent;
            }
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 200px;
        height: 200px;
        display: block;
    }
</style>
