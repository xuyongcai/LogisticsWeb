<template>
    <div>
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
            contract_download(){
                pdfMake.createPdf(this.pdfData).download(this.order.orderContract.contract_number+".pdf");
            },
            contract_print(){
                pdfMake.createPdf(this.pdfData).print();
            },
            getGoods(order){
                var goods = '';
                order.orderGoods.forEach(function(value, index, array) {
                    goods += value.name + " ";
                });
                return goods;
            },
            pdfInit(order){
                this.pdfData = {
                    pageSize:{ width: 250, height: 300 },
                    pageMargins: [ 10, 0, 0, 0 ],
                    content: [
                        {
                            width: 130,
                            image:this.getImage(),
                            margin: [50, 15, 0, 15]
                        },
                        {
                            table: {
                                widths: [40, 40, 40, 70],
                                body: [
                                    [{text:'订单号',style:'table'}, {text:order.order.order_number,style:'number',colSpan: 3},{},{}],
                                    [{text:'收货人',style:'table'}, {text:order.orderCustomer.recive_name,style:'table'},{text:'电话',style:'table'},{text:order.orderCustomer.recive_phone,style:'table'}],
                                    [{text:'地址',style:'table'}, {text:order.orderCustomer.recive_addr + ' ' + order.orderCustomer.recive_addr_info,style:'address',colSpan: 3},{},{}],
                                    [{text:'发货人',style:'table'}, {text:order.orderCustomer.send_name,style:'table'},{text:'电话',style:'table'},{text:order.orderCustomer.send_phone,style:'table'}],
                                    [{text:'地址',style:'table'}, {text:order.orderCustomer.send_addr + ' ' + order.orderCustomer.send_addr_info,style:'address',colSpan: 3},{},{}],
                                    [{text:'货物名称',style:'table',colSpan: 2},{}, {text:this.getGoods(order),style:'table',colSpan: 2},{}],
                                ]
                            }
                        },
                    ],
                    styles: {

                        table: {
                            fontSize: 10,
                            alignment: 'center',
                            margin: [0, 5, 0, 5]
                        },
                        number: {
                            fontSize: 12,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 5, 0, 5]
                        },
                        address: {
                            fontSize: 10,
                            margin: [0, 5, 0, 5]
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
            },
            getImage(){
                return 'data:image/png;base64,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';
            }
        }
    }
</script>


