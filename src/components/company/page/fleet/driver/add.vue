<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在提交，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../driver' }">司机管理</el-breadcrumb-item>
            <el-breadcrumb-item>增加司机</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col style="margin-top: 50px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入司机姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="ruleForm.phone" placeholder="司机APP客户端登录用户名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="APP登录密码">
                            <el-input type="password" v-model="ruleForm.password" placeholder="司机APP客户端登录密码"></el-input>
                            <el-tag type="primary">默认为123456</el-tag>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="任务短信通知">
                            <el-switch v-model="ruleForm.is_sms" on-text="是" off-text="否"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="ruleForm.sex">
                                <el-radio class="radio" label="男"></el-radio>
                                <el-radio class="radio" label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="银行卡号">
                            <el-input v-model="ruleForm.bank_number" placeholder="确认银行卡号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="开户行">
                            <el-select v-model="ruleForm.bank_addr" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in bank_list"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="籍贯">
                            <el-input v-model="ruleForm.hometown"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮箱">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="身份证">
                            <el-input v-model="ruleForm.idcard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row style="margin: 30px">
                    <el-col :span="20">
                        <el-card v-if="ruleForm.driver_license_visible">
                            <div slot="header">
                                <span>驾驶证信息</span>
                                <el-button @click.prevent="removeDriverLicense(license)" style="float: right;"
                                           type="danger" icon="delete">删除
                                </el-button>
                            </div>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="证件编号"
                                                  :prop="'driver_license.number'"
                                                  :rules="{required: true, message: '证件编号不能为空'}">
                                        <el-input v-model="ruleForm.driver_license.number"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="驾驶证级别"
                                                  :prop="'driver_license.level'"
                                                  :rules="{required: true, message: '请选择驾驶证级别'}">
                                        <el-select v-model="ruleForm.driver_license.level" clearable placeholder="请选择">
                                            <el-option
                                                v-for="item in driver_level"
                                                :key="item.name"
                                                :label="item.name"
                                                :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="有效日期">
                                        <el-date-picker type="date" placeholder="选择日期"
                                                        :value="ruleForm.driver_license.valid_time"
                                                        @input="ruleForm.driver_license.valid_time = day($event)"
                                                        style="width: 100%;" format="yyyy年MM月dd日"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="有效日期止">
                                        <el-date-picker type="date" placeholder="选择日期"
                                                        :value="ruleForm.driver_license.unvalid_time"
                                                        @input="ruleForm.driver_license.unvalid_time = day($event)"
                                                        style="width: 100%;" format="yyyy年MM月dd日"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="驾照考取日">
                                        <el-date-picker type="date" placeholder="选择日期"
                                                        :value="ruleForm.driver_license.pass_time"
                                                        @input="ruleForm.driver_license.pass_time = day($event)"
                                                        style="width: 100%;" format="yyyy年MM月dd日"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="10">
                                    <el-form-item label="从业资格证号码">
                                        <el-input v-model="ruleForm.driver_license.work_license"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="IC卡号">
                                        <el-input v-model="ruleForm.driver_license.ic_number"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-form-item label="附件">
                                        <el-upload
                                            class="upload-demo"
                                            action="http://upload-z2.qiniu.com"
                                            :data="uploadToken"
                                            :on-success="license_filesImgSuccess"
                                            :file-list="ruleForm.driver_license.files"
                                            list-type="picture">
                                            <el-button size="small" type="primary">点击上传</el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-card>

                        <el-row v-for="(license, index) in ruleForm.other_license">
                            <el-card class="box-card" style="margin-top: 20px">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">其他证件 No.{{index + 1}}</span>
                                    <el-button @click.prevent="removeLicense(license)" style="float: right;"
                                               type="danger" icon="delete">删除
                                    </el-button>
                                </div>
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="证件编号"
                                                      :prop="'other_license.' + index + '.number'"
                                                      :rules="{required: true, message: '证件编号不能为空'}">
                                            <el-input v-model="license.number"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="证件类型"
                                                      :prop="'other_license.' + index + '.type'"
                                                      :rules="{required: true, message: '请选择证件类型'}">
                                            <el-select v-model="license.type" clearable placeholder="请选择">
                                                <el-option
                                                    v-for="item in driver_license_type"
                                                    :key="item.name"
                                                    :label="item.name"
                                                    :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="办证日期">
                                            <el-date-picker type="date" placeholder="选择日期"
                                                            :value="license.pass_time"
                                                            @input="license.pass_time = day($event)"
                                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="有效日期">
                                            <el-date-picker type="date" placeholder="选择日期"
                                                            :value="license.valid_date"
                                                            @input="license.valid_date = day($event)"
                                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="有效日期止">
                                            <el-date-picker type="date" placeholder="选择日期"
                                                            :value="license.unvalide_date"
                                                            @input="license.unvalide_date = day($event)"
                                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="备注">
                                            <el-input type="textarea" v-model="license.remark"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="附件">
                                    <el-upload
                                        class="upload-demo"
                                        action="http://upload-z2.qiniu.com"
                                        :data="uploadToken"
                                        :on-success="fileImgSuccess"
                                        :file-list="license.files"
                                        list-type="picture">
                                        <el-button size="small" type="primary"  @click="fileImgSuccessc(index)">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                            </el-card>
                        </el-row>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button @click="addDriverLicense" v-if="!ruleForm.driver_license_visible" icon="plus"  type="info">增加驾驶证</el-button>
                    <el-button @click="addLicense" icon="plus"  type="info">新增其他证件</el-button>

                    <el-row style="margin-top: 10px">
                    <el-button type="success" @click="submitForm('ruleForm')">立即创建</el-button>
                    </el-row>
                    <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                </el-form-item>
            </el-form>
        </el-col>

    </el-row>
