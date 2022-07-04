import { screen } from '@testing-library/react';
import App from './App';
import projects from './components/ProjectList/__test__/mock-projects.json';
import axios from 'axios';
import { GraphComponent, License, Size } from 'yfiles';

jest.mock('axios');
let mockElem = document.createElement('div');
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
        get div() {
            return mockElem;
        }
        get inputMode() {
            return {
                addPopulateItemContextMenuListener: jest.fn(),
                contextMenuInputMode: {
                    addCloseMenuListener: jest.fn(),
                },
            };
        }
        set inputMode(mode) {}
    },
    License: class License {},
    GraphEditorInputMode: class GraphEditorInputMode {},
    ShapeNodeStyle: class ShapeNodeStyle {},
    Size: class Size {},
    Point: class Point {},
    TimeSpan: {
        fromMilliseconds: jest.fn(),
    },
}));

describe('App', () => {
    beforeEach(() => {
        axios.get.mockResolvedValueOnce({ data: projects });
    });

    // Project title is no longer displayed
    // describe('Rendering', () => {
    //     it('Renders the app title', async () => {
    //         renderWithRouter(<App />, '/');
    //         const titleElement = await screen.findByText('Bisociation Net');
    //         expect(titleElement).toBeInTheDocument();
    //     });
    // });

    describe('Routing', () => {
        it('Navigates to the project list view', async () => {
            renderWithRouter(<App />, '/');
            expect(await screen.findByText('My Projects')).toBeInTheDocument();
        });

        it('Navigates to the project view', async () => {
            renderWithRouter(<App />, '/project/0');
            expect(
                await screen.findByText(/project(.*)0/i)
            ).toBeInTheDocument();
        });
    });
});
