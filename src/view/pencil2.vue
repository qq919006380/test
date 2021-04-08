<template>
  <div>
    <div>
      <canvas class="canvas" ref="canvas" width="500" height="500"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.draw();
  },
  methods: {
    draw() {
      this.line(
        Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 500)
      );
    },
    _line(x1, y1, x2, y2) {
      let result = [];
      // 起始点
      result[0] = x1 + this.random(-this.offset, this.offset);
      result[1] = y1 + this.random(-this.offset, this.offset);
      // 终点
      result[2] = x2 + this.random(-this.offset, this.offset);
      result[3] = y2 + this.random(-this.offset, this.offset);

      // 两个控制点
      let c1 = this.getNearRandomPoint(x1, y1, x2, y2);
      let c2 = this.getNearRandomPoint(x1, y1, x2, y2);
      result[4] = c1[0];
      result[5] = c1[1];
      result[6] = c2[0];
      result[7] = c2[1];
      return result;
    },
    getNearRandomPoint(x1, y1, x2, y2) {
      let xo, yo, rx, ry;
      // 垂直x轴的线段特殊处理
      if (x1 === x2) {
        yo = y2 - y1;
        rx = x1 + this.random(-2, 2);
        ry = y1 + yo * this.random(0, 1);
        return [rx, ry];
      }
      xo = x2 - x1;
      rx = x1 + xo * this.random(0, 1);
      ry = ((rx - x1) * (y2 - y1)) / (x2 - x1) + y1;
      ry += this.random(-2, 2);
      return [rx, ry];
    },
    random(min, max) {
      return Math.random() * (max - min) + min;
    },
    // 绘制手绘线段
    line(x1, y1, x2, y2) {
      this.drawDoubleLine(x1, y1, x2, y2);
    },

    // 绘制两条曲线
    drawDoubleLine(x1, y1, x2, y2) {
      // 绘制生成的两条曲线
      let line1 = this._line(x1, y1, x2, y2);
      let line2 = this._line(x1, y1, x2, y2);
      this.drawLine(line1);
      this.drawLine(line2);
    },

    // 绘制单条曲线
    drawLine(line) {
      this.ctx.beginPath();
      this.ctx.moveTo(line[0], line[1]);
      // bezierCurveTo方法前两个点为控制点，第三个点为结束点
      this.ctx.bezierCurveTo(
        line[4],
        line[5],
        line[6],
        line[7],
        line[2],
        line[3]
      );
      this.ctx.strokeStyle = "#000";
      this.ctx.stroke();
    },
  },
};
</script>

<style>
.canvas {
  width: auto;
  height: auto;
  border: 1px solid #999;
}
</style>