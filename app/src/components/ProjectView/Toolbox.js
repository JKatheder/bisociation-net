import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import { Point } from 'yfiles';
import { redNodeStyle } from './ProjectViewStyles';
import { graph, graphComponent } from './ProjectView';
import './Toolbox.css';
import saveGraph from './saveGraph.js';
import {
    impulseEdgesToOneNode,
    IMPULSE_COUNT,
    layoutGraph,
    relabel,
} from '../impulseEdges/impulseEdges';

export default function Toolbox(props) {
    const handleSave = () => {
        saveGraph(props.project_id);
    };
    const handleExport = () => {
        /* TODO */
    };
    const handleAutoLayout = () => {
        layoutGraph();
    };
    const handleRelabel = () => {
        graphComponent.selection.selectedLabels.forEach((item) =>
            relabel(item)
        );
    };
    const handleImpulseEdges = () => {
        graphComponent.selection.selectedNodes.forEach((item) =>
            impulseEdgesToOneNode(item, IMPULSE_COUNT)
        );
        layoutGraph();
    };
    const handleColorChange = () => {
        /* TODO */
        if (graphComponent.selection.selectedNodes.size > 0) {
            graph.createNodeAt(new Point(900, 100), redNodeStyle);
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
                        onClick={handleRelabel}
                    >
                        Relabel
                    </Button>
                    <Button
                        className="buttons"
                        variant="secondary"
                        onClick={handleImpulseEdges}
                    >
                        Add impulse edges
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
