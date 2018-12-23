<template>
    <div>
        <el-row style="margin-top: 15px">
            <el-button-group>
                <el-button type="primary" @click="padding(0)">上</el-button>
                <el-button type="primary" @click="padding(250)">中</el-button>
                <el-button type="primary" @click="padding(500)">下</el-button>
            </el-button-group>
        </el-row>
        <el-row v-loading.body="listLoading" element-loading-text="正在查询，请稍后...">
            <iframe id="pdf_frame" frameborder="0" width="100%" height="800" style="margin-top: 20px"></iframe>
        </el-row>
    </div>
</template>
<script>

    import { getOrder } from '@/api/order/order.js';
    import { parseTime } from '@/utils/time';

    import "pdfmake/build/pdfmake";
    import "pdfmake/build/vfs_fonts";

    export default {
        props:{
            order_id: {
                default: 0
            },
        },
        data() {
            return {
                order: null,
                pdfData : null,
                listLoading: false,
                paddingTop : 0
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
                    this.pdfInit(this.order);
                    this.listLoading = false;
                });
            },
            padding(size){
                this.paddingTop = size;
                this.pdfInit(this.order);
            },
            contract_download(){
                pdfMake.createPdf(this.pdfData).download(this.order.orderContract.contract_number+".pdf");
            },
            contract_print(){
                pdfMake.createPdf(this.pdfData).print();
            },
            getBody(order){
                var bodyarry = [];
                bodyarry.push([
                    {text:'序号',style:'table'},
                    {text:'装货地址',style:'table'},
                    {text:'收货地址',style:'table'},
                    {text:'收货人电话',style:'table'},
                    {text:'运单号',style:'table'},
                    {text:'货物名称',style:'table'},
                    {text:'件数',style:'table'},
                    {text:'重量',style:'table'},
                    {text:'体积',style:'table'},
                    {text:'车费成本',style:'table'},
                    {text:'代收货款',style:'table'},]);

                order.orderGoods.forEach(function(value, index, array) {
                    bodyarry.push([
                        {text:(index+1)+'、',style:'table'},
                        {text:'',style:'table'},
                        {text:order.orderCustomer.recive_addr + " " + order.orderCustomer.recive_addr_info,style:'table'},
                        {text:order.orderCustomer.recive_phone,style:'table'},
                        {text:order.order.order_number,style:'table'},
                        {text:value.name,style:'table'},
                        {text:value.number,style:'table'},
                        {text:value.weight,style:'table'},
                        {text:value.size,style:'table'},
                        {text:'',style:'table'},
                        {text:'',style:'table'}]);
                });
                bodyarry.push([{text: '派车人签字（盖章）：\t\t\t\t\t驾驶员签字（盖章）：\t\t\t\t\t装货点人签字（盖章)：\t\t\t\t\t收货人签字（盖章）：\t\t\t', colSpan: 11 ,style:'table'}]);
                bodyarry.push([{text:'\n承\n运\n须\n知\n',alignment: 'center',style:'table'},{
                    ol: [
                        '司机在装车时，必须由我司派车且派车人必须签字；',
                        '装卸货时必须清点数量，装卸完将派车单交货主签字确认；',
                        '货物运输过程中，如坏车、倒货，延误时效等一定要及时与派车负责人联系做好后续安排，如没有及时联系造成的损失由司机自行承担， 因交通事故或其他原因造成的货物损失由车主赔偿；',
                        '如有货到付款及代收货款，款项必须在24小时内交清；',
                        '车辆结算费用时必须出具我司派车单，并提交银行卡号信息，由财务会统一进行结算；',
                        '发生纠纷，双方应友好协商；如协商解决不了，则向当地人民法院诉讼解决；',
                    ], colSpan: 10, style:'table'}]);
                return bodyarry;
            },
            pdfInit(order){
                this.pdfData = {
                    pageSize:'A4',
                    //pageOrientation: 'landscape',
                    content: [
                        { text: '', margin: [0,this.paddingTop,0,0]},
                        { text: '派车单', style: 'title'},
                        { text: this.day(order.orderTaking.time)+'\t\t\t'+'NO:'+order.order.order_number, style: 'title2'},
                        {
                            table: {
                                body: this.getBody(order)
                            }
                        },
                    ],
                    styles: {
                        title: {
                            fontSize: 18,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 10, 0, 10]
                        },
                        title2: {
                            fontSize: 10,
                            alignment: 'center',
                            margin: [0, 0, 0, 5]
                        },
                        body: {
                            fontSize: 10,
                            margin: [0, 5, 0, 5]
                        },
                        table: {
                            fontSize: 8,
                            margin: [0, 5, 0, 5]
                        },
                        h1: {
                            fontSize: 12,
                            bold:true,
                            margin: [0, 10, 0, 10]
                        },
                    },
                    defaultStyle: {
                        font: 'fzlt'
                    }
                };

                pdfMake.fonts = {
                    fzlt: {
                        normal: 'fzlt.ttf',
                        bold: 'fzlt.ttf',
                        italics: 'fzlt.ttf',
                        bolditalics: 'fzlt.ttf',
                    }
                };
                const pdfDocGenerator = pdfMake.createPdf(this.pdfData);
                pdfDocGenerator.getDataUrl((dataUrl) => {
                    document.getElementById('pdf_frame').src = dataUrl;
                });
            },
            time: function (value) {
                return parseTime(value,"{y}年{m}月{d}日 {hh}:{mm}:{dd}");
            },
            day: function (value) {
                return parseTime(value,"{y}年{m}月{d}日");
            }
        }
    }
</script>


