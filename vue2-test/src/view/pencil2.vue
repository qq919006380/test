<template>
  <div>
    <el-table
      style="width: 90%"
      :data="tableData"
      class="width-test"
      size="mini"
      :show-header="false"
    >
      <el-table-column class-name="asd" prop="date" label="日期" min-width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" min-width="50"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="50"></el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {
    console.log(this.getMaxLength(this.tableData))
  },
  methods:{
    getMaxLength(arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          const str = item.toString()
          const char = str.match(/[\u2E80-\u9FFF]/g)
          const charLen = char ? char.length : 0
          const num = str.match(/\d|\./g)
          const numLen = num ? num.length : 0
          const otherLen = str.length - charLength - numLength
          let calcLen = charLen * 1.1 + numLen * 0.65 + otherLen * 0.5

          if (acc < calcLen) {
            acc = calcLen
          }
        }
        return acc
      }, 0)
    }
  }

}
</script>
<style>
.width-test {
  display: inline-block;
}
.asd {
}
</style>