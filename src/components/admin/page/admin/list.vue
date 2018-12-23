<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>账户管理</el-breadcrumb-item>
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
                <el-table-column label="状态">
                    <template scope="scope">
                        <el-tag type="danger" v-if="scope.row.user.is_disable">封禁</el-tag>
                        <el-tag type="primary" v-if="!scope.row.user.is_disable">正常</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="注册时间">
                    <template scope="scope">
                        <p>{{scope.row.user.regtime | time}}</p>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="250">
                    <template scope="scope">

                            <el-button-group>
                                <el-button type="warning" icon="setting" size="small" @click="showPasswordDialog(scope.row.user.id)">重置密码</el-button>
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
    import { AdminList,deleteAdmin,AdminPassword } from '@/api/user';
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
                AdminList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            showPasswordDialog(id){
                this.passwordForm.id = id;
                this.dialogPasswordVisible = true;
            },
            password(){
                this.dialogPasswordVisible = false;
                AdminPassword(this.passwordForm.id,this.passwordForm).then(response => {
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
                    deleteAdmin(id).then(response => {
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
                this.$router.push('/admin/home/admin/add');
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
