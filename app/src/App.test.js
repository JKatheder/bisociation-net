import { screen } from '@testing-library/react'
import App from './App';
import projects from './components/ProjectList/__test__/mock-projects.json'


describe('App', () => {

    describe('Rendering', () => {
        it('Renders the app title', () => {
            renderWithRouter(<App />, '/');
            const titleElement = screen.getByText('Bisociation Net');
            expect(titleElement).toBeInTheDocument();
        });
    });

    describe('Routing', () => {
        it('Navigates to the project list view', () => {
            renderWithRouter(<App />, '/');
            expect(screen.getByText('Meine Projekte')).toBeInTheDocument();
        });
    
        it('Navigates to the project view', () => {
            renderWithRouter(<App />, '/project/0');
            expect(screen.getByText(/project(.*)0/i)).toBeInTheDocument();
        });
    
        // TODO this test has to be adjusted for a ProjectList with dynamic data
        it('Navigates to all projects and back', async () => {
            const {user} = renderWithRouter(<App projects={projects}/>, '/');
            for (let index = 0; index < projects.length; index++) {
                let link = screen.getAllByText('Öffnen')[index];
                await user.click(link);
                expect(screen.getByText(`Project ${projects[index].id}`)).toBeInTheDocument();
                await user.click(screen.getByText('zurück'));
                expect(screen.getByText('Meine Projekte')).toBeInTheDocument();
            }
        });
    });

});
