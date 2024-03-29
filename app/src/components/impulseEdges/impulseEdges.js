import { graph, graphComponent } from '../ProjectView/ProjectView';
import {
    Class,
    LayoutExecutor,
    ClassicTreeLayout,
    OrganicLayout,
    CircularLayout,
    EdgeSegmentLabelModel,
    EdgeSides,
    Point,
} from 'yfiles';

//get random noun
const { one } = require('nouns');

export function impulseEdgesToOneNode(rootNode, impulseCount) {
    for (var i = 0; i < impulseCount; i++) {
        const node = graph.createNodeAt(new Point(0, 0));
        const edge = graph.createEdge(rootNode, node);
        graph.addLabel(
            edge,
            one(),
            new EdgeSegmentLabelModel(
                5,
                0,
                0,
                false,
                EdgeSides.LEFT_OF_EDGE
            ).createDefaultParameter()
        );
    }
}

export function relabel(label) {
    graph.setLabelText(label, one());
}

export function layoutGraph(mode) {
    var layout = new ClassicTreeLayout();

    if (mode === 'organic') {
        layout = new OrganicLayout();
    }
    if (mode === 'circular') {
        layout = new CircularLayout();
    }

    layout.considerNodeSizes = true;
    layout.minimumNodeDistance = 100;
    layout.minimumLayerDistance = 100;

    Class.ensure(LayoutExecutor);

    graphComponent
        .morphLayout(layout)
        .catch((e) => alert('An error occurred during layout'));

    graphComponent.fitGraphBounds();
    //graphComponent.inputMode = new GraphEditorInputMode()
}