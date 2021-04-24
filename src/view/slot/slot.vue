<style lang="less" scoped>
.btn {
  margin: 5px;
}
</style>
<template>
  <div>
    <div>
      <Button
        class="btn"
        type="primary"
        v-for="(dev,index) in btnItemTable"
        :key="index"
        v-if="btnStatus.includes(dev.status)"
        @click="dev.onEvent"
      >
        <slot :name="dev.status">{{dev.name}}</slot>
      </Button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    btnStatus: Array
  },
  data() {
    return {
      btnItemTable: [
        { status: "closeOrder", name: "关闭订单", onEvent: this.on },
        { status: "changeOrder", name: "修改订单", onEvent: this.on },
        { status: "confirmReceipt", name: "确认到账", onEvent: this.on },
        { status: "stocking", name: "备货中", onEvent: this.on },
        {
          status: "returnedToTheOrder",
          name: "未到账，返回订单",
          onEvent: this.on
        },
        {
          status: "refundAndCloseTheOrder",
          name: "退款并关闭订单",
          onEvent: this.on
        },
        { status: "modifyOrderPrice", name: "修改订单价格", onEvent: this.on },
        { status: "examinationPassed", name: "审核通过", onEvent: this.on },
        { status: "auditNotPassed", name: "审核不通过", onEvent: this.on },
        {
          status: "stockingCompletedDelivery",
          name: "备货完成，发货",
          onEvent: this.on
        },
        {
          status: "pickUpPendingPayment",
          name: "提货，待收尾款",
          onEvent: this.on
        },
        { status: "shipment", name: "出货", onEvent: this.on },
        {
          status: "confirmReceiptAndShipment",
          name: "确认到账并出货",
          onEvent: this.on
        },
        {
          status: "lastPaymentNotBeenReceived",
          name: "尾款未到账",
          onEvent: this.on
        },
        { status: "servedInstallation", name: "已送达安装", onEvent: this.on }
      ]
    };
  },
  methods: {
    on() {
      console.log("xxx");
    }
  }
};
</script>