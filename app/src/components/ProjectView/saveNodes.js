import axios from 'axios';

export default function saveNodes(props) {
    console.log(props);
    // get existing ids from database table nodes
    var prev_ids = [];
    axios
        .get(`http://localhost:3001/nodes/${props.project_id}`)
        .then((res) => {
            res.data.map((node) => prev_ids.push(node.node_id));
        })
        .catch((err) => console.log(err));
    // loop through nodes
    props.graph.nodes.toList().forEach((node) => {
        // get label
        var label = '';
        if (node.labels.size > 1) {
            console.log('Error: node with more than one label');
        } else if (node.labels.size !== 1) {
            console.log('Node without label');
        } else {
            label = node.labels.toList().first().text;
        }
        // update node if already in database
        if (prev_ids.includes(node.tag)) {
            axios
                .put(`http://localhost:3001/nodes/${node.tag}`, {
                    x: node.layout.x,
                    y: node.layout.y,
                    content: label,
                })
                .then(prev_ids.pop(node.tag))
                .catch((err) => console.log(err));
        }
        // create new node if node not existing in database
        else {
            axios
                .post(`http://localhost:3001/nodes/${props.project_id}`, {
                    x: node.layout.x,
                    y: node.layout.y,
                    content: label,
                })
                .then((res) => {
                    var item = res.data.rows[0];
                    node.tag = item.node_id;
                })
                .catch((err) => console.log(err));
        }
    });
    // delete remaining nodes
    prev_ids.forEach((node_id) => {
        axios
            .delete(`http://localhost:3001/nodes/${node_id}`)
            .catch((err) => console.log(err));
    });
}