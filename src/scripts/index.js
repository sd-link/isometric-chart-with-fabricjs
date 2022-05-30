import "../styles/index.scss";
import { fabric } from "fabric";
import initCanvas from "./utils/canvas";
import element from "./utils/element";

const canvas = new fabric.Canvas("isocanvas", {
    controlsAboveOverlay: false,
    preserveObjectStacking: true,
    selection: false,
});
initCanvas(canvas);
element.add({ kind: "rds", x: 13, y: -1 }, canvas);
element.add({ kind: "cloudfront", x: 14, y: -3 }, canvas);
element.add({ kind: "gateway", x: 14, y: -5 }, canvas);
