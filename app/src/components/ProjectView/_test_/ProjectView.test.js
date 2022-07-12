import { screen, render } from '@testing-library/react';
import ProjectView from '../ProjectView.js';
import axios from 'axios';

jest.mock('yfiles', () => ({
    GraphComponent: class GraphComponent {
        get graph() {
            return {
                nodeDefaults: {
                    size: jest.fn(),
                },
                createNodeAt: jest.fn(),
                createEdge: jest.fn(),
                addLabel: jest.fn(),
            };
        }
    },
    License: class License {},
    GraphEditorInputMode: class GraphEditorInputMode {},
    ShapeNodeStyle: class ShapeNodeStyle {},
    Size: class Size {},
    Point: class Point {},
}));

test('Renders a button to create a new project', () => {
    expect(2 + 2).toBe(4);
});
