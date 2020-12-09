import React from 'react';
import renderer from 'react-test-renderer';
import pretty from 'pretty';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import BlogHero from './BlogHero';

let container = null;

describe('[components] - BlogHero', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('it renders without failing snapshot', () => {
    let tree = renderer.create(<BlogHero />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
