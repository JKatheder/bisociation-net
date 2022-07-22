import axios from 'axios';
import { graph } from './ProjectView.js';
import { GraphMLIOHandler } from 'yfiles';

// saves all information about graph, including colour, style, etc.
export default function saveGraph(project_id) {
    const handler = new GraphMLIOHandler();
    handler.write(graph).then((data) => {
        axios
            .put(`http://localhost:3001/graphdata/${project_id}`, { data })
            .catch((err) => console.log(err));
    });
}
