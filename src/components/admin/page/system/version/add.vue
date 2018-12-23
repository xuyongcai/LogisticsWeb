<template>
    <el-row>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../system/version' }">版本管理</el-breadcrumb-item>
            <el-breadcrumb-item>增加版本</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col style="margin-top: 50px" :span="12">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

                    <el-form-item label="版本类型" prop="type">
                        <el-radio-group v-model="ruleForm.type">
                            <el-radio-button label="customer_android">客户端</el-radio-button>
                            <el-radio-button label="driver_android">司机端</el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="版本号" prop="version_number">
                        <el-input-number v-model="ruleForm.version_number"></el-input-number>
                    </el-form-item>

                    <el-form-item label="版本名称" prop="version">
                        <el-input v-model="ruleForm.version" ></el-input>
                    </el-form-item>

                    <el-form-item label="版本日志">
                        <el-input v-model="ruleForm.changelog"
                                  type="textarea"
                                  :rows="3"
                                  placeholder="请输入日志内容"></el-input>
                    </el-form-item>

                    <el-form-item label="APP上传" prop="url">
                        <el-upload
                            class="avatar-uploader"
                            action="http://upload-z2.qiniu.com"
                            :data="uploadToken"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :on-progress="progressUpload">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        <el-input v-model="ruleForm.url" :disabled="true"/><br/><br/>
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
    import { addVersion } from '@/api/system';
    import { getUploadToken } from '@/api/util.js';

    export default {
        data() {
            return {
                ruleForm: {
                    type: 'customer_android',
                    version: '',
                    version_number: 0,
                    changelog: '',
                    url: '',
                },
                rules: {
                    version: [
                        {required: true, message: '请输入版本名称'}
                    ],
                    url: [
                        {required: true, message: '请上传'}
                    ],
                    version_number: [
                        {required: true, message: '请输入版本号'}
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
                        addVersion(this.ruleForm).then(response => {
                            this.listLoading = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.push('/admin/home/system/version');
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
                this.ruleForm.url = 'http://otj3hc8no.bkt.clouddn.com/'+ res.key;
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
