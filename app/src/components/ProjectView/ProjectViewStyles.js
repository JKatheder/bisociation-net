import { 
  Fill, 
  ShapeNodeShape, 
  EdgeStyleDecorationInstaller, 
  Size,
  IArrow,
  NodeStyleDecorationInstaller,
  ShapeNodeStyle, 
  StyleDecorationZoomPolicy, 
  Insets, 
  PolylineEdgeStyle } from 'yfiles';

//Colors:
export const buttonColorDefault = 'rgb(0, 102, 51)'
export const edgeColorDefault = buttonColorDefault
export const nodeColorDefault = Fill.DARK_KHAKI
export const nodeColorStyle1 = 'rgb(99,180,110)'
export const nodeColorStyle2 = 'rgb(156,76,76)'

//Default NodeStyle:
export const style = new ShapeNodeStyle({
  fill: nodeColorDefault,
  shape: ShapeNodeShape.ELLIPSE,
  stroke: edgeColorDefault
})

//Style 1:
export const greenNodeStyle = new ShapeNodeStyle({
    shape: 'ellipse',
    fill: nodeColorStyle1,
    stroke: edgeColorDefault
  })

//Style 2:
export const redNodeStyle = new ShapeNodeStyle({
      shape: 'ellipse',
      fill: nodeColorStyle2,
      stroke: edgeColorDefault
})

//Initialize DefaultStyle eg Nodesize, Edgecolor etc
export function initializeDefaultStyle(graph, graphComponent){
  const nodeDefaults = graph.nodeDefaults;
  nodeDefaults.style = style;
  graph.nodeDefaults.size = new Size(150, 150);

  //Default EdgesStyle:
  graph.edgeDefaults.style = new PolylineEdgeStyle({
    stroke: edgeColorDefault,
    targetArrow: IArrow.TRIANGLE
  })
}

//Decorating the selection of Nodes and Edges
export function decorateSelection(graphComponent) {
  const graphDecorator = graphComponent.graph.decorator
//Nodes:
  const selectionNodeStyle = new ShapeNodeStyle({ shape: 'ellipse', fill: 'none', stroke: '7px solid green' })
  const nodeSelectionDecorator = new NodeStyleDecorationInstaller({
    nodeStyle: selectionNodeStyle,
    zoomPolicy: StyleDecorationZoomPolicy.WORLD_COORDINATES,
    margins: Insets.EMPTY
  })
  graphDecorator.nodeDecorator.selectionDecorator.setImplementation(nodeSelectionDecorator)
//Edges:
  const selectionEdgeStyle = new PolylineEdgeStyle({ stroke: '5px solid green' })
  const edgeSelectionDecorator = new EdgeStyleDecorationInstaller({ edgeStyle: selectionEdgeStyle })
  graphDecorator.edgeDecorator.selectionDecorator.setImplementation(edgeSelectionDecorator)
}