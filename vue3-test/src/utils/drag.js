import {
  addVector,
  diffVector,
  formatVector,
  setTranslatePosition,
} from "./utils";
const drag = (target, options) => {
  // 拖拽的元素
  target = document.querySelector(target);
  let { outerElement, innerElement, onDragStart, onDrag, onDragEnd } =
    options ?? {};
  // 元素的transform属性值，getComputedStyle返回值为matrix3d形式
  let startTransform = window.getComputedStyle(target).transform;
  // 拖拽开始时的鼠标位置
  let startPosition;
  // 拖拽结束时的鼠标位置
  let endPosition;
  // 拖拽位移向量范围
  let draggingMoveVectorRange;
  // 元素位移向量（拖拽后修改）
  let draggedMoveVector;
  // 元素位移向量（拖拽时修改）
  let draggingMoveVector;
  // 拖拽范围元素
  outerElement = outerElement ?? document.body;

  // 拖拽图标元素
  innerElement = innerElement ?? target;

  const onMouseDown = (e) => {
    e.stopPropagation();
    // 记录当前鼠标位置
    startPosition = [e.pageX, e.pageY];

    if (outerElement && target && innerElement) {
      // 记录拖拽位移向量范围
      const outerElementRect = outerElement.getBoundingClientRect();
      const elementRect = target.getBoundingClientRect();
      draggingMoveVectorRange = [
        outerElementRect.top - elementRect.top,
        outerElementRect.bottom - elementRect.bottom,
        outerElementRect.left - elementRect.left,
        outerElementRect.right - elementRect.right,
      ];
    }
    typeof onDragStart === "function" && onDragStart(draggedMoveVector);
  };
  const onMouseMove = (e) => {
    if (startPosition && draggingMoveVectorRange) {
      // 当前鼠标位置
      endPosition = [e.pageX, e.pageY];
      // 本次的拖拽位移向量
      const currentMoveVector = formatVector(
        diffVector(startPosition, endPosition),
        draggingMoveVectorRange
      );
      // 之前的拖拽位移向量+本次的拖拽位移向量
      draggingMoveVector = addVector(draggedMoveVector, currentMoveVector);
      target.style.transform = setTranslatePosition(
        startTransform,
        draggingMoveVector
      );
      typeof onDrag === "function" && onDrag(draggingMoveVector);
    }
  };
  const onMouseUp = () => {
    if (startPosition && draggingMoveVectorRange) {
      draggedMoveVector = draggingMoveVector;
      typeof onDragEnd === "function" && onDragEnd(draggedMoveVector);
    }
    startPosition = null;
  };
  const addEventListener = () => {
    if (innerElement) {
      innerElement.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };
  const removeEventListener = () => {
    if (innerElement) {
      innerElement.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  };
  addEventListener();
  return removeEventListener;
};
export default drag;
