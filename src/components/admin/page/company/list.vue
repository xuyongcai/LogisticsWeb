<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>物流公司账户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="primary" @click="createData()">添加账户</el-button>
        </el-row>
        <el-row style="margin-top:30px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="index"/>
                <el-table-column label="头像" align="center">
                    <template scope="scope">
                        <img v-if="scope.row.userInfo != null" :src="scope.row.userInfo.img" height="60px" style="margin: 5px"/>
                    </template>
                </el-table-column>
                <el-table-column prop="user.username" label="账户"/>
                <el-table-column prop="userInfo.nickname" label="昵称"/>
                <el-table-column label="公司名称" width="250">
                    <template scope="scope">
                        <el-tag type="info">{{scope.row.userInfo.company}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="账户余额" width="180">
                    <template scope="scope">
                        <el-tag type="danger" >{{scope.row.userInfo.money}} 元</el-tag>
                        <el-button type="info" icon="plus" size="small" @click="showMoneyDialog(scope.row.user.id)">充值</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="250">
                    <template scope="scope">
                        <el-button-group>
                            <el-button  icon="setting" size="small" @click="showPasswordDialog(scope.row.user.id)">重置密码</el-button>
                            <el-button type="danger" @click="deleteData(scope.row.user.id)" icon="delete" size="small">删除</el-button>
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

        <el-dialog title="账户充值" :visible.sync="dialogMoneyVisible">
            <el-form :model="moneyForm">
                <el-form-item label="充值金额">
                    <el-input-number v-model="moneyForm.money" style="width: 400px"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMoneyVisible = false">取 消</el-button>
                <el-button type="primary" @click="money()">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="重置密码" :visible.sync="dialogPasswordVisible">
            <el-form :model="passwordForm">
                <el-form-item label="新密码">
                    <el-input type="password" v-model="passwordForm.password" style="width: 400px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="password()">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import { CompanyList,CompanyMoney,deleteCompany,CompanyPassword } from '@/api/user/manager.js';
    import { parseTime } from '@/utils/time';

    export default {
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10
                },
                dialogMoneyVisible: false,
                moneyForm:{
                    id: '',
                    money: 0,
                },
                dialogPasswordVisible: false,
                passwordForm:{
                    id: '',
                    password: '',
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.listLoading = true;
                CompanyList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            showMoneyDialog(id){
                this.moneyForm.id = id;
                this.dialogMoneyVisible = true;
            },
            money(){
                this.dialogMoneyVisible = false;
                CompanyMoney(this.moneyForm.id,this.moneyForm).then(response => {
                    this.$message({
                        type: 'success',
                        message: '充值成功!'
                    });
                    this.fetchData();
                });
            },
            showPasswordDialog(id){
                this.passwordForm.id = id;
                this.dialogPasswordVisible = true;
            },
            password(){
                this.dialogPasswordVisible = false;
                CompanyPassword(this.passwordForm.id,this.passwordForm).then(response => {
                    this.$message({
                        type: 'success',
                        message: '重置成功!'
                    });
                    this.fetchData();
                });
            },
            deleteData(id) {
                this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCompany(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData();
                    });
                    this.fetchData();
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
            createData() {
                this.$router.push('/admin/home/company/add');
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
