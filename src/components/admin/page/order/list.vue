<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>我的运单</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column fixed
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column label="订单号" width="180">
                    <template scope="scope">
                        <el-button type="text" @click="onOrder(scope.row.order.id)">{{ scope.row.order.order_number }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="发货人" width="250">
                    <template scope="scope">
                        <div style="margin-top:10px;margin-bottom: 10px">
                            <p>姓名：{{scope.row.orderCustomer.send_name}}</p>
                            <p>手机：{{scope.row.orderCustomer.send_phone}}</p>
                            <p>地址：{{scope.row.orderCustomer.send_addr}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="收货人" width="250">
                    <template scope="scope">
                        <div style="margin-top:10px;margin-bottom: 10px">
                            <p>姓名：{{scope.row.orderCustomer.recive_name}}</p>
                            <p>手机：{{scope.row.orderCustomer.recive_phone}}</p>
                            <p>地址：{{scope.row.orderCustomer.recive_addr}}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="下单账户" width="200">
                    <template scope="scope" >
                        <p>账户名：{{scope.row.customer.user.username}}</p>
                        <p>昵称：{{scope.row.customer.userInfo.nickname}}</p>
                    </template>
                </el-table-column>

                <el-table-column
                    label="订单状态" width="250">
                    <template scope="scope">
                        <el-tag type="success" v-show="scope.row.order.status ==='ORDER_SIGN'">已签收</el-tag>
                        <el-tag type="danger" v-show="scope.row.order.status ==='ORDER_REFUSE'">已拒绝</el-tag>

                        <div v-if="scope.row.order.status ==='ORDER_PLACE'">
                            <p><el-tag type="gray" v-show="scope.row.order.status ==='ORDER_PLACE'">未处理</el-tag></p>
                            <div>
                                <p v-if="scope.row.order.is_company"><el-tag type="primary">指定：{{scope.row.wantCompany.userInfo.company}}</el-tag></p>
                                <p v-else><el-tag type="gray">未指定物流公司</el-tag></p>
                            </div>
                        </div>
                        <div v-if="scope.row.order.status ==='ORDER_TAKING'">
                            <div>
                                <p><el-tag type="primary">运输中</el-tag></p>
                                <p><el-tag type="primary">{{scope.row.company.userInfo.company}}</el-tag></p>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="费用" width="200">
                    <template scope="scope" >
                        <div v-if="scope.row.order.status =='ORDER_TAKING' || scope.row.order.status =='ORDER_SIGN'">
                            <p>保险：{{scope.row.orderTaking.safes}} 元</p>
                            <p>运费：{{scope.row.orderTaking.freight}} 元</p>
                            <p>合计费用：{{scope.row.orderTaking.recive}} 元</p>
                        </div>
                        <div v-else>
                            <el-tag type="gray" >未处理</el-tag>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="时间" width="250">
                    <template scope="scope" >
                        <div v-if="scope.row.order.status ==='ORDER_REFUSE'">
                            <p><el-tag type="gray">下单时间：{{scope.row.orderCustomer.time|time}}</el-tag></p>
                        </div>
                        <div v-if="scope.row.order.status ==='ORDER_PLACE'">
                            <p><el-tag type="gray">下单时间：{{scope.row.orderCustomer.time|time}}</el-tag></p>
                        </div>
                        <div v-if="scope.row.order.status ==='ORDER_TAKING'">
                            <p><el-tag type="gray">下单时间：{{scope.row.orderCustomer.time|time}}</el-tag></p>
                            <p><el-tag type="primary">处理时间：{{scope.row.orderTaking.time|time}}</el-tag></p>
                        </div>
                        <div v-if="scope.row.order.status ==='ORDER_SIGN'">
                            <p><el-tag type="gray">下单时间：{{scope.row.orderCustomer.time|time}}</el-tag></p>
                            <p><el-tag type="primary">处理时间：{{scope.row.orderTaking.time|time}}</el-tag></p>
                            <p><el-tag type="success">签收时间：{{scope.row.orderSign.time|time}}</el-tag></p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="100" fixed="right">
                    <template scope="scope">
                        <el-button type="danger" icon="delete" size="small" @click="delete_order(scope.row.order.id)">删除</el-button>
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

    </el-row>
</template>

<script>
    import {getOrderListAll,deleteOrder} from '@/api/order/order.js'
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
                    token:localStorage.getItem('token')
                },
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getOrderListAll(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
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
                    path:'/admin/home/order/info',
                    query:{
                        id: id
                    },
                });
            },
            delete_order(id) {
                this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteOrder(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '已经删除!'
                        });
                        this.fetchData();
                    });
                });
            },
        },
        filters: {
            time: function (value) {
                return parseTime(value,"{y}年{m}月{d}日 {hh}:{mm}:{ss}");
            }
        }
    };
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 400px;
        width: 400px;
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
        width: 400px;
        height: 400px;
        display: block;
    }
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
