import { POINT } from "../../../utils/tool-names";
import store from "../../../store/store";

export const point = {
  type: POINT,
  title: POINT,
  description: "Draw a point",
  drawable: false,
  actionable: true,
  icon: {
    isSVG: true,
    name: "point.svg"
  },
  /**
   * Create a point
   * @param {SVG.Container} canvas
   * @param {Event} event - mouse click event
   * @param {SVG.Shape} shape - SVG shape
   * @param {Number} featurePointSize - size of feature point
   * @param {String} featurePointColor - hexadecimal color string
   */
  create: function({
    canvas,
    event,
    shape,
    featurePointSize,
    featurePointColor
  }) {
    let canvasOffset = canvas.node.getBoundingClientRect();
    let point = drawPoint({
      position: event,
      shape,
      canvasOffset,
      featurePointSize,
      featurePointColor
    });
    return point;
  },
  validate: function() {
    return true;
  }
};

/**
 * Helper function to draw a featurePoint on canvas,
 * @param {Event} position - click position
 * @param {SVG.Shape} shape - shape that should hold the featurePoint
 * @param {DOMReact | Object} canvasOffset - offset of canvas
 * @param {Number} featurePointSize - size of feature point
 * @param {String} featurePointColor - hexadecimal color string
 * @returns {SVG.Circle} - featurePoint SVG
 */
export function drawPoint({
  position,
  shape,
  canvasOffset,
  featurePointSize,
  featurePointColor
}) {
  let index = store.getters["image-store/nextFeaturePointHash"](shape.id());
  let id = POINT + "#" + index;
  // Get shape location
  var containerOffset = {
    x: parseInt(shape.parent().attr("x"), 10) || 0,
    y: parseInt(shape.parent().attr("y"), 10) || 0
  };
  // Label shape as parent of point
  var point = shape
    .parent()
    .circle()
    .radius(featurePointSize)
    .id(id)
    .addClass("labelpoint")
    .attr({
      for: shape.node.id,
      cx: position.x - canvasOffset.x - containerOffset.x,
      cy: position.y - canvasOffset.y - containerOffset.y,
      fill: featurePointColor
    })
    .draggable();
  // Assign a new type to point
  point.type = POINT;
  return point;
}
