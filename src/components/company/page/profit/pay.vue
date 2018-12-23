<template>
    <el-row v-loading.body="loading" element-loading-text="请稍后...">
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '../profit' }">财务管理</el-breadcrumb-item>
                <el-breadcrumb-item>支付管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>


        <el-col style="margin-top: 50px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

                <el-col style="margin-bottom: 10px">
                    <el-col :span="8">
                        <el-form-item label="账户余额:">
                            <p style="font-size:25px">{{this.ruleForm.money}} 元</p>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="支付金额">
                            <el-input v-model="ruleForm.pay" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入司机姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="ruleForm.phone" placeholder="司机手机号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="银行卡" prop="card">
                            <el-input v-model="ruleForm.card" placeholder="司机银行卡号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="身份证号"  prop="idcard">
                            <el-input v-model="ruleForm.idcard" placeholder="司机身份证号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="开户行" prop="bank">
                            <el-select v-model="ruleForm.bank" clearable placeholder="请选择">
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

                <el-row style="margin-top: 10px">
                    <el-col :offset="2">
                        <el-button type="success" @click="submitForm('ruleForm')">确认支付</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import { addPayCard, getProfit,getPayCard } from '@/api/profit';
    import { parseTime } from '@/utils/time';
    import { getDefindAll } from "@/api/system";

    export default {
        data() {
            return {
                loading: false,
                bank_list:[],
                ruleForm: {
                    id : this.$route.query.id,
                    money: 0.0,
                    name: '',
                    phone: '',
                    bank: '',
                    card: '',
                    idcard: '',
                    pay: 0.0,
                    token: localStorage.getItem('company_token')
                },
                rules: {
                    name: [
                        {required: true, message: '请输姓名'}
                    ],
                    phone: [
                        {required: true, message: '请填写手机号码'}
                    ],
                    bank: [
                        {required: true, message: '请选择银行'}
                    ],
                    card: [
                        {required: true, message: '请填写银行卡'}
                    ],
                    idcard: [
                        {required: true, message: '请填写身份证'}
                    ],
                },
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.loading = true;
                getProfit(this.$route.query.id).then(response => {
                    this.loading = false;
                    this.ruleForm.id = response.data.id;
                    this.ruleForm.pay = response.data.pay;
                });
                getDefindAll({type_code:'bank_list'}).then(response => {
                    this.bank_list = response.data;
                });
                getPayCard(this.$route.query.id,{token:localStorage.getItem('company_token')}).then(response => {
                    this.ruleForm.name = response.data.name;
                    this.ruleForm.phone = response.data.phone;
                    this.ruleForm.bank = response.data.bank;
                    this.ruleForm.card = response.data.card;
                    this.ruleForm.idcard = response.data.idcard;
                    this.ruleForm.money = response.data.money;
                    this.ruleForm.pay = response.data.pay;
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        addPayCard(this.ruleForm.id,this.ruleForm).then(response => {
                                this.loading = false;
                                this.$message({
                                    type: 'success',
                                    message: '转账成功!'
                                });
                                this.$router.push('../profit');
                            },
                            error =>{
                                this.loading = false;
                            });
                    } else {
                        return false;
                    }
                });
            }
        },
        filters: {
            time: function (value) {
                if(value == null || value =="")
                    return "";
                return parseTime(value,"{y}-{m}-{d}");
            }
        }
    };
</script>
