import { graph } from './ProjectView.js';
import { GraphMLIOHandler, Point } from 'yfiles';
import axios from 'axios';

export default function loadGraph(project_id) {
    graph.clear();
    const handler = new GraphMLIOHandler();
    axios
        .get(`http://localhost:3001/graphdata/${project_id}`)
        .then((res) => {
            if (res.data.rows[0].data) {
                // load graph when data present
                handler.readFromGraphMLText(graph, res.data.rows[0].data);
            } else {
                // generate root node when first time opening project
                const root = graph.createNodeAt(new Point(0, 0));
                graph.addLabel(root, res.data.rows[0].title);
                root.tag = res.data.rows[0].description;
            }
        })
        .catch((err) => console.log(err));
}