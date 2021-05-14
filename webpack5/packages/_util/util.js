import rough from "roughjs/bundled/rough.esm.js";

export class render {
  constructor(el) {
    this.host = el
    this.svg = el.querySelector("#svg")
    this.decoration = {
      stroke: "red",
      strokeWidth: 55,
      bowing: 2,
      fill: 'green',
      fillStyle: "",
      hachureAngle: "",
      hachureGap: "",
      fillWeight: "",
    }
    var elevation = 0
    this.s = this.host.getBoundingClientRect();
    this.elev = Math.min(Math.max(0, elevation), 5);
    this.watchDom(() => {
      this.r()
    })
  }
  /**
   * 监听元素的变化并执行回调函数
   * @param {Function} callback 回调函数
   */
  watchDom(callback) {
    const myObserver = new ResizeObserver(() => {
      callback();
    });
    myObserver.observe(this.host);
  }
  r() {
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
    let node = rc.rectangle(0.5, 0.5, this.s.width - 1, this.s.height - 1, this.decoration);
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
}


