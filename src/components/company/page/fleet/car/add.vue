<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在提交，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../car' }">车辆管理</el-breadcrumb-item>
            <el-breadcrumb-item>增加车辆</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col style="margin-top: 50px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="车牌号" prop="plate">
                            <el-input v-model="ruleForm.plate" placeholder="请输入车牌号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="车辆类型" prop="type">
                            <el-select v-model="ruleForm.type" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in car_type"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="车辆所属" prop="resource">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio class="radio" label="自有">自有</el-radio>
                                <el-radio class="radio" label="第三方">第三方</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="随车司机姓名">
                            <el-input v-model="ruleForm.driver_name">
                                <el-button slot="append" icon="search" @click="onSelectDriver"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="随车电话">
                            <el-input v-model="ruleForm.driver_phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="挂车车牌">
                            <el-input v-model="ruleForm.two_plate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="能耗类型">
                            <el-select v-model="ruleForm.energy" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in car_energy"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="车辆长度">
                            <el-select v-model="ruleForm.length" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in car_lenth"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="核定载重">
                            <el-input v-model="ruleForm.weight">
                                <template slot="append">吨</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="汽车VIN码">
                            <el-input v-model="ruleForm.vin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="车辆品牌">
                            <el-select v-model="ruleForm.brand" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in car_brand"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="发动机号">
                            <el-input v-model="ruleForm.engine"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="车轴数">
                            <el-input v-model="ruleForm.axle"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="轴距">
                            <el-input v-model="ruleForm.wheelbase"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="轮胎数量">
                            <el-input v-model="ruleForm.tire"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="出厂日期">
                            <el-date-picker
                                type="date" placeholder="选择日期"
                                            :value="ruleForm.factory_time"
                                            @input="ruleForm.factory_time = day($event)"
                                            style="width: 100%;" format="yyyy/MM/dd">
                            </el-date-picker>
                        </el-form-item>

                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="购买日期">
                            <el-date-picker type="date" placeholder="选择日期"
                                            :value="ruleForm.buy_time"
                                            @input="ruleForm.buy_time = day($event)"
                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="购买价格">
                            <el-input v-model="ruleForm.buy_price"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="年审日期">
                            <el-date-picker type="date" placeholder="选择日期"
                                            :value="ruleForm.limited_time"
                                            @input="ruleForm.limited_time = day($event)"
                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="二级维护有效期">

                            <el-date-picker type="date" placeholder="选择日期"
                                            :value="ruleForm.tow_maintain_time"
                                            @input="ruleForm.tow_maintain_time = day($event)"
                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="保险单号">
                            <el-input v-model="ruleForm.insurance_policy"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="保险公司">
                            <el-input v-model="ruleForm.insurance_company"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="保险有效期">
                            <el-date-picker type="date" placeholder="选择日期"
                                            :value="ruleForm.insurance_time"
                                            @input="ruleForm.insurance_time = day($event)"
                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="车头照片">
                            <el-upload
                                class="upload-demo"
                                action="http://upload-z2.qiniu.com"
                                :data="uploadToken"
                                :on-success="frontImgSuccess"
                                :file-list="ruleForm.front_img"
                                list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="车尾照片">
                            <el-upload
                                class="upload-demo"
                                action="http://upload-z2.qiniu.com"
                                :data="uploadToken"
                                :on-success="tailImgSuccess"
                                :file-list="ruleForm.tail_img"
                                list-type="picture">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="车辆备注">
                            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="21">
                        <el-row v-for="(license, index) in ruleForm.license">
                            <el-card class="box-card" style="margin-top: 20px">
                                <div slot="header" class="clearfix">
                                    <span style="line-height: 36px;">证件 No.{{index + 1}}</span>
                                    <el-button @click.prevent="removeLicense(license)" style="float: right;"
                                               type="danger" icon="delete">删除
                                    </el-button>
                                </div>

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="证件编号"
                                                      :prop="'license.' + index + '.number'"
                                                      :rules="{required: true, message: '证件编号不能为空'}">
                                            <el-input v-model="license.number"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="证件类型"
                                                      :prop="'license.' + index + '.type'"
                                                      :rules="{required: true, message: '请选择证件类型'}">
                                            <el-select v-model="license.type" clearable placeholder="请选择">
                                                <el-option
                                                    v-for="item in car_license_type"
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
                                        <el-form-item label="办证日期">
                                            <el-date-picker type="date" placeholder="选择日期"
                                                            :value="license.pass_time"
                                                            @input="license.pass_time = day($event)"
                                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="有效日期">
                                            <el-date-picker type="date" placeholder="选择日期"
                                                            :value="license.valid_date"
                                                            @input="license.valid_date = day($event)"
                                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="有效日期止">
                                            <el-date-picker type="date" placeholder="选择日期"
                                                            :value="license.unvalide_date"
                                                            @input="license.unvalide_date = day($event)"
                                                            style="width: 100%;" format="yyyy/MM/dd"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="备注">
                                            <el-input type="textarea" v-model="license.remark"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
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
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-row>
                    </el-col>
                </el-row>

                <el-form-item style="margin-top: 30px">
                <el-button @click="addLicense" icon="plus"  type="info">新增证件</el-button>
                </el-form-item>

                <el-form-item style="margin-top: 30px" >
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>

                <my-driver-choise @onselect="onSelectDriverSubmit" :mtoken="mtoken" ref="myDriverChoise"></my-driver-choise>
            </el-form>
        </el-col>

    </el-row>
