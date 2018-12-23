<template>
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="primary" @click="createData()">添加车辆</el-button>
        </el-row>

        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-col :span="8">
                                <el-form-item label="车牌号">
                                    <span>{{ props.row.fleetCar.plate }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间">
                                    <span>{{ props.row.fleetCar.time | time }}</span>
                                </el-form-item>
                                <el-form-item label="车辆类型">
                                    <span>{{ props.row.fleetCar.type }}</span>
                                </el-form-item>
                                <el-form-item label="车辆所属">
                                    <span>{{ props.row.fleetCar.resource }}</span>
                                </el-form-item>
                                <el-form-item label="挂车车牌">
                                    <span>{{ props.row.fleetCar.two_plate }}</span>
                                </el-form-item>
                                <el-form-item label="随车电话">
                                    <span>{{ props.row.fleetCar.driver_phone }}</span>
                                </el-form-item>
                                <el-form-item label="随车司机">
                                    <span>{{ props.row.fleetCar.driver_name }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="能耗类型">
                                    <span>{{ props.row.fleetCar.energy }}</span>
                                </el-form-item>
                                <el-form-item label="车辆长度">
                                    <span>{{ props.row.fleetCar.length }}</span>
                                </el-form-item>
                                <el-form-item label="核定载重吨">
                                    <span>{{ props.row.fleetCar.weight }}</span>
                                </el-form-item>
                                <el-form-item label="汽车VIN码">
                                    <span>{{ props.row.fleetCar.vin }}</span>
                                </el-form-item>
                                <el-form-item label="车辆品牌">
                                    <span>{{ props.row.fleetCar.brand }}</span>
                                </el-form-item>
                                <el-form-item label="发动机号">
                                    <span>{{ props.row.fleetCar.engine }}</span>
                                </el-form-item>
                                <el-form-item label="车轴数">
                                    <span>{{ props.row.fleetCar.axle }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="轴距">
                                    <span>{{ props.row.fleetCar.wheelbase }}</span>
                                </el-form-item>
                                <el-form-item label="轮胎数量">
                                    <span>{{ props.row.fleetCar.tire }}</span>
                                </el-form-item>
                                <el-form-item label="出厂日期">
                                    <span>{{ props.row.fleetCar.factory_time | time}}</span>
                                </el-form-item>
                                <el-form-item label="购买日期">
                                    <span>{{ props.row.fleetCar.buy_time | time }}</span>
                                </el-form-item>
                                <el-form-item label="购买价格">
                                    <span>{{ props.row.fleetCar.buy_price }}</span>
                                </el-form-item>
                                <el-form-item label="年审日期">
                                    <span>{{ props.row.fleetCar.limited_time | time }}</span>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="fleetCar.plate" label="车牌号"/>
                <el-table-column prop="fleetCar.type" label="车辆类型"/>
                <el-table-column prop="fleetCar.brand" label="车辆品牌"/>
                <el-table-column
                    label="车辆所属">
                    <template scope="scope">
                        <el-tag type="primary" >{{scope.row.fleetCar.resource}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="添加时间">
                    <template scope="scope">
                        <p>{{scope.row.fleetCar.time | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="fleetCar.remark" label="备注"/>

                <el-table-column label="操作" width="180">
                    <template scope="scope">

                            <el-button-group>
                                <!--<el-button type="primary" icon="edit" size="small">编辑</el-button>-->
                                <el-button type="danger" @click="deleteData(scope.row.fleetCar.id)" icon="delete" size="small">删除</el-button>
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
    import { getCarListEx, deleteCar } from '@/api/car';
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
                getCarListEx(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            deleteData(id) {
                this.$confirm('此操作将删除该车辆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.list[index].orderCustomer.status;
                    deleteCar(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData();
                    });
                });
            },
            createData(){
                this.$router.push('/company/home/car/add');
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
