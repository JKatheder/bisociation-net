import { screen, render, act } from '@testing-library/react';
import ProjectList from '../ProjectList';
import projects from './mock-projects.json';
import axios from 'axios';
import BrowserRouter from 'react-router-dom';

jest.mock('axios');

describe('ProjectList', () => {
    beforeEach(() => {
        axios.get.mockResolvedValueOnce({ data: projects });
    });

    describe('Rendering', () => {
        it('Renders the correct number of projects', async () => {
            renderWithRouter(<ProjectList />, '/');

            expect(axios.get).toHaveBeenCalledWith(
                'http://localhost:3001/projects'
            );
            const renderedProjects = await screen.findAllByText('Open');
            expect(renderedProjects).toHaveLength(projects.length);
        });

        it('Renders all projects', async () => {
            renderWithRouter(<ProjectList />, '/');
            projects.forEach(async (project) => {
                const projectExcerpt =
                    project.description.length > 20
                        ? project.description.substring(0, 20) + '...'
                        : project.description;
                expect(
                    await screen.findByText(project.title)
                ).toBeInTheDocument();
                expect(
                    await screen.findByText(project.date)
                ).toBeInTheDocument();
                expect(
                    await screen.findByText(projectExcerpt)
                ).toBeInTheDocument();
                expect(
                    await screen.findByTestId(`projectList-link-${project.id}`)
                ).toBeInTheDocument();
                expect(
                    await screen.findByTestId(`projectList-menu-${project.id}`)
                ).toBeInTheDocument();
            });
        });

        it('Renders a button to create a new project', () => {
            renderWithRouter(<ProjectList />, '/');
            expect(screen.getByText('New Project')).toBeInTheDocument();
        });

        // TODO
        test(`When the project array is empty
          Then it renders only the new project button`, () => {
            renderWithRouter(<ProjectList />, '/');
            expect(screen.getByText('New Project')).toBeInTheDocument();
            expect(
                screen.queryByTestId('projectList-item')
            ).not.toBeInTheDocument();
        });
    });

    describe('Navigation', () => {
        it('Navigates to the correct project', async () => {
            axios.get.mockResolvedValueOnce({ data: projects });
            const { history, user } = renderWithHistory(<ProjectList />, ['/']);

            let projectLinks = await screen.findAllByText('Open');
            for (let index = 0; index < projects.length; index++) {
                let project = projects[index];
                let link = projectLinks[index];

                await user.click(link);
                expect(history.location.pathname).toBe(
                    `/project/${project.project_id}`
                );
            }
        });
    });

    describe('Toggle menu', () => {});

    describe('Delete project', () => {});

    describe('Create new project', () => {});
});
