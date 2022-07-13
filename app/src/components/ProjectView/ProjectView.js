import React, { useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { GraphComponent,
    License, 
    GraphEditorInputMode,
    Size,
    Point
} from 'yfiles';
import { configureContextMenu } from './CreateContextMenu.js';
import license from '../../assets/js/yfiles/license.json';
import './ProjectView.css';
import {style} from './ProjectViewStyles.js';
import Toolbox from './Toolbox.js';
import { saveHelper } from './saveHelper.js';
//import CreateExport from './demo-resources/CreateExport.js'


// Providing license information for the yfiles library
License.value = license;

// Initialize graphComponent and ContextMenu
export const graphComponent = new GraphComponent();
export const graph = graphComponent.graph;
graphComponent.inputMode = new GraphEditorInputMode()

// set a new default style
const nodeDefaults = graph.nodeDefaults
nodeDefaults.style = style
nodeDefaults.size = new Size(150, 150)

//Graph methods: not used right now
//Adds a node to the graph at (x,y) with label 'Label'
export function generateNewNode(x, y, input_label) {
  const node = graph.createNodeAt(new Point(x,y))
  graph.addLabel(node, input_label)
  return node
}

// Construct a some sample nodes:
const rootNode = generateNewNode(700,100, 'PROJECT-X')
export const node1 = generateNewNode(200,500, 'Node1')
const node2 = generateNewNode(800,500, 'Node2')
graph.createEdge(rootNode, node1)
graph.createEdge(rootNode, node2)



var loaded = false;
export default function ProjectView() {
  
    let params = useParams();

    // saving the graph, if button is pressed
    saveHelper(loaded, params)

    // The useRef hook is used to reference the graph-container DOM node directly in order to append the graphComponent canvas to it
    const graphContainer = useRef(null);

    // The canvas is rendered by the yfiles library, thus this is handled as a side effect
    // For documentation, see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // Append the graphComponent canvas to the graph container
        const currentgraphContainer = graphContainer.current;
        currentgraphContainer.appendChild(graphComponent.div);
        configureContextMenu(graphComponent);

        // Return cleanup function
        return () => {
            currentgraphContainer.removeChild(graphComponent.div);
        };
    });

        // allow to set node/edge id in tag on save
        const nodesCallback = (node_return, id) => {
            graph.nodes.toList().forEach((node) => {
                if (node_return === node) {
                    node.tag = id;
                }
            });
        };
        const edgesCallback = (edge_return, id) => {
            graph.edges.toList().forEach((edge) => {
                if (edge_return === edge) {
                    edge.tag = id;
                }
            });
        };

    const RenderToolbox = () => {
        return (
            <Toolbox position="absolute !important">
                project_id={params.projectID}
                nodes={graph.nodes}
                edges={graph.edges}
                nodesCallback={nodesCallback}
                edgesCallback={edgesCallback}
            </Toolbox>
        )
    }

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        Project {params.projectID}
                    </Navbar.Brand>
                    <Form>
                        <Link to={`/`} className="btn btn-success">Back</Link>{' '}
                        <Button variant="secondary">Logout</Button>
                    </Form>
                </Container>
            </Navbar>
            <RenderToolbox position="absolute !important"/>
            <div className="graph-container" ref={graphContainer}></div>
        </div>
    );
}
