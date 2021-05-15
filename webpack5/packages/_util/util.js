import rough from "roughjs/bundled/rough.esm.js";

export class render {
  constructor(el) {
    this.host = el
    this.svg = el.querySelector("#svg")
    this.s
    this.decoration = {}
    var elevation = 0
    this.elev = Math.min(Math.max(0, elevation), 5);
    this.setDecoration()
    this.watchDom(el, () => {
      this.r()
    })

  }
  /**
   * 监听元素的变化并执行回调函数
   * @param {Function} callback 回调函数
   */
  watchDom(dom, callback) {
    const myObserver = new ResizeObserver(() => {
      callback();
    });
    myObserver.observe(dom);
  }
  r() {
    this.s = this.host.getBoundingClientRect();
    this.clearNode()
    this.svg.setAttribute("width", this.s.width + this.elev * 2);
    this.svg.setAttribute("height", this.s.height + this.elev * 2);
    this.rough()
  }
  clearNode() {
    while (this.svg.hasChildNodes()) {
      this.svg.removeChild(this.svg.lastChild);
    }
  }

  rough() {
    const rc = rough.svg(this.svg);
    let node = rc.rectangle(0.5, 0.5, this.s.width - 1, this.s.height - 1,
      this.decoration
    );
    node.style.opacity = 0.8;
    this.svg.appendChild(node);
    this.elevation()

  }
  elevation() {
    for (var i = 0; i <= this.elev; i++) {
      if (this.elev === 0) return;
      var elevation = rc.linearPath(
        [
          [s.width + i * 2, 0 + i * 2],
          [s.width + i * 2, s.height + i * 2],
          [s.width + i * 2, s.height + i * 2],
          [0 + i * 2, s.height + i * 2]
        ],
        {
          bowing: 2, //弯曲
          stroke: this.decoration.stroke
        }
      );
      elevation.style.opacity = 1 - i * 0.12;
      this.svg.appendChild(elevation);
    }
  }
  setDecoration(obj) {
    this.decoration=obj
    //fillStyle:
    //hachure 平行线，它可以使用fillWeight、hachureAngle和hachureGap属性进一步配置。
    //solid  传统的填充。
    //zigzag 之字形 绘制之字形线条填充形状
    //cross-hatch 与hachure相似，但绘制交叉的hatch线（类似于两个相互成90度的hachure填充）。
    //dots 圆点 用素描的圆点填充形状。
    //dashed 虚线 与hachure类似，但个别线条是虚线。虚线可以用dashOffset和dashGap属性来配置。
    //zigzag-line  与 hachure 类似，但个别线条是以 zig-zag 的方式绘制。之字形的大小可以使用 zigzagOffset 属性来配置 
   
    this.decoration = Object.assign({
      fillWeight: 1.3,//填充的粗细
      hachureAngle: -60, // 填充的角度,
      hachureGap: 8,
      fillStyle: "hachure",//填充样式
      stroke: "#333",//线的颜色
      strokeWidth: 1,//线的粗细
      bowing: 4,//线条扭曲程度
      roughness: 1,//线条凌乱程度
    }, obj)

  }
}




