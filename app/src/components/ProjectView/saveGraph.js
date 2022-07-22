import axios from 'axios';
import { graph } from './ProjectView.js';

export default function saveGraph(project_id) {
    const nodes = [];
    graph.nodes.toList().forEach((node) => {
        nodes.push({ node_id: node.tag, content: node.labels.first().text });
    });

    const edges = [];
    graph.edges.toList().forEach((edge) => {
        edges.push({
            edge_id: edge.tag,
            content: edge.labels.first().text,
            node_1: edge.sourceNode.tag,
            node_2: edge.targetNode.tag,
        });
    });

    const data = { nodes: nodes, edges: edges };
    console.log(data);

    axios
        .put(`http://localhost:3001/graphdata/${project_id}`, { data })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
}
