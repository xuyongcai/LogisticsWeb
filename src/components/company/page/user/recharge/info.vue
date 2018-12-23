<template>
    <el-row v-loading.body="Loading" element-loading-text="请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>充值</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row type="flex" justify="center" style="margin-top: 30px">
            <el-steps :space="200" :active="active" finish-status="success">
                <el-step title="确认充值单"></el-step>
                <el-step title="网银转账"></el-step>
                <el-step title="认款成功"></el-step>
            </el-steps>
        </el-row>

        <el-row style="margin-top: 50px">
            <el-form :model="rechargeForm" ref="rechargeForm" label-width="150px" class="demo-ruleForm">


                <el-form-item label="转出单位:">
                    <p>{{rechargeForm.company_out}}</p>
                </el-form-item>

                <el-form-item label="收款户名:">
                    <p>{{rechargeForm.bank_name}}</p>
                </el-form-item>
                <el-form-item label="收款账号:">
                    <p>{{rechargeForm.bank_number}}</p>
                </el-form-item>
                <el-form-item label="收款银行:">
                    <p>{{rechargeForm.bank}}</p>
                </el-form-item>
                <el-form-item label="收款行点:">
                    <p>{{rechargeForm.bank_addr}}</p>
                </el-form-item>
                <el-form-item label="金额:">
                    <p style="font-size: 20px; color:red">{{rechargeForm.money}}</p>
                </el-form-item>
                <el-form-item label="用途:">
                    <p>{{rechargeForm.money_for}}</p>
                </el-form-item>
                <el-form-item label="汇款识别码:">
                    <p style="font-size: 20px; color:red">{{rechargeForm.money_code}}</p>
                    <p>注意：请使用对<span style="color:red">公账户转账</span>，在网银转账时请务必将<span style="color:red">18位转账识别码</span>填写到用<span style="color:red">途或备注</span>中，柜台存款请将转账识别码填写到<span style="color:red">转账用途</span>中</p>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('rechargeForm')" icon="upload">确认</el-button>
                </el-form-item>
            </el-form>
        </el-row>

    </el-row>
</template>
<script>
    import { getMyRechargeList } from '@/api/recharge.js'
    import { parseTime } from '@/utils/time'

    export default {
        data() {
            return {
                Loading: false,
                LoadingParam:{
                    token: localStorage.getItem('customer_token')
                },
                rechargeForm: {
                    id:'',
                    fk_user_id: '',
                    company_out: '',
                    bank_name: '',
                    bank_number: '',
                    bank: '',
                    bank_addr: '',
                    money: 0,
                    money_code: '',
                    money_for: ''
                },
                active:2
            };
        },
        created() {
            this.loadForm();
        },
        methods: {
            loadForm(){
                this.Loading = true;
                createRecharge(this.LoadingParam).then(response => {
                    this.rechargeForm = response.data;
                    this.Loading = false;
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        createRecharge(this.rechargeForm).then(response => {
                                this.listLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '申请充值成功!'
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
            }
        }
    }
</script>
