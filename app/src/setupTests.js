// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'

// Render component with router in order to prevent errors from React Router package
// As long as valid routes are supplied, it is possible to navigate to different views
global.renderWithRouter = (ui, route) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, {wrapper: BrowserRouter}),
  }
}

// Render component with history in order to prevent errors from React Router package
// Check history.location.pathname to test a changed URL
global.renderWithHistory = (ui, initialEntries) => {
    const history = createMemoryHistory(initialEntries);
    const user = userEvent.setup();

    return { 
      ...render(
        <Router location={history.location} navigator={history}> 
          {ui}
        </Router >
      ), history, user 
    };
}