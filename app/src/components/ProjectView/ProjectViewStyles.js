import { Fill, ShapeNodeShape,  EdgeStyleDecorationInstaller,
  NodeStyleDecorationInstaller, ShapeNodeStyle, StyleDecorationZoomPolicy, 
  Insets, PolylineEdgeStyle } from 'yfiles';

//Colors:
export const buttonColorDefault = 'rgb(0, 102, 51)'
export const nodeColorDefault = Fill.DARK_KHAKI
export const nodeColorStyle1 = 'rgb(99,180,110)'
export const nodeColorStyle2 = 'rgb(156,76,76)'

//Default Style:
export const style = new ShapeNodeStyle({
  fill: nodeColorDefault,
  shape: ShapeNodeShape.ELLIPSE
})
//Style 1:
export const greenNodeStyle = new ShapeNodeStyle({
    shape: 'ellipse',
    fill: nodeColorStyle1,
    stroke: 'black'
  })
//Style 2:
export const redNodeStyle = new ShapeNodeStyle({
      shape: 'ellipse',
      fill: nodeColorStyle2,
      stroke: 'black'
})
//Decorating the selection of Nodes and Edges
export function decorateSelection(graphComponent) {
  const graphDecorator = graphComponent.graph.decorator
//Nodes:
  const selectionNodeStyle = new ShapeNodeStyle({ shape: 'ellipse', fill: 'none', stroke: '7px solid grey' })
  const nodeSelectionDecorator = new NodeStyleDecorationInstaller({
    nodeStyle: selectionNodeStyle,
    zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES,
    margins: Insets.EMPTY
  })
  graphDecorator.nodeDecorator.selectionDecorator.setImplementation(nodeSelectionDecorator)
//Edges:
  const selectionEdgeStyle = new PolylineEdgeStyle({ stroke: '5px solid grey' })
  const edgeSelectionDecorator = new EdgeStyleDecorationInstaller({ edgeStyle: selectionEdgeStyle })
  graphDecorator.edgeDecorator.selectionDecorator.setImplementation(edgeSelectionDecorator)
}