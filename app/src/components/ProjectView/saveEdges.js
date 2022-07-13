import axios from 'axios';

// edges is a property of graph (e.g. graph.edges)
// edges.toList() is called in this compontent
// edgesCallback is a function from ProjectView.js to change tags in the original graph
export default function saveEdges(project_id, edges, edgesCallback) {
    // get existing ids from database table edges
    var prev_ids = [];
    var saved_ids = [];

    axios
        .get(`http://localhost:3001/edges/${project_id}`)
        .catch((err) => console.log(err))
        .then((res) => {
            res.data.map((edge) => prev_ids.push(edge.edge_id));

            // loop through edges
            edges.toList().forEach((edge) => {
                // get label
                var label = '';
                if (edge.labels.size > 1) {
                    console.log('Error: edge with more than one label');
                } else if (edge.labels.size !== 1) {
                    console.log('Edge without label');
                } else {
                    label = edge.labels.toList().first().text;
                }
                // update edge if already in database
                if (prev_ids.includes(edge.tag)) {
                    axios
                        .put(`http://localhost:3001/edges/${edge.tag}`, {
                            node1: edge.sourcePort.owner.tag,
                            node2: edge.targetPort.owner.tag,
                            content: label,
                        })
                        .then(saved_ids.push(edge.tag))
                        .catch((err) => console.log(err));
                }
                // create new edge if edge not existing in database
                else {
                    axios
                        .post(`http://localhost:3001/edges/${project_id}`, {
                            node1: edge.sourcePort.owner.tag,
                            node2: edge.targetPort.owner.tag,
                            content: label,
                        })
                        .then((res) => {
                            var item = res.data.rows[0];
                            edgesCallback(edge, item.edge_id);
                        })
                        .catch((err) => console.log(err));
                }
                // delete remaining nodes
                prev_ids.forEach((edge_id) => {
                    if (!saved_ids.includes(edge_id)) {
                        axios
                            .delete(`http://localhost:3001/edges/${edge_id}`)
                            .catch((err) => console.log(err));
                    }
                });
            });
        });
}