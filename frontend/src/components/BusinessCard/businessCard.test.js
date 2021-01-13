import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from '@testing-library/react';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';

import MockTheme from 'theme/MockTheme';
import BusinessCard from './BusinessCard';
import { getTestElId } from 'utils';

jest.mock('const', () => ({
  LINKS: { GITHUB_USER_URL: '' },
  TEST_IDS: { BUSINESS_CARD_MODAL: '' },
  SITE_NAVIGATION: { mapping: [{}, {}, {}, {}, {}, {}, {}, {}] },
  STORE_KEYS: { BLOG: '' },
}));

describe('[components] - BusinessCard', () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  test.skip('it renders without failing snapshot', async () => {
    const onCloseMock = jest.fn();
    const isOpen = true;
    render(
      <MockTheme>
        <BusinessCard open={isOpen} onClose={onCloseMock} />
      </MockTheme>,
      container
    );
    expect(container).toMatchSnapshot();
    fireEvent.click(screen.getByRole('presentation'), { button: 1 });
    expect(onCloseMock).toHaveBeenCalled();
  });
});
