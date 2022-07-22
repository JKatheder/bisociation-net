import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Draggable from 'react-draggable';
import { Point } from 'yfiles';
import { redNodeStyle , greenNodeStyle, style} from './ProjectViewStyles';
import {graph, graphComponent} from './ProjectView';
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

    //0="original Color", 1="green" and 2="red"
    var saveIfColored = new Array(graphComponent.selection.selectedNodes.size).fill(0)
    const handleColorChange = () => {
        if (graphComponent.selection.selectedNodes.size > 0){ 
            var i
            for (i=0; i < graphComponent.selection.selectedNodes.size; i++) {
                const t = graphComponent.selection.selectedNodes.elementAt(i)
                if(saveIfColored[i] === 0){
                    graph.setStyle(t, greenNodeStyle) 
                    saveIfColored[i] = 1
                }else if(saveIfColored[i] === 1) {
                    graph.setStyle(t, redNodeStyle)
                    saveIfColored[i] = 2
                }else {
                    graph.setStyle(t, style)
                    saveIfColored[i] = 0
                }
            }
        }
    };

    return (
        <Draggable defaultPosition={{ x: 0, y: 0 }}>
            
            <Card style={{ zIndex: 1000, width: '10rem' }}>

                <div className="positionCanvas">
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
                </div>
            </Card>
            
        </Draggable>
    );
}
