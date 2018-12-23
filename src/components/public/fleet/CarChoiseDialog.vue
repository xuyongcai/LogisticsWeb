<template>
    <el-row>
        <el-dialog title="选择车辆" :visible.sync="visible">
                <el-row style="margin-top: 10px">
                    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                              highlight-current-row style="width: 100%">

                        <el-table-column label="编号" type="index" fixed/>
                        <el-table-column prop="fleetCar.plate" label="车牌号"  width="120"/>
                        <el-table-column prop="fleetCar.type" label="车辆类型"  width="120"/>
                        <el-table-column prop="fleetCar.brand" label="车辆品牌"  width="120"/>
                        <el-table-column
                            label="车辆所属"  width="120">
                            <template scope="scope">
                                <el-tag type="primary">{{scope.row.fleetCar.resource}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="添加时间"  width="120">
                            <template scope="scope">
                                <p>{{scope.row.fleetCar.time | time}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fleetCar.remark" label="备注"  width="120"/>

                        <el-table-column label="操作" fixed="right" width="100">
                            <template scope="scope">
                                <el-button type="primary" icon="plus" size="small"
                                           @click="onselect(scope.$index,scope.row)">选择
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <el-row type="flex" justify="space-around" style="margin-top: 30px">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10]"
                        :page-size="listQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    import { getCarListEx } from '@/api/car';
    import { parseTime } from '@/utils/time';

    export default {
        props:{
            mtoken: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                visible: false,
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10,
                    token:this.mtoken,
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            onselect(index,row){
                this.visible = false;
                this.$emit('onselect',row);
            },
            show(){
                this.visible = true;
            },
            fetchData() {
                this.listLoading = true;
                getCarListEx(this.listQuery).then(response => {
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
