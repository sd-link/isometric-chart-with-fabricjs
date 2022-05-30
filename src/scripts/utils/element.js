import { fabric } from "fabric";
import assets from "../constants/assets";
import { cartesianToIsometric } from "./coordinate";

const add = ({ kind, x, y }, canvas) => {
  const data = assets.find((asset) => asset.id === kind);
  if (data) {
    const group = [];
    fabric.loadSVGFromURL(
      `assets/${data.image}`,
      () => {
        const { origin, scale, size} = data;
        const obj = new fabric.Group(group);

        const pos = cartesianToIsometric({x, y});

        obj.set({
          left: pos.left - obj.width * origin.left / 2,
          top: pos.top - obj.height * origin.top / 2,
          hasControls: false,
          hasBorders: false,
          scaleX: scale,
          scaleY: scale,
          kind,
          origin,
          isObject: true,
        });

        const p0 = cartesianToIsometric({
          x: x + size.x / 2,
          y: y + size.y / 2,
        });
        const p1 = cartesianToIsometric({
          x: x + size.x / 2,
          y: y - size.y / 2,
        });
        const p2 = cartesianToIsometric({
          x: x - size.x / 2,
          y: y - size.y / 2,
        });
        const p3 = cartesianToIsometric({
          x: x - size.x / 2,
          y: y + size.y / 2,
        });

        const polygon = new fabric.Polygon([
          { x: p0.left, y: p0.top },
          { x: p1.left, y: p1.top },
          { x: p2.left, y: p2.top },
          { x: p3.left, y: p3.top },
          ], {
              stroke: 'black',
              fill: 'transparent',
              opacity: .2,
          });

        obj.addWithUpdate(polygon);

        canvas.add(obj);
        updateDepth(canvas);
        canvas.renderAll();
      },
      (item, object) => {
        object.set("id", item.getAttribute("id"));
        group.push(object);
      }
    );
  }
};

const updateDepth = (canvas) => {
  const objs = canvas.getObjects().filter(e => e.isObject);
  objs.forEach(obj => {
    const kind = obj.kind;
    const data = assets.find((asset) => asset.id === kind);
    if (data) {
      const depth = Math.floor(obj.height * data.origin.top + obj.top);
      obj.depth = depth;
    }
  });
  objs.forEach((obj) => {
    const underLayers = objs.filter(e => e.depth < obj.depth).length;
    obj.moveTo(underLayers);
  });
};

export default { add, updateDepth };
