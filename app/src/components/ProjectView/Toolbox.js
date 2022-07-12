import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import { Point } from 'yfiles';
import { redNodeStyle } from './ProjectViewStyles';
import ProjectView, {graph, graphComponent} from './ProjectView';
import './Toolbox.css';
import saveNodes from './saveNodes.js';
import saveEdges from './saveEdges.js';

export default function Toolbox(props) {
    const handleSave = () => {
        saveNodes(props.project_id, props.nodes, props.nodesCallback);
        saveEdges(props.project_id, props.edges, props.edgesCallback);
    };
    const handleExport = () => {
        /* TODO */
    };
    const handleAutoLayout = () => {
        /* TODO */
    };
    const handleColorChange = () => {
        /* TODO */
        if (graphComponent.selection.selectedNodes.size > 0){
            graph.createNodeAt(new Point(900,100), redNodeStyle)
        }
    };

    return (
        <Draggable defaultPosition={{ x: 0, y: 0 }}>
            <Card style={{ zIndex: 1000, width: '10rem' }}>
                <Card.Body>
                    <Card.Title>Toolbox</Card.Title>
                    <Button
                        className="buttons"
                        variant="secondary"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        className="buttons"
                        variant="secondary"
                        onClick={handleExport}
                    >
                        Export
                    </Button>
                    <Button
                        className="buttons"
                        variant="secondary"
                        onClick={handleAutoLayout}
                    >
                        Auto-Layout
                    </Button>
                    <Button
                        className="buttons"
                        variant="secondary"
                        onClick={handleColorChange}
                    >
                        Color-Change
                    </Button>
                </Card.Body>
            </Card>
        </Draggable>
    );
}