import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, screen } from 'utils/testUtils';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';

import Footer from './Footer';

jest.mock('const', () => ({ CLASSES: {}, LINKS: {}, POSTS: {}, ROUTES: {}, STORE_KEYS: {} }));

describe('[components] - Footer', () => {
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

  test('it renders without failing snapshot', () => {
    const onPrivacyPolicyClickMock = jest.fn();
    const isOpen = true;

    act(() => {
      render(<Footer />);
    });

    fireEvent.click(screen.getByText('Privacy Policy'));

    // expect(screen.getByRole("contentinfo")

    // fireEvent.click(screen.getByRole('presentation'), { button: 1 });
    // expect(onPrivacyPolicyClickMock).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });
});
