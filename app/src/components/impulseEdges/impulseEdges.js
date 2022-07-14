import {graph, 
    graphComponent, 
    generateNewNode} from '../ProjectView/ProjectView';
import { GraphEditorInputMode, 
    Class, 
    LayoutExecutor, 
    ClassicTreeLayout, 
    EdgeSegmentLabelModel, 
    EdgeSides
} from 'yfiles';

export const IMPULSE_COUNT = 5;

//get random noun
const { one } = require('nouns');


export function impulseEdgesToOneNode(rootNode, impulseCount){
    for(var i = 0; i < impulseCount; i++){
        const node = generateNewNode(0, 0, '')
        const edge = graph.createEdge(rootNode, node)
        graph.addLabel(
            edge,
            one(),
            new EdgeSegmentLabelModel(5, 0, 0, false, EdgeSides.LEFT_OF_EDGE).createDefaultParameter()
          )
    }
}

export function relabel(label){
   graph.setLabelText(label, one())
}

export function layoutGraph(){
    const layout = new ClassicTreeLayout()
    layout.considerNodeSizes = true
    layout.minimumNodeDistance = 100
    layout.minimumLayerDistance = 100

    Class.ensure(LayoutExecutor)

    graphComponent
        .morphLayout(layout)
        .catch(e => alert('An error occurred during layout'))

    graphComponent.fitGraphBounds()
    graphComponent.inputMode = new GraphEditorInputMode()

  
}