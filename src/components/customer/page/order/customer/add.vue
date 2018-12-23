<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在提交，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../order' }">我的运单</el-breadcrumb-item>
            <el-breadcrumb-item>新建订单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row style="margin-top: 50px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-row style="width: 1200px">
                    <el-col>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="寄件人姓名" prop="send_name">
                                    <el-input v-model="ruleForm.send_name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="寄件人手机号" prop="send_phone">
                                    <el-input v-model="ruleForm.send_phone"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="寄件人地址" prop="send_addr_ex">
                                    <el-cascader :options="options" v-model="ruleForm.send_addr_ex"
                                                 style="width: 100%;"></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="寄件人详细地址" prop="send_addr_info">
                                    <el-input type="textarea" v-model="ruleForm.send_addr_info" @blur="initMap"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收件人姓名" prop="recive_name">
                                    <el-input v-model="ruleForm.recive_name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="收件人手机号" prop="recive_phone">
                                    <el-input v-model="ruleForm.recive_phone"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收件人地址" prop="recive_addr_ex">
                                    <el-cascader :options="options" v-model="ruleForm.recive_addr_ex"
                                                 style="width: 100%;"></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="收件人详细地址" prop="recive_addr_info">
                                    <el-input type="textarea" v-model="ruleForm.recive_addr_info" @blur="initMap"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="配送方式" prop="dispatching_type">
                            <el-radio-group v-model="ruleForm.dispatching_type">
                                <el-radio class="radio" label="配送"></el-radio>
                                <el-radio class="radio" label="自提"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="预计发货日期" prop="send_time_ex">
                                    <el-date-picker type="date" placeholder="选择日期"
                                                    v-model="ruleForm.send_time_ex"
                                                    format="yyyy年MM月dd日"
                                                    :editable="false"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="限时到达日期" prop="recive_time_ex">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.recive_time_ex" format="yyyy年MM月dd日" :editable="false"
                                                    style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                                <el-form-item label="指定物流公司接单">
                                    <el-switch
                                        v-model="ruleForm.is_company">
                                    </el-switch>
                                </el-form-item>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="物流公司" v-if="ruleForm.is_company" prop="fk_want_company_id">
                                    <el-select v-model="ruleForm.fk_want_company_id" placeholder="请选择物流公司" style="width: 100%;">
                                        <el-option
                                            v-for="item in companyList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-col>
                </el-row>

                <el-card class="box-card" style="margin: 50px">
                    <div slot="header">
                        <span style="line-height: 36px;">货物清单</span>
                        <el-button @click="addGoodsEx" icon="plus" type="info" style="float: right;">
                            新增货物
                        </el-button>
                    </div>
                    <el-table
                        :data="ruleForm.goods"
                        border
                        :summary-method="getSummaries"
                        show-summary
                        style="width: 100%">
                        <el-table-column
                            label="货物名称">
                            <template scope="scope">
                                <el-input v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="货物重量(吨)">
                            <template scope="scope">
                                <el-input v-model="scope.row.weight"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="货物尺寸">
                            <template scope="scope">
                                <el-input v-model="scope.row.size"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            sortable
                            label="数量">
                            <template scope="scope">
                                <el-input v-model="scope.row.number"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="备注">
                            <template scope="scope">
                                <el-input v-model="scope.row.remark"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template scope="scope">
                                <el-button
                                    type="danger"
                                    @click="removeGoods(scope.$index)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

                <el-card class="box-card" style="margin: 50px"  v-loading.body="map.mapLoading" element-loading-text="正在规划路线，请稍后...">
                    <el-alert :title="map.info_text" :type="map.info_type" :closable="false" show-icon style="width:300px;"/>
                    <el-row v-show="map.result" style="margin: 10px">
                        <p>规划路程总计：<el-tag type="danger">{{map.length}}</el-tag></p><br/>
                        <p>预计驾驶时间：<el-tag type="danger">{{map.time}}</el-tag></p>
                    </el-row>
                    <el-amap vid="amap" :map-manager="amapManager" style="width: 100%; height: 400px;" :scrollWheel="false" :plugin="plugin"></el-amap>
                </el-card>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" icon="upload">立即创建</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </el-row>
