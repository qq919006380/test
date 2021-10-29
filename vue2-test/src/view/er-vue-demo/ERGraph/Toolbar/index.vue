<template>
  <ul class="handler">
    <a-popover
      content="放大"
      placement="left"
    >
      <li @click="onZoomIn" class="item">
        <a-icon type="zoom-in" />
      </li>
    </a-popover>
    <a-popover
      content="缩小"
      placement="left"
    >
      <li @click="onZoomOut" class="item">
        <a-icon type="zoom-out" />
      </li>
    </a-popover>
    <a-popover
      content="实际尺寸"
      placement="left"
    >
      <li @click="onRealContent" class="item">
        <a-icon type="profile" />
      </li>
    </a-popover>
    <a-popover
      content="适应画布"
      placement="left"
    >
      <li @click="onFitContent" class="item">
        <a-icon type="slack" />
      </li>
    </a-popover>
    <a-popover
      content="查看源码"
      placement="left"
    >
      <li @click="onViewSource" class="item">
        <a-icon type="github" />
      </li>
    </a-popover>
    <a-popover
      content="设计指南"
      placement="left"
    >
      <li @click="() => {this.designShow = true}" class="item">
        <a-icon type="alibaba" />
      </li>
    </a-popover>
    <a-modal
      :visible="designShow"
      :footer="null"
      @cancel="() => {
        this.designShow = false
      }"
    >
      <div>
        <h3>ER 图</h3>
        <p>
          实体关系图也称ER模型（是指以实体、关系、属性三个基本概念概括数据的基本结构，从而描述静态数据结构的概念模型），
          全称为实体联系模型或实体关系模型，是概念数据模型的高层描述所使用的数据模型或模式图。
        </p>
        <h5>使用场景</h5>
        <p>
          一般在逻辑和物理数据库设计中使用，包括信息工程和空间建模。也可以用在两个或更多实体相互如何关联
        </p>

        <div>
          <ul>
            <li>
            <p strong>信息系统设计中：</p>
              在概念结构设计阶段用来描述信息需求或要存储在数据库中的信息类型，作为用户与分析员之间有效的交流工具。
            </li>
            <li>
              <p strong>描述感兴趣区域的任何本体：</p>
              对使用的术语和它们的联系的概述和分类，用实体、联系和属性这三个概念来理解现实问题。
            </li>
          </ul>
        </div>

        <div style="text-align: right">
          <p>设计师：源子</p><p>译：每天一点</p>
        </div>
      </div>
  </a-modal>
  </ul>
</template>

<script>
import './index.less'
export default {
  name: 'index',
  props: {
    onZoomIn: {
      type: Function,
      default: null,
      required: false
    },
    onZoomOut: {
      type: Function,
      default: null,
      required: false
    },
    onRealContent: {
      type: Function,
      default: null,
      required: false
    },
    onFitContent: {
      type: Function,
      default: null,
      required: false
    }
  },
  data () {
    return {
      designShow: true
    }
  },
  methods: {
    onViewSource () {
      window.open(
        'https://github.com/antvis/X6/tree/master/examples/x6-app-er',
        '_blank'
      )
    }
  }
}
</script>

<style scoped lang="less">
</style>
