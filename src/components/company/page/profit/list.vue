<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="index" label="" width="60"/>
                <el-table-column label="订单编号" width="180">
                    <template scope="scope">
                        <el-button type="text" @click="onOrder(scope.row.fk_order_id)">{{ scope.row.order_number }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="recive" label="应收账款"/>
                <el-table-column prop="pay" label="应付账款"/>
                <el-table-column label="已收账款">
                    <template scope="scope">
                        <el-tag type="primary"> {{scope.row.recive_now}} 元</el-tag>
                        <el-tag type="primary" v-if="scope.row.is_recive"> 完成 </el-tag>
                        <el-tag type="danger" v-if="!scope.row.is_recive"> 未完成 </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="已付账款">
                    <template scope="scope">
                        <el-tag type="primary"> {{scope.row.pay_now}} 元</el-tag>
                        <el-tag type="primary" v-if="scope.row.is_pay"> 完成 </el-tag>
                        <el-tag type="danger" v-if="!scope.row.is_pay"> 未完成 </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                    <template scope="scope">

                        <el-button-group>
                            <el-button type="primary" @click="showDialog('recive',scope.row)" icon="caret-left" size="small" v-if="!scope.row.is_recive">收款
                            </el-button>
                            <el-button type="danger" @click="onPay(scope.row.id)" icon="caret-right" size="small" v-if="!scope.row.is_pay">付款
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-row type="flex" justify="space-around" style="margin-top: 30px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="listQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-row>

    <el-dialog title="增加收款" :visible.sync="reciveDialog.isDialog">
        <el-form :model="reciveDialog">
            <el-form-item label="应收账款">
                <el-input v-model="reciveDialog.recive" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="已收款">
                <el-input-number v-model="reciveDialog.recive_now" ></el-input-number>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="reciveDialog.isDialog = false">取 消</el-button>
            <el-button type="primary" @click="recive()">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="增加付款" :visible.sync="payDialog.isDialog">
        <el-form :model="payDialog">
            <el-form-item label="应付账款">
                <el-input v-model="payDialog.pay" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="已付款">
                <el-input-number v-model="payDialog.pay_now" ></el-input-number>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="payDialog.isDialog = false">取 消</el-button>
            <el-button type="primary" @click="pay()">确 定</el-button>
        </div>
    </el-dialog>
    </el-row>
</template>

<script>
    import { getProfitList, addPay, addRecive } from '@/api/profit';
    import { parseTime } from '@/utils/time';

    export default {
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10,
                    token: localStorage.getItem('company_token')
                },
                payForm:{
                    pay: '',
                },
                reciveForm:{
                    recive: '',
                },
                reciveDialog: {
                    isDialog: false,
                    recive: '',
                    recive_now: '',
                    id: ''
                },
                payDialog: {
                    isDialog: false,
                    pay: '',
                    pay_now: '',
                    id: ''
                },
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getProfitList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            recive(){
                this.reciveForm.recive = this.reciveDialog.recive_now;
                addRecive(this.reciveDialog.id,this.reciveForm).then(response => {
                    this.reciveDialog.isDialog = false;
                    this.fetchData();
                });
            },
            onPay(id){
                /*
                this.payForm.pay = this.payDialog.pay_now;
                addPay(this.payDialog.id,this.payForm).then(response => {
                    this.payDialog.isDialog = false;
                    this.fetchData();
                });*/
                this.$router.push({
                    path:'/company/home/profit/pay',
                    query:{
                        id: id
                    },
                });
            },
            showDialog(type,row){
                if(type == 'pay'){
                    this.payDialog.isDialog = true;
                    this.payDialog.id = row.id;
                    this.payDialog.pay = row.pay;
                }else{
                    this.reciveDialog.isDialog = true;
                    this.reciveDialog.id = row.id;
                    this.reciveDialog.recive = row.recive;
                }
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.listQuery.offset = this.listQuery.pageSize * (val -1);
                this.fetchData();
            },
            onOrder(id){
                this.$router.push({
                    path:'/company/home/order/info',
                    query:{
                        id: id
                    },
                });
            },
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

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 150px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }
</style>