</template>
<script>
    import {regionData, CodeToText} from 'element-china-area-data'
    import {addCustomerOrder} from '@/api/order/order_customer.js'
    import { parseTime } from '@/utils/time'
    import {AMapManager} from 'vue-amap'
    import {CompanyInfoListSelect} from '@/api/user/manager.js'

    export default {
        data() {
            return {
                map:{
                    info_type:'info',
                    info_text:'等待规划路线',
                    result:false,
                    time:'',
                    length:'',
                    mapLoading:false,
                },
                amapManager: new AMapManager(),
                plugin:['Scale','ToolBar'],
                CodeToText: CodeToText,
                options: regionData,
                dialogFormVisible: false,
                listLoading: false,
                companyList:null,
                goodForm:{
                    name: '',
                    size: 0,
                    weight: 0,
                    number: 0,
                    freight: 0,
                    remark: ''
                },
                goodRules:{
                    name: [
                        {required: true, message: '请输入货物名称'},
                    ],
                    number: [
                        {required: true, message: '数量不能为空'},
                    ],
                    freight: [
                        {required: true, message: '运费不能为空'},
                    ]
                },
                ruleForm: {
                    send_name: '',
                    send_phone: '',
                    send_addr: '',
                    send_addr_ex: [],
                    send_addr_info: '',
                    recive_name: '',
                    recive_phone: '',
                    recive_addr: '',
                    recive_addr_ex: [],
                    recive_addr_info: '',
                    dispatching_type: '',
                    send_time_ex: null,
                    recive_time_ex: null,
                    send_time: '',
                    recive_time: '',
                    goods: [],
                    is_company:false,
                    fk_want_company_id:null,
                    token: localStorage.getItem('customer_token'),
                },
                rules: {
                    send_name: [
                        {required: true, message: '请输姓名'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
                    ],
                    send_phone: [
                        {required: true, message: '请填写手机号码'}
                    ],
                    send_time_ex: [
                        {type: 'date', required: true, message: '请选择日期'}
                    ],
                    send_addr_ex: [
                        {required: true, message: '请输入地址'}
                    ],
                    send_addr_info: [
                        {required: true, message: '请输入详细地址'}
                    ],
                    recive_name: [
                        {required: true, message: '请输姓名'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
                    ],
                    recive_phone: [
                        {required: true, message: '请填写手机号码'}
                    ],
                    recive_time_ex: [
                        {type: 'date', required: true, message: '请选择日期'}
                    ],
                    recive_addr_ex: [
                        {required: true, message: '请输入地址'}
                    ],
                    recive_addr_info: [
                        {required: true, message: '请输入详细地址'}
                    ],
                    dispatching_type:[
                        {required: true, message: '请选择配送方式'}
                    ],
                    fk_want_company_id:[
                        {required: true, message: '请选择物流公司'}
                    ]
                }
            };
        },
        created(){
            this.initWeb();
        },
        methods: {
            initWeb(){
                CompanyInfoListSelect().then(response => {
                    this.companyList = response.data;
                    console.log(this.companyList);
                });
            },
            //删除货物
            removeGoods(index) {
                if (index !== -1) {
                    this.ruleForm.goods.splice(index, 1)
                }
            },
            //添加货物
            addGoods(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogFormVisible = false;
                        this.ruleForm.goods.push(this.goodForm);
                        this.goodForm = {
                            name: "",
                            size: 0,
                            weight: 0,
                            number: 0,
                            freight: 0,
                            remark: ""
                        };
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //添加货物
            addGoodsEx() {
                this.ruleForm.goods.push({
                    name: "",
                    size: 0,
                    weight: 0,
                    number: 0,
                    freight: 0,
                    remark: ""
                });
                console.log(this.amapManager.getMap());
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        this.submitConfig();
                        addCustomerOrder(this.ruleForm).then(response => {
                                this.listLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.$router.push('/customer/home/order');
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm.goods = [];
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                var count_freight = 0;
                var count_weight = 0;
                data.forEach((colum,index) =>{
                    count_freight += parseFloat(colum.freight);
                    count_weight += parseFloat(colum.weight);
                });
                sums[0] = '合计';
                sums[1] = count_weight + '吨';
                return sums;
            },
            submitConfig(){
                //地址转换
                this.ruleForm.recive_addr = '';
                this.ruleForm.send_addr = '';
                for(var i=0; i<3; i++){
                    this.ruleForm.recive_addr += CodeToText[this.ruleForm.recive_addr_ex[i]];
                    this.ruleForm.send_addr += CodeToText[this.ruleForm.send_addr_ex[i]];
                    if(i!=2){
                        this.ruleForm.send_addr +='/';
                        this.ruleForm.recive_addr +='/';
                    }
                }
                //时间转换
                this.ruleForm.send_time = parseTime(this.ruleForm.send_time_ex,"{y}/{m}/{d}");
                this.ruleForm.recive_time = parseTime(this.ruleForm.recive_time_ex,"{y}/{m}/{d}");
            },
            //地图回执路线
            initMap(){
                //地址转换
                var map_recive_addr = "";
                var map_send_addr = "";
                for(var i=0; i<3; i++){
                    if(this.ruleForm.recive_addr_ex[i] == null)
                        return;
                    map_recive_addr += CodeToText[this.ruleForm.recive_addr_ex[i]];
                    map_send_addr += CodeToText[this.ruleForm.send_addr_ex[i]];
                }
                map_recive_addr += this.ruleForm.recive_addr_info;
                map_send_addr += this.ruleForm.send_addr_info;
                map_recive_addr = map_recive_addr.replace("市辖区","");
                map_send_addr = map_send_addr.replace("市辖区","");

                var map = this.amapManager.getMap();
                map.clearMap();
                var _this = this;
                AMap.service('AMap.Driving',function(){//回调函数
                    //实例化Driving
                    var driving = new AMap.Driving({
                        map: map,
                    });
                    driving.search([{keyword:map_send_addr},{keyword:map_recive_addr}], function(status, result){
                        if(status === 'complete' && result.info === 'OK') {
                            _this.map.result = true;
                            _this.map.info_text = "路线规划成功";
                            _this.map.info_type = "success";
                            _this.map.time = (result.routes[0].time/3600).toFixed(1) + "小时";
                            _this.map.length = result.routes[0].distance/1000 + "公里";
                            console.log(result.routes[0]);
                        }else{
                            _this.map.result = false;
                            _this.map.info_text = "路线规划出错";
                            _this.map.info_type = "warning";
                        }
                    });
                })
            },
        }
    }
</script>


