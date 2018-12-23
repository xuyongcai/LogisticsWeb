<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在查询，请稍后...">
        <iframe id="pdf_frame" frameborder="0" width="100%" height="800" style="margin-top: 20px"></iframe>
    </el-row>
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
            getBody(order){
                var bodyarry = [];
                bodyarry.push(['运单号', order.order.order_number ,'下单时间',this.day(order.orderCustomer.time)]);
                bodyarry.push(['发货人', order.orderCustomer.send_name, '联系方式', order.orderCustomer.send_phone]);
                bodyarry.push(['发货地址', {colSpan: 3, text: order.orderCustomer.send_addr + " " + order.orderCustomer.send_addr_info}]);
                bodyarry.push(['收货人', order.orderCustomer.recive_name, '联系方式', order.orderCustomer.recive_phone]);
                bodyarry.push(['收货地址', {colSpan: 3, text: order.orderCustomer.recive_addr + " " + order.orderCustomer.recive_addr_info}]);
                bodyarry.push(['承运司机', order.fleetDriver.name, '联系方式', order.fleetDriver.phone]);
                bodyarry.push(['承运车辆', order.fleetCar.plate, '车型', order.fleetCar.type]);
                bodyarry.push(['承运日期',  {colSpan: 3, text: this.day(order.orderCustomer.send_time)}]);
                bodyarry.push(['到货日期',  {colSpan: 3, text: this.day(order.orderCustomer.recive_time)}]);
                bodyarry.push([{colSpan: 4, text: '货物信息'}]);
                bodyarry.push(['名称', '重量', '数量', '运费']);
                if(order.orderGoods == null || order.orderGoods.length == 0)
                    bodyarry.push([{colSpan: 4, text: "无"}]);
                else{
                    order.orderGoods.forEach(function(value, index, array) {
                        bodyarry.push([value.name,value.weight,value.number,value.freight]);
                    });
                }
                return bodyarry;
            },
            pdfInit(order){
                this.pdfData = {
                    pageSize:'A4',
                    content: [
                        { text: '货物运输合同', style: 'title'},
                        { text: '合同编号：' + order.orderContract.contract_number, style: 'body'},
                        { text: '甲方（托运方）：' + order.orderContract.aname, style: 'body'},
                        { text: '乙方（承运方）：' + order.orderContract.bname, style: 'body'},
                        { text: '根据 的有关规定，现甲乙双方本着自愿、平等和公平的原则，经友好协商，订立本协议，以共同遵守 《中华人民共和国合同法》', style: 'body'},

                        { text: '第一条、托运货物信息及承运车辆', style: 'h1'},
                        {
                            table: {
                                widths: [100, '*', 100, '*'],
                                body: this.getBody(order)
                            }
                        },
                        { text: '第二条、 运费及结算', style: 'h1'},
                        {
                            table: {
                                widths: [100, '*'],
                                body: [
                                    ['保险', order.orderTaking.safes + ' 元'],
                                    ['运费', order.orderTaking.freight + ' 元'],
                                    ['合计金额', order.orderTaking.recive + ' 元']
                                ]
                            }
                        },
                        { text: '1、运输总运费及结算方式', style: 'body'},
                        { text: '2、结算凭证：乙方在送达货物后，取得合格的回单作为结算凭证，甲方收到合格回单后，及时完成回单确认，并按时支付乙方运费。', style: 'body'},
                        { text: '3、乙方收款信息：', style: 'body'},
                        {
                            table: {
                                widths: [100, '*'],
                                body: [
                                    ['户名', order.orderContract.bbank_name],
                                    ['账号', order.orderContract.bbank_number],
                                    ['开户行', order.orderContract.bbank],
                                ]
                            }
                        },
                        { text: '第三条、 甲方权利、责任和义务', style: 'h1'},
                        { text: '1、甲方委托乙方运输的货物为一般普通货物，即非超长、超宽、超高或危险品等，且不得夹带国家禁止和限制运输、税务发票、海关通关等手续不全的货物，因此造成的所有损失由甲方承担。', style: 'body'},
                        { text: '2、因甲方未能予以合格且充分的包装而导致货物在运输中受损的，该损失由甲方自行承担。', style: 'body'},
                        { text: '3、甲方提供详细的货物信息和装卸货地址，并要求乙方按照通知的时间、地点将货物运输至目的地，因信息错误造成乙方的所有损失由甲方承担。', style: 'body'},
                        { text: '4、货物托运后，甲方需要变更到货地点或收货人，或者取消托运时，有权向乙方提出变更或取消的要求。但必须在货物未运到目的地之前通知乙方，并按照相关约定承担乙方所需费用。', style: 'body'},
                        { text: '5、甲方在收到结算凭证后，按照约定按时足额支付运费，超期未支付按照每天万分之五支付违约金。', style: 'body'},
                        { text: '6、甲方应对托运货物购买保险或者在下达给乙方的运单中注明由乙方购买保险，甲方下达给乙方的运单中未注明由乙方购买保险，乙方协助收集承运中的保险理赔材料；甲方下达给乙方的运单中注明由乙方购买保险的，乙方按照保险赔付额现行赔付甲方。', style: 'body'},

                        { text: '第四条、 乙方权利、责任和义务', style: 'h1'},
                        { text: '1、从接受货物时起至交付货物时止，乙方对所承运货物因乙方责任造成的灭失和损坏负赔偿责任（保险理赔见第三条第6条条款）。', style: 'body'},
                        { text: '2、乙方接收到甲方下达的运单后，按照运单需求提供符合要求的车辆承运，车况较好、车厢整洁无异味，因车辆不合格造成无法装车，由乙方承担责任。', style: 'body'},
                        { text: '3、乙方必须按照甲方提供的卸货地址按时送货，在未征得甲方同意不得随意更改卸货地，因此造成无法按时移交货物，由乙方承担责任。', style: 'body'},
                        { text: '4、乙方须仔细核对承运货物的数量及包装情况，甲方所发货物按照发货清单即回单为准，如有异议及时与甲方核对，并进行调整和更换。', style: 'body'},
                        { text: '5、货物在途如有异常情况，乙方须第一时间通知甲方，并按照甲方要求进行操作和处理。', style: 'body'},
                        { text: '6、乙方在车辆签收完好回单后，将回单上传至乙方系统，以供甲方核对和确认，乙方按照要求及时移交纸质回单。因回单移交延迟造成乙方不能按时结算运费，由乙方承担责任。', style: 'body'},
                        { text: '7、甲方支付乙方运费中包含路桥费、燃油费等一切费用，乙方收到运费后按照甲方要求开具增值税专用发票。', style: 'body'},
                        { text: '8、乙方不对承运货物检验，对原包装未破损或乙方有合理理由的情况下，出现货物短少、损毁的，乙方不承担责任。', style: 'body'},
                        { text: '9、在符合法律和合同约定的条件下运输,由于下列原因造成货物灭失、短少、变质、污染、损坏或交货延迟的，乙方不承担违约赔偿责任：', style: 'body'},
                        { text: '9.1 因国家政策、自然灾害等不可抗力因素引起的违约。', style: 'body'},
                        { text: '9.2 货物本身的自然属性。', style: 'body'},
                        { text: '9.3 货物的合理损耗。', style: 'body'},
                        { text: '9.4 托运方或收货方本身的过错。', style: 'body'},
                        { text: '10、乙方必须为甲方保守商业秘密，不得泄露甲方的客户资料。', style: 'body'},
                        { text: '第五条、 纠纷及其仲裁', style: 'h1'},
                        { text: '若在合同履行中产生纠纷，双方应协商解决。协商无效，任何一方均可向芜湖仲裁委员会提起仲裁。', style: 'body'},
                        { text: '本合同为甲乙双方在线完成确认后签订，自确认时开始至运费支付后结束。', style: 'body'},
                        { text: '', style: 'body'},
                        { text: '甲方（托运方）： '+ order.orderContract.aname, style: 'body'},
                        { text: '签署日期：'+ this.day(order.orderContract.time), style: 'body'},
                        { text: '乙方（承运方）： '+ order.orderContract.bname, style: 'body'},
                        { text: '签署日期：'+ this.day(order.orderContract.time), style: 'body'},
                    ],
                    styles: {
                        title: {
                            fontSize: 16,
                            bold: true,
                            alignment: 'center',
                            margin: [0, 10, 0, 30]
                        },
                        body: {
                            fontSize: 11,
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


