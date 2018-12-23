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
            getBody1(order){
                var bodyarry = [];

                bodyarry.push([
                    {},
                    {text:order.orderCustomer.send_addr,style:'body'},
                    {},
                    {text:order.orderCustomer.recive_addr,style:'body'},
                    {}, {}, {}, {},
                ]);
                return bodyarry;
            },
            getBody2(order){
                var bodyarry = [];

                bodyarry.push([
                    {},
                    {text:order.orderCustomer.send_name,style:'body'},
                    {}, {}, {},
                    {text:order.orderCustomer.recive_name,style:'body'},
                    {}, {},
                ]);

                bodyarry.push([
                    {}, {}, {},
                    {text:order.orderCustomer.send_phone,style:'body'},
                    {}, {}, {},
                    {text:order.orderCustomer.recive_phone,style:'body'},
                ]);

                bodyarry.push([
                    {},
                    {text:order.orderCustomer.send_addr + ' ' + order.orderCustomer.send_addr_info, style:'body', colSpan: 3},
                    {}, {}, {},
                    {text:order.orderCustomer.recive_addr + ' ' + order.orderCustomer.recive_addr_info,style:'body', colSpan: 3},
                    {}, {},
                ]);

                return bodyarry;
            },
            getBody3(order){
                var bodyarry = [];

                var number = 0;
                var weight = 0;
                var mindex = 0;
                //货物列表
                bodyarry.push([
                    {},{text:' ', style:'body'},{}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                ]);
                order.orderGoods.forEach(function(value, index, array) {
                    if(index < 3)
                    {
                        bodyarry.push([
                            {},
                            {text:value.name,style:'body'},
                            {text:'',style:'body'},
                            {text:value.number,style:'body'},
                            {text:value.weight,style:'body'},
                            {text:value.size,style:'body'},
                            {text:'',style:'body'},
                            {text:value.freight,style:'body'},
                            {text:'',style:'body'},
                            {text:'',style:'body'},
                            {text:'',style:'body'},
                            {text:'',style:'body'}]);
                        number += value.number;
                        weight += value.weight;
                        mindex++;
                    }
                });
                for(var i=0;i<3-mindex;i++){
                    bodyarry.push([
                        {},{text:' ', style:'body'},{}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    ]);
                }
                //合计
                bodyarry.push([
                    {},
                    {text:'',style:'body'},
                    {text:'',style:'body'},
                    {text:number,style:'body'},
                    {text:weight,style:'body'},
                    {text:'',style:'body'},
                    {text:'',style:'body'},
                    {text:order.orderTaking.freight,style:'body'},
                    {text:'',style:'body'},
                    {text:'',style:'body'},
                    {text:order.orderTaking.safes,style:'body'},
                    {text:'',style:'body'}]);
                //回单
                bodyarry.push([
                    {},{text:' ', style:'body'},{}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                ]);
                //大写
                bodyarry.push([
                    {}, {}, {}, {}, {}, {}, {}, {},
                    {text:'. \t\t\t '+this.getWan(order.orderTaking.recive) +' \t\t\t' +this.getQian(order.orderTaking.recive)+ ' \t\t' +this.getBai(order.orderTaking.recive)+' \t\t' +this.getShi(order.orderTaking.recive)+' \t\t' +this.getYuan(order.orderTaking.recive),style:'body',colSpan: 4},
                    {},
                    {},
                    {},
                ]);

                //填开
                bodyarry.push([
                    {},{text:' ', style:'body'},{}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                ]);
                bodyarry.push([
                    {}, {}, {}, {}, {}, {}, {}, {},
                    {},
                    {text:order.orderCustomer.recive_name,style:'body'},
                    {},
                    {text:this.day(order.orderCustomer.recive_time),style:'body'},
                ]);
                return bodyarry;
            },
            pdfInit(order){
                this.pdfData = {
                    //pageSize:{ width: 300, height: 300 },
                    pageSize:'A4',
                    //pageOrientation: 'landscape',
                    //pageOrientation:'portrait',
                    pageMargins: [ 0, 0, 0, 0 ],
                    content: [
                        { text: '', margin: [0,65,0,0]},
                        {
                            table: {
                                heights: 25,
                                widths:[32,100,28,100,35,100,28,100],
                                body: this.getBody1(order)
                            },
                            layout: 'noBorders'
                        },
                        {
                            table: {
                                heights: 16,
                                widths:[32,100,28,100,35,100,28,100],
                                body: this.getBody2(order)
                            },
                            layout: 'noBorders'
                        },
                        {
                            table: {
                                heights: 18,
                                widths:[0,42,42,40,40,40,40,50,50,50,50,50,50],
                                body: this.getBody3(order)
                            },
                            layout: 'noBorders'
                        },
                        {
                            //width: 700,
                            //image:this.getImage(),
                        },
                    ],
                    styles: {
                        body: {
                            fontSize: 10,
                        }
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
            DX: function(n) {
                if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
                    return "数据非法";
                var unit = "千百拾亿千百拾万千百拾元角分", str = "";
                n += "00";
                var p = n.indexOf('.');
                if (p >= 0)
                    n = n.substring(0, p) + n.substr(p+1, 2);
                unit = unit.substr(unit.length - n.length);
                for (var i=0; i < n.length; i++)
                    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
                return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
            },
            getWan(n){
                n = n + '';
                if(n.length > 4)
                    return '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(n.length-5));
                return 'X';
            },
            getQian(n){
                n = n + '';
                if(n.length > 3)
                    return '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(n.length-4));
                return 'X';
            },
            getBai(n){
                n = n + '';
                if(n.length > 2)
                    return '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(n.length-3));
                return 'X';
            },
            getShi(n){
                n = n + '';
                if(n.length > 1)
                    return '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(n.length-2));
                return 'X';
            },
            getYuan(n){
                n = n + '';
                if(n.length > 0)
                    return '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(n.length-1));
                return 'X';
            }

        }
    }
</script>


