import rough from "roughjs/bundled/rough.esm.js";


export function render(el) {
  const host = el;
  const svg = el.querySelector("#svg");
  let decoration = {}
  let elevation2 = 0

  function clearNode(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }

  clearNode(svg)
  const s = host.getBoundingClientRect();
  const elev = Math.min(Math.max(0, elevation2), 5);
  svg.setAttribute("width", s.width + elev * 2);
  svg.setAttribute("height", s.height + elev * 2);
  const rc = rough.svg(svg);
  let node = rc.rectangle(0.5, 0.5, s.width - 1, s.height - 1, {
    stroke: decoration.stroke,
    fill: decoration.fill,
    fillStyle: decoration.fillStyle,
    hachureAngle: decoration.hachureAngle,
    hachureGap: decoration.hachureGap,
    fillWeight: decoration.fillWeight,
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
        stroke: decoration.stroke
      }
    );
    elevation.style.opacity = 1 - i * 0.12;
    svg.appendChild(elevation);
  }
}

//   监控DOM元素，第一个参数为监控的DOM对象，第二个是回调函数。
export function watchDom(host, callback) {
  const myObserver = new ResizeObserver(entries => {
    callback();
  });
  myObserver.observe(host);
}