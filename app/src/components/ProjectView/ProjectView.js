import React, { useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import {
    GraphComponent,
    License,
    ShapeNodeStyle,
    GraphEditorInputMode,
    Size,
    Point,
} from 'yfiles';
import { configureContextMenu } from './CreateContextMenu.js';
import license from '../../assets/js/yfiles/license.json';
import './ProjectView.css';
import Toolbox from './Toolbox.js';
import axios from 'axios';

// Providing license information for the yfiles library
License.value = license;

// Initialize graphComponent and ContextMenu
const graphComponent = new GraphComponent();
const graph = graphComponent.graph;
graphComponent.inputMode = new GraphEditorInputMode();

//Style:
const greenNodeStyle = new ShapeNodeStyle({
    shape: 'ellipse',
    fill: 'green',
    stroke: 'transparent',
});
graph.nodeDefaults.size = new Size(150, 150);

//Adds a node to the graph at (x,y) with label 'Label'
function generateNewNode(x, y, input_label) {
    const node = graph.createNodeAt(new Point(x, y), greenNodeStyle);
    graph.addLabel(node, input_label);
    return node;
}

var loaded = false;

export default function ProjectView() {
    let params = useParams();

    // can't be outsourced into own component, because then graph is not changed
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
            //contextMenu.clearItems()
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
            <Toolbox
                project_id={params.projectID}
                nodes={graph.nodes}
                edges={graph.edges}
                nodesCallback={nodesCallback}
                edgesCallback={edgesCallback}
            ></Toolbox>
        );
    };

    const handleBack = () => {};

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        Project {params.projectID}{' '}
                    </Navbar.Brand>{' '}
                    <Form>
                        <Button variant="secondary" onClick={handleBack}>
                            {' '}
                            Back{' '}
                        </Button>{' '}
                        <Button variant="secondary"> Logout </Button>{' '}
                    </Form>{' '}
                </Container>{' '}
            </Navbar>{' '}
            <RenderToolbox />
            <div className="graph-container" ref={graphContainer}>
                {' '}
            </div>{' '}
        </div>
    );
}
