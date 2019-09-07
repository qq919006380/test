var table=[
    {status:"closeOrder",name:"关闭订单",onEvent:"on"},
    {status:"changeOrder",name:"修改订单",onEvent:"on"},
    {status:"confirmReceipt",name:"确认到账",onEvent:"on"},
    {status:"stocking",name:"备货中",onEvent:"on"},
    {status:"returnedToTheOrder",name:"未到账，返回订单",onEvent:"on"},
    {status:"refundAndCloseTheOrder",name:"退款并关闭订单",onEvent:"on"},
    {status:"modifyOrderPrice",name:"修改订单价格",onEvent:"on"},
    {status:"examinationPassed",name:"审核通过",onEvent:"on"},
    {status:"auditNotPassed",name:"审核不通过",onEvent:"on"},
    {status:"stockingCompletedDelivery",name:"备货完成，发货",onEvent:"on"},
    {status:"pickUpPendingPayment",name:"提货，待收尾款",onEvent:"on"},
    {status:"shipment",name:"出货",onEvent:"on"},
    {status:"confirmReceiptAndShipment",name:"确认到账并出货",onEvent:"on"},
    {status:"lastPaymentNotBeenReceived",name:"尾款未到账",onEvent:"on"},
    {status:"servedInstallation",name:"已送达安装",onEvent:"on"},
]
<!-- <div>
      <Button v-if="btnStatus.includes('closeOrder')">
        <slot name="closeOrder">关闭订单</slot>
      </Button>
      <Button v-if="btnStatus.includes('changeOrder')">
        <slot name="changeOrder">修改订单</slot>
      </Button>
      <Button v-if="btnStatus.includes('confirmReceipt')">
        <slot name="confirmReceipt">确认到账</slot>
      </Button>
      <Button v-if="btnStatus.includes('stocking')">
        <slot name="stocking">备货中</slot>
      </Button>
      <Button v-if="btnStatus.includes('returnedToTheOrder')">
        <slot name="returnedToTheOrder">未到账，返回订单</slot>
      </Button>
      <Button v-if="btnStatus.includes('refundAndCloseTheOrder')">
        <slot name="refundAndCloseTheOrder">退款并关闭订单</slot>
      </Button>
      <Button v-if="btnStatus.includes('modifyOrderPrice')">
        <slot name="modifyOrderPrice">修改订单价格</slot>
      </Button>
      <Button v-if="btnStatus.includes('examinationPassed')">
        <slot name="examinationPassed">审核通过</slot>
      </Button>
      <Button v-if="btnStatus.includes('auditNotPassed')">
        <slot name="auditNotPassed">审核不通过</slot>
      </Button>
      <Button v-if="btnStatus.includes('stockingCompletedDelivery')">
        <slot name="stockingCompletedDelivery">备货完成，发货</slot>
      </Button>
      <Button v-if="btnStatus.includes('pickUpPendingPayment')">
        <slot name="pickUpPendingPayment">可提货，待收尾款</slot>
      </Button>
      <Button v-if="btnStatus.includes('shipment')">
        <slot name="shipment">出货</slot>
      </Button>
      <Button v-if="btnStatus.includes('confirmReceiptAndShipment')">
        <slot name="confirmReceiptAndShipment">确认到账并出货</slot>
      </Button>
      <Button v-if="btnStatus.includes('lastPaymentNotBeenReceived')">
        <slot name="lastPaymentNotBeenReceived">尾款未到账</slot>
      </Button>
      <Button v-if="btnStatus.includes('servedInstallation')">
        <slot name="servedInstallation">已送达安装</slot>
      </Button>
    </div>-->