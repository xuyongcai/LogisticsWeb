<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>抢单市场</el-breadcrumb-item>
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
                    label="订单状态" width="250">
                    <template scope="scope">
                        <el-tag type="primary" v-show="scope.row.order.status ==='ORDER_TAKING'">运输中</el-tag>
                        <el-tag type="success" v-show="scope.row.order.status ==='ORDER_SIGN'">已签收</el-tag>
                        <el-tag type="danger" v-show="scope.row.order.status ==='ORDER_REFUSE'">已拒绝</el-tag>

                        <div v-if="scope.row.order.status ==='ORDER_PLACE'">
                            <p><el-tag type="gray" v-show="scope.row.order.status ==='ORDER_PLACE'">未处理</el-tag></p>
                            <div>
                                <p v-if="scope.row.order.is_company"><el-tag type="primary">指定：{{scope.row.wantCompany.userInfo.company}}</el-tag></p>
                                <p v-else><el-tag type="gray">未指定物流公司</el-tag></p>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="时间" width="250">
                    <template scope="scope" >
                        <div v-if="scope.row.order.status ==='ORDER_PLACE'">
                            <p><el-tag type="gray" v-show="scope.row.order.status ==='ORDER_PLACE'">下单时间：{{scope.row.orderCustomer.time|time}}</el-tag></p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="150" fixed="right">
                    <template scope="scope">
                        <el-button type="info" icon="plus" size="small" @click="taking(scope.row.order.id)">抢单</el-button>
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
    import { refuseCustomerOrder,addSignOrder,deleteOrder } from '@/api/order';
    import { getCompanyOpenOrder } from '@/api/order/order_company.js';
    import { getUploadToken } from '@/api/util.js';
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
                    token:localStorage.getItem('company_token')
                },
                refuseForm:{
                    token:localStorage.getItem('company_token'),
                    fk_order_customer_id:''
                },
                signForm:{
                    token:localStorage.getItem('company_token'),
                    fk_order_customer_id:'',
                    order_img:''
                },
                dialogFormVisible:false,
                imagePercente: 0,
                uploadToken: {
                    token:''
                },
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getCompanyOpenOrder(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
                getUploadToken().then(response => {
                    this.uploadToken.token = response.data;
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
                    path:'/company/home/order/info',
                    query:{
                        id: id
                    },
                });
            },
            taking(id){
                this.$router.push({
                    path:'/company/home/order/taking',
                    query:{
                        id: id
                    },
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
