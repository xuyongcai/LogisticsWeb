<template>
    <el-row>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../order' }">运单管理</el-breadcrumb-item>
            <el-breadcrumb-item>合同</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col :span="5" style="margin-top: 30px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
                <el-form-item label="甲方" prop="aname">
                    <el-input v-model="ruleForm.aname"></el-input>
                </el-form-item>
                <el-form-item label="乙方" prop="bname">
                    <el-input v-model="ruleForm.bname"></el-input>
                </el-form-item>
                <el-form-item label="户名" prop="bbank_name">
                    <el-input v-model="ruleForm.bbank_name"></el-input>
                </el-form-item>
                <el-form-item label="账户" prop="bbank_number">
                    <el-input v-model="ruleForm.bbank_number"></el-input>
                </el-form-item>
                <el-form-item label="开户行" prop="bbank">
                    <el-input v-model="ruleForm.bbank"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">更新合同</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="18" :offset="1">
            <order-contract-page :order_id="order_id" ref="refOrderContractPage"></order-contract-page>
        </el-col>
    </el-row>
</template>
<script>
    import OrderContractPage from "../../../../public/order/OrderContractPage.vue";
    import { getOrder } from '@/api/order/order.js';
    import { editContractOrder } from '@/api/order/order_contract.js';

    export default {
        components: {
            OrderContractPage
        },
        data() {
            return {
                order: null,
                order_id: this.$route.query.id,
                ruleForm: {
                    id:"",
                    aname: "",
                    bname: "",
                    bbank_name: "",
                    bbank_number: "",
                    bbank: ""
                },
                listLoading: false,
                rules: {
                    aname: [
                        { required: true, message: '请输入甲方名称'},
                    ],
                    bname: [
                        { required: true, message: '请输入乙方名称'},
                    ],
                    bbank_name: [
                        { required: true, message: '请输入户名'},
                    ],
                    bbank_number: [
                        { required: true, message: '请输入账号'},
                    ],
                    bbank: [
                        { required: true, message: '请输入开户行称'},
                    ],
                },
            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getOrder(this.order_id).then(response => {
                    this.order = response.data;
                    this.ruleForm.aname = this.order.orderContract.aname;
                    this.ruleForm.bname = this.order.orderContract.bname;
                    this.ruleForm.bbank_name = this.order.orderContract.bbank_name;
                    this.ruleForm.bbank_number = this.order.orderContract.bbank_number;
                    this.ruleForm.bbank = this.order.orderContract.bbank;
                    this.ruleForm.id = this.order.orderContract.id;
                    this.listLoading = false;
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        editContractOrder(this.ruleForm.id,this.ruleForm).then(response => {
                            this.listLoading = false;
                            this.fetchData();
                            this.$refs.refOrderContractPage.fetchData();
                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>


