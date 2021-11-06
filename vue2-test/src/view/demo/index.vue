<template>
  <div class="container">
    <!-- 基本情况 -->
    <div class="mb-5">
      <div class="title">基本情况</div>
      <div class="basic">
        <el-row :gutter="20" align="middle" type="flex">
          <el-col :span="6">
              <img src="./img/map.jpg" alt />
          </el-col>
          <el-col :span="18" class="bg">
            <el-row :gutter="20" class="basic-bg">
              <el-col :span="6" :key="index" v-for="(item,index) in basicList">
                <div class="item">
                  <span style="color:#999">{{ item.title }}</span>
                  : {{ item.value }}
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 物业服务企业 & 业主委员会 -->
    <div class="mb-5">
      <el-row :gutter="20">
        <el-col :span="12" class="property">
          <div class="title">物业服务企业</div>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="mb-2">项目经理:{{ property.manager }}</div>
              <div class="mb-2">服务期:{{ property.date }}</div>
              <div class="mb-2">从业人员:{{ property.use }}</div>
            </el-col>
            <el-col :span="8">
              <div class="box">
                <div class="box-item-1">企业诚信</div>
                <div>
                  <h1 class="num">88</h1>
                  <span>分</span>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="box">
                <div class="box-item-2">项目经理诚信</div>
                <div>
                  <h1 class="num">99</h1>
                  <span>分</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <div class="title">业主委员会</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicList: [
        { title: "小区编号", value: 'xxx' },
        { title: "小区名称", value: 'xxx' },
        { title: "施工时间", value: "xxx" },
        { title: "街道", value: "xxx" },
        { title: "社区", value: "xxx" },
        { title: "总建筑面积", value: "xxx" },
        { title: "总户(户)", value: "xxx" },
        { title: "容积率", value: "xxx" },
        { title: "绿化率", value: "xxx" },
        { title: "开发建设单位", value: "xxx" },
        { title: "服务等级", value: "xxx" },
        { title: "业务等级", value: "xxx" },
        { title: "物业服务标准", value: "xxx" },
        { title: "机动车类型", value: "xxx" },
        { title: "其他车辆类型", value: "xxx" },

      ],
      // 物业服务企业
      property: {
        manager: "麻花藤",
        date: "2020.01.01-2020.03.01",
        use: "--"
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
  // 标题
  .title {
    vertical-align: middle;
    margin-bottom: 6px;
    padding-bottom: 6px;
    border-bottom: solid 1px #eee;
    &:before {
      vertical-align: middle;
      content: "";
      display: inline-block;
      width: 6px;
      height: 20px;
      margin-right: 3px;
      background: rgb(42, 148, 244);
    }
  }
  // 背景
  .bg {
    background: rgb(250, 250, 250);
    padding: 15px 0;
  }
  .mb-2 {
    margin-bottom: 5px;
  }
  .mb-5 {
    margin-bottom: 25px;
  }
  // 基本情况
  .basic {
    img {
      display: block;
      height: 200px;
      width: 100%;
    }

    .item {
      margin: 5px 0;
      font-size: 16px;
    }
  }

  .property {
    .box {
      text-align: center;
      border: solid 1px #eee;
      .num {
        display: inline-block;
        color: rgb(42, 148, 244);
      }
      .box-item-1::before {
        vertical-align: middle;
        content: "";
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("./img/icon_qycx@2x.png");
        background-size: cover;
      }
      .box-item-2::before {
        vertical-align: middle;
        content: "";
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url("./img/icon_xmjlcx@2x.png");
        background-size: cover;
      }
    }
  }
}
</style>