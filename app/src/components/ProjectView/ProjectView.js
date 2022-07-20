import React, { useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { GraphComponent, License, GraphEditorInputMode, Size } from 'yfiles';
import { configureContextMenu } from './CreateContextMenu.js';
import { layoutGraph } from '../impulseEdges/impulseEdges';
import license from '../../assets/js/yfiles/license.json';
import './ProjectView.css';
import {style} from './ProjectViewStyles.js';
import Toolbox from './Toolbox.js';
import axios from 'axios';
import loadGraph from './loadGraph.js';
import saveEdges from './saveEdges.js';
import saveNodes from './saveNodes.js';

// Providing license information for the yfiles library
License.value = license;

// Initialize graphComponent and ContextMenu

export const graphComponent = new GraphComponent();
export const graph = graphComponent.graph;
graphComponent.inputMode = new GraphEditorInputMode();

//Style:
const nodeDefaults = graph.nodeDefaults
nodeDefaults.style = style
graph.nodeDefaults.size = new Size(150, 150);

var loaded = false;

export default function ProjectView() {
    let params = useParams();

    if (!loaded) {
        console.log('load');
        loadGraph(graph, params.projectID);
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
        layoutGraph("tree");

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
            <Toolbox
                project_id={params.projectID}
                nodes={graph.nodes}
                edges={graph.edges}
                nodesCallback={nodesCallback}
                edgesCallback={edgesCallback}
            ></Toolbox>
        );
    };

    const handleBack = () => {
        // save
        saveNodes(params.projectID, graph.nodes, nodesCallback);
        saveEdges(params.projectID, graph.edges, edgesCallback);
    };

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        Project {params.projectID}{' '}
                    </Navbar.Brand>{' '}
                    <Form>
                        <Link
                            to={`/`}
                            onClick={handleBack}
                            className="btn btn-success"
                        >
                            Back
                        </Link>{' '}
                        <Button variant="secondary">Logout</Button>
                    </Form>
                </Container>{' '}
            </Navbar>{' '}
            <RenderToolbox />
            <div className="graph-container" ref={graphContainer}>
                {' '}
            </div>{' '}
        </div>
    );
}
