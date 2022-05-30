import { ISOMETRIC_RATE, ISOMETRIC_SCALE } from "../constants/dimension";

export const cartesianToIsometric = (cartPt) => {
  return {
    left: (cartPt.x - cartPt.y) * ISOMETRIC_SCALE,
    top: (cartPt.x + cartPt.y) * ISOMETRIC_SCALE * ISOMETRIC_RATE,
  };
};

export const isometricToCartesian = (isoPt) => {
  return {
    x: (isoPt.top + isoPt.left * ISOMETRIC_RATE) / ISOMETRIC_SCALE,
    y: (isoPt.top - isoPt.left * ISOMETRIC_RATE) / ISOMETRIC_SCALE,
  };
};
