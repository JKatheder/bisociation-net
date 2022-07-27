import { graph, graphComponent } from './ProjectView.js';
import { GraphMLIOHandler, Point } from 'yfiles';
import axios from 'axios';

export default function loadGraph(project_id) {
    graph.clear();
    const handler = new GraphMLIOHandler();
    // get root from load or create new
    var setRoot = null;
    axios
        .get(`http://localhost:3001/graphdata/${project_id}`)
        .then((res) => {
            if (res.data.rows[0].data) {
                // load graph when data present
                handler.readFromGraphMLText(graph, res.data.rows[0].data);
                setRoot = graph.nodes.toList().first();
                // change root when project changed
                graph.addLabel(setRoot, res.data.rows[0].title);
                setRoot.tag = res.data.rows[0].description;
            } else {
                // generate root node when first time opening project
                const root = graph.createNodeAt(new Point(0, 0));
                graph.addLabel(root, res.data.rows[0].title);
                root.tag = res.data.rows[0].description;

                setRoot = root;
            }
            // prevent root label from being edited
            graphComponent.inputMode.addLabelEditingListener((source, args) => {
                if (args.owner && args.owner === setRoot) {
                    args.cancel = true;
                }
            });
        })
        .catch((err) => console.log(err));
}