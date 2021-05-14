export function a() {

}

export function render() {
  const host = this.$el;
  const svg = this.$el.querySelector("#svg");
  tool.clearNode(svg)
  const s = host.getBoundingClientRect();
  const elev = Math.min(Math.max(0, this.elevation), 5);
  svg.setAttribute("width", s.width + elev * 2);
  svg.setAttribute("height", s.height + elev * 2);
  const rc = rough.svg(svg);
  let node = rc.rectangle(0.5, 0.5, s.width - 1, s.height - 1, {
    stroke: this.decoration.stroke,
    fill: this.decoration.fill,
    fillStyle: this.decoration.fillStyle,
    hachureAngle: this.decoration.hachureAngle,
    hachureGap: this.decoration.hachureGap,
    fillWeight: this.decoration.fillWeight,
    bowing: 2
  });
  node.style.opacity = 0.8;
  svg.appendChild(node);
  // elevation
  for (var i = 0; i <= elev; i++) {
    if (elev === 0) return;
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
    svg.appendChild(elevation);
  }
}
export function clearNode(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}
//   监控DOM元素，第一个参数为监控的DOM对象，第二个是回调函数。
export function watchDom(host, callback) {
  const myObserver = new ResizeObserver(entries => {
    callback();
  });
  myObserver.observe(host);
}