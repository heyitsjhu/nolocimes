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

import BusinessCard from './BusinessCard';
import { getTestElId } from 'utils';

jest.mock('const', () => ({
  LINKS: { GITHUB_USER_URL: '' },
  POSTS: {},
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

  test.skip('it renders without failing snapshot', () => {
    const onCloseMock = jest.fn();
    const isOpen = true;

    // act(() => {
    //   const { getByLabelText, queryAllByTestId } = render(<BusinessCard />);
    // });
  });
});
