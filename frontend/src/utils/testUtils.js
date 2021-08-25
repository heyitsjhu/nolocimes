import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import ApplicationProviders from 'store';

const customRender = (ui, options = {}) => {
  const Wrapper = ({ children }) => {
    return (
      <ApplicationProviders>
        <MemoryRouter>{children}</MemoryRouter>
      </ApplicationProviders>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
