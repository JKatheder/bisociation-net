import { graph } from './ProjectView.js';
import { GraphBuilder } from 'yfiles';
import axios from 'axios';

export default function loadGraph(project_id) {
    graph.clear();
    const graphBuilder = new GraphBuilder(graph);
    axios
        .get(`http://localhost:3001/graphdata/${project_id}`)
        .then((res) => {
            const nodesSource = graphBuilder.createNodesSource(
                res.data.nodes,
                (node) => node.node_id
            );
            nodesSource.nodeCreator.createLabelBinding('content');
            nodesSource.nodeCreator.tagProvider = 'node_id';

            const edgesSource = graphBuilder.createEdgesSource(
                res.data.edges,
                (edge) => edge.node_1,
                (edge) => edge.node_2
            );
            edgesSource.edgeCreator.createLabelBinding('content');
            edgesSource.edgeCreator.tagProvider = 'edge_id';

            //graphBuilder.onNodeCreated()

            graphBuilder.buildGraph();
        })
        .catch((err) => console.log(err));
}
