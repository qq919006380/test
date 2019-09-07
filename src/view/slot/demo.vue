<template>
  <div class="container">
    <div class="btn-wrap">
      <cup :btnStatus="arrStatus"></cup>
    </div>
    <div>
      <Button @click="showAll">showAll</Button>
      <Button @click="edit">edit Status</Button>
    </div>
  </div>
</template>
<script>
import cup from "./slot.vue";
export default {
  data() {
    return {
      arrStatus: ["confirmReceiptAndShipment", "lastPaymentNotBeenReceived"]
    };
  },
  methods: {
    edit() {
      this.arrStatus = ["refundAndCloseTheOrder", "confirmReceipt"];
    },
    showAll() {
      this.arrStatus = [
        "closeOrder",
        "changeOrder",
        "confirmReceipt",
        "stocking",
        "returnedToTheOrder",
        "refundAndCloseTheOrder",
        "modifyOrderPrice",
        "examinationPassed",
        "auditNotPassed",
        "stockingCompletedDelivery",
        "pickUpPendingPayment",
        "shipment",
        "confirmReceiptAndShipment",
        "lastPaymentNotBeenReceived",
        "servedInstallation"
      ];
    }
  },
  components: {
    cup
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 10px;
}
.btn-wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>