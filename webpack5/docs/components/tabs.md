## 基础用法
<Tabs v-model="activeName">
<Tab title="a">我是内容</Tab>
<Tab title="b">ss</Tab>
<Tab title="c">是一个大而全，生态周边很完善的框架"></Tab>
</Tabs>

<script>
  export default {
  data() {
    return {
      activeName: "b"
    }
  }
}
</script>