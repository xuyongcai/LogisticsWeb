<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>司机管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="primary" @click="createData()">添加司机</el-button>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-col :span="10">
                                <el-form-item label="姓名">
                                    <span>{{ props.row.fleetDriver.name }}</span>
                                </el-form-item>
                                <el-form-item label="电话">
                                    <span>{{ props.row.fleetDriver.phone }}</span>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <span>{{ props.row.fleetDriver.sex }}</span>
                                </el-form-item>
                                <el-form-item label="是否短信通知">
                                    <span>{{ props.row.fleetDriver.is_sms }}</span>
                                </el-form-item>
                                <el-form-item label="银行卡号">
                                    <span>{{ props.row.fleetDriver.bank_number }}</span>
                                </el-form-item>
                                <el-form-item label="开户行地址">
                                    <span>{{ props.row.fleetDriver.bank_addr }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="创建时间">
                                    <span>{{ props.row.fleetDriver.time | time }}</span>
                                </el-form-item>
                                <el-form-item label="身份证号码">
                                    <span>{{ props.row.fleetDriver.idcard }}</span>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <span>{{ props.row.fleetDriver.email }}</span>
                                </el-form-item>
                                <el-form-item label="籍贯">
                                    <span>{{ props.row.fleetDriver.hometown }}</span>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="fleetDriver.name" label="姓名"/>
                <el-table-column prop="fleetDriver.phone" label="手机号"/>
                <el-table-column
                    label="性别">
                    <template scope="scope">
                        <el-tag type="primary" >{{scope.row.fleetDriver.sex}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="driver.is_sms" label="是否短信通知">
                    <template scope="scope">
                        <el-tag type="success" v-if="scope.row.fleetDriver.is_sms">是</el-tag>
                        <el-tag type="primary" v-if="!scope.row.fleetDriver.is_sms">否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="添加时间">
                    <template scope="scope">
                        <p>{{scope.row.fleetDriver.time | time}}</p>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="250">
                    <template scope="scope">

                            <el-button-group>
                                <!--<el-button type="primary" icon="edit" size="small">编辑</el-button>-->
                                <!--<el-button type="warning" icon="setting" size="small">重置密码</el-button>-->
                                <el-button type="danger" @click="deleteData(scope.row.fleetDriver.id)" icon="delete" size="small">删除</el-button>
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
    </el-row>
</template>

<script>
    import { getDriverListEx, deleteDriver } from '@/api/driver';
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
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                getDriverListEx(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            deleteData(id) {
                this.$confirm('此操作将删除该司机, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.list[index].orderCustomer.status;
                    deleteDriver(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData();
                    });
                });
            },
            createData(){
                this.$router.push('/company/home/driver/add');
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.fetchData();
            },
            handleCurrentChange(val) {
                this.listQuery.offset = this.listQuery.pageSize * (val -1);
                this.fetchData();
            }
        },
        filters: {
            time: function (value) {
                return parseTime(value);
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
