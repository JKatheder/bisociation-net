import { screen } from '@testing-library/react';
import ProjectList from '../ProjectList'
import axios from 'axios';

jest.mock('axios');

describe('ProjectList', () => {
  describe('Rendering', () => {
    it('Renders the correct number of projects', async () => {
      axios.get.mockResolvedValueOnce(projects);
      renderWithRouter(<ProjectList projects={projects} />, '/');
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3001');
      expect(screen.getAllByText('Öffnen')).toHaveLength(projects.length)
    });

    it('Renders all projects', async () => { 
      axios.get.mockResolvedValueOnce(projects);
      renderWithRouter(<ProjectList projects={projects} />, '/');
      projects.forEach((project) => {
        const projectExcerpt = project.description.length > 20 ? project.description.substring(0, 20) + '...' : project.description;
        expect(screen.getByText(project.title)).toBeInTheDocument();
        expect(screen.getByText(project.date)).toBeInTheDocument();
        expect(screen.getByText(projectExcerpt)).toBeInTheDocument();
        expect(screen.getByTestId(`projectList-link-${project.id}`)).toBeInTheDocument();
        expect(screen.getByTestId(`projectList-menu-${project.id}`)).toBeInTheDocument();
      });
    });
  
    it('Renders a button to create a new project', () => {
      renderWithRouter(<ProjectList projects={projects} />, '/');
      expect(screen.getByText('Neues Projekt')).toBeInTheDocument();
    });

    // TODO
    test(`When the project array is empty
          Then it renders only the new project button`, () => {
      renderWithRouter(<ProjectList />, '/');
      expect(screen.getByText('Neues Projekt')).toBeInTheDocument();
      expect(screen.queryByTestId('projectList-item')).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('Navigates to the correct project', async () => {
      axios.get.mockResolvedValueOnce(projects);
      const {history, user} = renderWithHistory(<ProjectList projects={projects} />, ['/']);
    
      let projectLinks = screen.getAllByText('Öffnen');
      for (let index = 0; index < projects.length; index++) {
        let project = projects[index];
        let link = projectLinks[index];
    
        await user.click(link);
        expect(history.location.pathname).toBe(`/project/${project.id}`);
      }
    });
  });

  describe("Toggle menu", () => {
    
  });

  describe("Delete project", () => {

  });

  describe("Create new project", () => {

  });
});