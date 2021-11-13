export const ports = {
  groups: {
    in: {
      position: { name: "absolute" },
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#2D8CF0",
          strokeWidth: 1,
          fill: "#fff",
        },
      },
    },
    out: {
      position: { name: "absolute" },
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#2D8CF0",
          strokeWidth: 1,
          fill: "#fff",
        },
      },
    },
  },
};

// 根据字段长度返回对应的宽度
export function getFieldKey(fieldTable) {
  let obj = {
    cname: 0,
    ename: 0,
  };
  let totalWidth = 0;
  for (var k in obj) {
    let w = Math.max(
      ...fieldTable.map((item) => {
        if (k == "cname") {
          let text = item[k] || "";
          return getTextWidth(text.slice(0, 6));
        }
        return getTextWidth(item[k]);
      })
    );
    obj[k] = w;
    totalWidth = totalWidth + w;
  }
  obj.totalWidth = totalWidth;
  return obj;
}
/**
 * 根据字符串长度计算出元素的px像素宽度
 */
function getTextWidth(str, fontSize = 12) {
  let result;
  let ele = document.createElement("span");
  ele.innerText = str;
  ele.style.fontSize = fontSize + "px";
  document.documentElement.append(ele);
  result = ele.offsetWidth;
  document.documentElement.removeChild(ele);
  return result + 2;
}

export function randomNum(num) {
  return Math.floor(Math.random() * num);
}
