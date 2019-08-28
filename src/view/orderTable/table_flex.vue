<!-- table 布局 -->
<style lang="less" scoped>

    * {
        padding: 0;
        margin: 0;
    }
    ul,
    li {
        list-style: none;
    }

    .table-demo {
        font-size: 14px;
        .col-group {
            col {
                /* 由于要整个页面垂直对齐，所以只能设置固定宽度 */
                &:nth-of-type(1) {
                    width: 10%;
                }
                &:nth-of-type(2) {
                    width: 30%;
                }
                &:nth-of-type(3) {
                    width: 15%;
                }
                &:nth-of-type(4) {
                    width: 15%;
                }
                &:nth-of-type(5) {
                    width: 15%;
                }
                &:nth-of-type(6) {
                    width: 15%;
                }
            }
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        .head {
            td {
                text-align: center;
            }
        }
        .list {
            margin: 30px 0 0;
            border: 1px solid #aaa;
            border-radius: 12px;
            overflow: hidden;
            table {
                tr {
                    text-align: center;
                    &.title {
                        text-align: left;
                        background: #00bcd4;
                        color: #fff;
                        border-bottom: 1px solid #eee;
                    }
                    &.shop-item {
                        border-bottom: 1px solid #eee;
                        text-align: left;
                        font-weight: 900;
                        .shop-name {
                            padding-top: 20px;
                        }
                    }

                    td {
                        padding: 0 6px;
                        line-height: 2em;
                        &.whole {
                            border: 1px solid #eee;
                            text-align: center;
                            font-weight: normal;
                        }
                    }
                }
            }
        }
    }

    .flex-demo {
        font-size: 14px;
        .order-item {
            margin: 30px 0 0;
            border: 1px solid #aaa;
            border-radius: 12px;
            overflow: hidden;
            .title {
                padding: 0 6px;
                font-size: inherit;
                background: #ff5722;
                color: #fff;
                line-height: 2em;
                font-weight: normal;
            }
            .content {
                display: flex;
                .shop-list {
                    flex: 0 0 55%;
                    .shop-item {
                        h5 {
                            line-height: 2em;
                            padding: 20px 6px 0;
                            border-bottom: 1px solid #eee;
                            font-size: inherit;
                        }
                        .prod-item {
                            display: flex;
                            text-align: center;
                            line-height: 2em;
                        }
                    }
                }
                .col1 {
                    flex: 0 0 10/55 * 100%;
                }
                .col2 {
                    flex: 0 0 30/55 * 100%;
                }
                .col3 {
                    flex: 0 0 15/55 * 100%;
                }
                .col4,
                .col5,
                .col6 {
                    flex: 0 0 15%;
                    border-left: 1px solid #eee;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
</style>
<template>
    <div class="wrap">
        <!-- 表格布局方式 -->
        <div class="table-demo">
            <!-- 总表头 -->
            <table class="head">
                <colgroup class="col-group"> <col /> <col /> <col /> <col /> <col /> <col /> </colgroup>
                <tr>
                    <td>名称</td>
                    <td>详情</td>
                    <td>价格</td>
                    <td>地址</td>
                    <td>总价</td>
                    <td>操作</td>
                </tr>
            </table>

            <!-- 内容 -->
            <div class="list" v-for="order in list">
                <table>
                    <colgroup class="col-group"> <col /> <col /> <col /> <col /> <col /> <col /> </colgroup>
                    <tr class="title">
                        <td colspan="6">订单 {{order.title}}</td>
                    </tr>
                    <template v-for="(shop,index) in order.shops">
                        <tr class="shop-item">
                            <td class="shop-name" colspan="3">店家 {{shop.name}}</td>
                            <td class="whole" :rowspan="order.len" v-if="index == 0">订单地址：xxxx省xxx市</td>
                            <td class="whole" :rowspan="order.len" v-if="index == 0">{{order.totalPrice}}</td>
                            <td class="whole" :rowspan="order.len" v-if="index == 0">
                                <a href="javascript:void(0)">修改</a>
                                <a href="javascript:void(0)">确定</a>
                            </td>
                        </tr>
                        <tr v-for="prod in  shop.products">
                            <td>{{prod.name}}</td>
                            <td>
                                <p>商品详情</p>
                            </td>
                            <td>{{prod.price}}</td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>

        <p>由于是宽度定死，所以可以使用flex布局模拟</p>

        <!-- flex布局方式 -->
        <div class="flex-demo">
            <div class="order-item" v-for="order in list">
                <h4 class="title">订单 {{order.title}}</h4>
                <!-- 每一行 -->
                <div class="content">
                    <div class="shop-list">
                        <div class="shop-item" v-for="shop in order.shops">
                            <h5>店家 {{shop.name}}</h5>
                            <div class="prod-item" v-for="prod in  shop.products">
                                <div class="col1">{{prod.name}}</div>
                                <div class="col2">
                                    <p>商品详情</p>
                                </div>
                                <div class="col3">{{prod.price}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col4">订单地址：xxxx省xxx市</div>
                    <div class="col5">{{order.totalPrice}}</div>
                    <div class="col6">
                        <a href="javascript:void(0)">修改</a>
                        <a href="javascript:void(0)">确定</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: new Array(4).fill().map((order, orderKey) => {
                    return {
                        title: orderKey + 1,
                        shops: new Array(ranInt(3, 1)).fill().map((shop, shopKey) => {
                            return {
                                name: orderKey + 1 + "-" + (shopKey + 1),
                                products: new Array(ranInt(6, 1)).fill().map((item, key) => {
                                    return {
                                        name: orderKey + 1 + "-" + (shopKey + 1) + "-" + (key + 1),
                                        price: ranInt(10000, 100)
                                    };
                                })
                            };
                        }),
                        totalPrice: ranInt(100000, 1000)
                    };
                })
            };
        },
        watch: {
            list: {
                handler(val) {
                    val.forEach(order => {
                        let len = 0;
                        order.shops.forEach(shop => {
                            len += shop.products.length + 1;
                        });
                        order.len = len;
                    });
                },
                immediate: true
            }
        }
    };

    function ranInt(max, min) {
        return parseInt(Math.random() * (max + 1 - min) + min);
    }
</script>