</template>
<script>
    import { addCar } from '@/api/car';
    import { getDefindAll } from "@/api/system";
    import { getUploadToken } from '@/api/util.js'
    import { parseTime } from '@/utils/time';
    import MyDriverChoise from "@/components/public/fleet/DriverChoiseDialog.vue";

    export default {
        components: {
            MyDriverChoise
        },
        data() {
            return {
                ruleForm: {
                    plate: '',
                    type: '',
                    resource: '',
                    two_plate: '',
                    driver_phone: '',
                    driver_name: '',
                    energy: '',
                    length: '',
                    weight: '',
                    vin: '',
                    brand: '',
                    engine: '',
                    axle: '',
                    wheelbase: '',
                    tire: '',
                    factory_time: null,
                    buy_time: null,
                    buy_price: '',
                    limited_time: null,
                    tow_maintain_time: null,
                    insurance_policy: '',
                    insurance_company: '',
                    insurance_time: null,
                    front_img: [],
                    tail_img: [],
                    remark: '',
                    license:[],
                    token: localStorage.getItem('company_token')
                },
                rules: {
                    plate: [
                        {required: true, message: '请输入车牌'}
                    ],
                    type: [
                        {required: true, message: '选择车辆类型'}
                    ],
                    resource: [
                        {required: true, message: '请选择'}
                    ]
                },
                listLoading: false,
                car_type: null,
                car_energy: null,
                car_lenth: null,
                car_brand: null,
                car_license_type: null,
                uploadToken: {
                    token:''
                },
                license_img_click: 0,
                mtoken:localStorage.getItem('company_token')

            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
                getDefindAll({type_code:'car_type'}).then(response => {
                    this.car_type = response.data;
                });
                getDefindAll({type_code:'car_energy'}).then(response => {
                    this.car_energy = response.data;
                });
                getDefindAll({type_code:'car_lenth'}).then(response => {
                    this.car_lenth = response.data;
                });
                getDefindAll({type_code:'car_brand'}).then(response => {
                    this.car_brand = response.data;
                });
                getDefindAll({type_code:'car_license_type'}).then(response => {
                    this.car_license_type = response.data;
                });
                getUploadToken().then(response => {
                    this.uploadToken.token = response.data;
                });
            },
            removeLicense(item) {
                var index = this.ruleForm.license.indexOf(item)
                if (index !== -1) {
                    this.ruleForm.license.splice(index, 1)
                }
            },
            addLicense() {
                this.ruleForm.license.push({
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
                        addCar(this.ruleForm).then(response => {
                            this.listLoading = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.push('../car');
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
            onSelectDriver(){
                this.$refs.myDriverChoise.show();
            },
            onSelectDriverSubmit(row){
                this.ruleForm.driver_name = row.fleetDriver.name;
                this.ruleForm.driver_phone = row.fleetDriver.phone;
            },
            tailImgSuccess(res, file) {
                this.ruleForm.tail_img.push({
                    name: file.name,
                    url: 'http://otj3hc8no.bkt.clouddn.com/'+ res.key
                });
            },
            frontImgSuccess(res, file) {
                this.ruleForm.front_img.push({
                    name: file.name,
                    url: 'http://otj3hc8no.bkt.clouddn.com/'+ res.key
                });
            },
            fileImgSuccess(res, file) {
                this.ruleForm.license[this.license_img_click].files.push({
                    name: file.name,
                    url: 'http://otj3hc8no.bkt.clouddn.com/'+ res.key
                });
            },
            fileImgSuccessc(index){
                this.license_img_click = index;
            },
            day(val){
                if(val == null)
                    return null;
                return parseTime(val,"{y}/{m}/{d}");
            }
        },
        filters: {
            day: function (value) {
                return parseTime(value,"{y}/{m}/{d}");
            }
        }
    }
</script>
