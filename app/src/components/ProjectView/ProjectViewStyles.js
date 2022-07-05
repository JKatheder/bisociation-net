import { ShapeNodeStyle, Fill, ShapeNodeShape} from 'yfiles';

//Default Style
export const style = new ShapeNodeStyle({
  fill: Fill.GREEN,
  shape: ShapeNodeShape.ELLIPSE
})

//Style 1:
export const greenNodeStyle = new ShapeNodeStyle({
    shape: 'ellipse',
    fill: 'green',
    stroke: 'transparent'
  })
//Style 2:
export const redNodeStyle = new ShapeNodeStyle({
      shape: 'ellipse',
      fill: 'red',
      stroke: 'transparent'
})