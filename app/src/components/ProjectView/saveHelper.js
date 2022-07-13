import axios from 'axios'
import {graph, generateNewNode} from './ProjectView';

export function saveHelper(loaded, params) {

if (!loaded) {
    var new_edges = [];
    axios
        .get(`http://localhost:3001/nodes/${params.projectID}`)
        .then((res_nodes) => {
            res_nodes.data.forEach((node) => {
                var curr_node = generateNewNode(
                    Number(node.x_pos),
                    Number(node.y_pos),
                    node.content
                );
                curr_node.tag = node.node_id;
                // get edges with node_1 = node
                axios
                    .get(`http://localhost:3001/curredges/${node.node_id}`)
                    .then((res_edges) => {
                        res_edges.data.forEach((edge) => {
                            if (edge) {
                                // new_edges contains tupels of nodes, that will become edges
                                // the first node always is a graph node
                                // the second node at this point is a node id, as the node may not be loaded yet
                                var tupel_nodes = [curr_node, edge.node_2];
                                new_edges.push(tupel_nodes);
                                // go through all loaded nodes and generate edges
                                // this could also be done after all nodes are loaded in one loop
                                // more efficient here, because new_edges gets smaller while graph.nodes gets larger => shorter loops
                                graph.nodes
                                    .toList()
                                    .forEach((loaded_node) => {
                                        new_edges.forEach(
                                            (edge_toLoad, index) => {
                                                if (
                                                    loaded_node.tag ===
                                                    edge_toLoad[1]
                                                ) {
                                                    graph.createEdge(
                                                        edge_toLoad[0],
                                                        loaded_node
                                                    );
                                                    // remove finished edge
                                                    new_edges.splice(
                                                        index,
                                                        1
                                                    );
                                                }
                                            }
                                        );
                                    });
                            }
                        });
                    })
                    .catch((err) => console.log(err));
            });
        })
        .catch((err) => console.log(err));
    loaded = true;
}
}