import { Fill, ShapeNodeShape,  EdgeStyleDecorationInstaller, 
  NodeStyleDecorationInstaller, ShapeNodeStyle, StyleDecorationZoomPolicy, 
  Insets, DefaultLabelStyle, LabelStyleDecorationInstaller, PolylineEdgeStyle } from 'yfiles';

//Default Style
export const style = new ShapeNodeStyle({
  fill: Fill.DARK_KHAKI,
  shape: ShapeNodeShape.ELLIPSE
})
//Style 1:
export const greenNodeStyle = new ShapeNodeStyle({
    shape: 'ellipse',
    fill: 'green',
    stroke: 'black'
  })
//Style 2:
export const redNodeStyle = new ShapeNodeStyle({
      shape: 'ellipse',
      fill: Fill.DARK_RED,
      stroke: 'black'
})
//Decorating the selection of Nodes and Edges
export function decorateSelection(graphComponent) {
  const graphDecorator = graphComponent.graph.decorator
  const selectionNodeStyle = new ShapeNodeStyle({ shape: 'ellipse', fill: Fill.DARK_GRAY })
  const nodeSelectionDecorator = new NodeStyleDecorationInstaller({
    nodeStyle: selectionNodeStyle,
    zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES,
    margins: Insets.EMPTY
  })
  graphDecorator.nodeDecorator.selectionDecorator.setImplementation(nodeSelectionDecorator)

  const selectionEdgeStyle = new PolylineEdgeStyle({ stroke: '5px solid grey' })
  const edgeSelectionDecorator = new EdgeStyleDecorationInstaller({ edgeStyle: selectionEdgeStyle })
  graphDecorator.edgeDecorator.selectionDecorator.setImplementation(edgeSelectionDecorator)

  const selectionLabelStyle = new DefaultLabelStyle({ textFill: 'black' })
  const labelSelectionDecorator = new LabelStyleDecorationInstaller({
    labelStyle: selectionLabelStyle,
    zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES,
    margins: Insets.EMPTY
  })
  graphDecorator.labelDecorator.selectionDecorator.setImplementation(labelSelectionDecorator)
}