</template>
<script>
    import { addDriverEx } from '@/api/driver';
    import { getDefindAll } from "@/api/system";
    import { parseTime } from '@/utils/time';
    import { getUploadToken } from '@/api/util.js'

    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    sex: '男',
                    phone: '',
                    password: '123456',
                    bank_addr: '',
                    bank_number: '',
                    is_sms: false,
                    idcard: '',
                    email: '',
                    hometown: '',
                    remark: '',
                    driver_license_visible:false,
                    driver_license: null,
                    other_license:[],
                    token: localStorage.getItem('company_token')
                },
                bank_list: [],
                rules: {
                    name: [
                        {required: true, message: '请输姓名'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
                    ],
                    phone: [
                        {required: true, message: '请填写手机号码'},
                        {min: 11,max: 11, message: '手机号码长度为11位'}
                    ],
                    password: [
                        {required: true, message: '请填写密码'},
                        {min: 6, message: '密码长度不能小于6位'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别'}
                    ],
                },
                listLoading: false,
                driver_level:null,
                driver_license_type:null,
                uploadToken: {
                    token:''
                },
                other_license_img_click: 0,
            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
                getDefindAll({type_code:'driver_level'}).then(response => {
                    this.driver_level = response.data;
                });
                getDefindAll({type_code:'bank_list'}).then(response => {
                    this.bank_list = response.data;
                });
                getDefindAll({type_code:'driver_license_type'}).then(response => {
                    this.driver_license_type = response.data;
                });
                getUploadToken().then(response => {
                    this.uploadToken.token = response.data;
                });
            },
            removeLicense(item) {
                var index = this.ruleForm.other_license.indexOf(item)
                if (index !== -1) {
                    this.ruleForm.other_license.splice(index, 1)
                }
            },
            addDriverLicense(){
                this.ruleForm.driver_license_visible = true;
                this.ruleForm.driver_license = {
                    number: '',
                    level: '',
                    valid_time: null,
                    pass_time: null,
                    unvalid_time: null,
                    work_license: '',
                    ic_number: '',
                    files: []
                }
            },
            removeDriverLicense(){
                this.ruleForm.driver_license_visible = false;
                this.ruleForm.driver_license = null;
            },
            addLicense() {
                this.ruleForm.other_license.push({
                    number: '',
                    type: '',
                    pass_time: null,
                    valid_date: null,
                    unvalide_date: null,
                    files: [],
                    remark: ''
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        addDriverEx(this.ruleForm).then(response => {
                            this.listLoading = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.push('../driver');
                        },
                        error =>{
                            this.listLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            day(val){
                if(val == null)
                    return null;
                return parseTime(val,"{y}/{m}/{d}");
            },
            license_filesImgSuccess(res, file) {
                this.ruleForm.license.files.push({
                    name: file.name,
                    url: 'http://otj3hc8no.bkt.clouddn.com/'+ res.key
                });
            },
            fileImgSuccess(res, file) {
                this.ruleForm.other_license[this.other_license_img_click].files.push({
                    name: file.name,
                    url: 'http://otj3hc8no.bkt.clouddn.com/'+ res.key
                });
            },
            fileImgSuccessc(index){
                this.other_license_img_click = index;
            },
        }
    }
</script>
