import { screen } from '@testing-library/react';
import ProjectList from '../ProjectList'
import projects from './mock-projects.json'

describe('ProjectList', () => {

  describe('Rendering', () => {
    // TODO this test has to be adjusted for a ProjectList with dynamic data
    it('Renders the correct number of projects', async () => {
      renderWithRouter(<ProjectList projects={projects} />, '/');
      expect(screen.getAllByText('Öffnen')).toHaveLength(projects.length)
    });
  
    // TODO this test has to be adjusted for a ProjectList with dynamic data
    it('Renders all projects', () => { 
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

    // TODO this test has to be adjusted for a ProjectList with dynamic data
    test(`When the project array is empty
          Then it renders only the new project button`, () => {
      renderWithRouter(<ProjectList />, '/');
      expect(screen.getByText('Neues Projekt')).toBeInTheDocument();
      expect(screen.queryByTestId('projectList-item')).not.toBeInTheDocument();

    });
  });

  // TODO this test has to be adjusted for a ProjectList with dynamic data
  describe('Navigation', () => {
    it('Navigates to the correct project', async () => {
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
});