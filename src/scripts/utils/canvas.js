import element from "./element";
// import { fabric } from "fabric";
// import { cartesianToIsometric } from "./coordinate";


const initCanvas = (canvas) => {
  canvas.on("mouse:wheel", mouseWheel(canvas));
  canvas.on("object:moving", objectMoving(canvas));

  // /* draw grid */
  // const group = new fabric.Group([]);
  // for (let x = 0; x < 50; x++) {
  //   const iso0 = cartesianToIsometric({x: 0, y: x});
  //   const iso1 = cartesianToIsometric({x: 10, y: x});

  //   console.log(iso0, iso1);
  //   const line0 = new fabric.Line([
  //     iso0.left,
  //     iso0.top,
  //     iso1.left,
  //     iso1.top,
  //   ], {
  //     left: 0,
  //     top: 0,
  //     stroke: "black",
  //   });
  //   group.addWithUpdate(line0);
  // }
  // canvas.add(group);
};

const objectMoving = (canvas) => () => {
  element.updateDepth(canvas);
};

const mouseWheel = (canvas) => (opt) => {
  const delta = opt.e.deltaY;
  let zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
  let vpt = canvas.viewportTransform;
  if (zoom < 400 / 1000) {
    vpt[4] = 200 - (1000 * zoom) / 2;
    vpt[5] = 200 - (1000 * zoom) / 2;
  } else {
    if (vpt[4] >= 0) {
      vpt[4] = 0;
    } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
      vpt[4] = canvas.getWidth() - 1000 * zoom;
    }
    if (vpt[5] >= 0) {
      vpt[5] = 0;
    } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
      vpt[5] = canvas.getHeight() - 1000 * zoom;
    }
  }
};

export default initCanvas;
