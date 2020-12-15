import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomeView } from '../Home.view';

describe('HomeView', () => {
  const renderComponent = (): RenderResult => {
    return render(
      <MemoryRouter>
        <HomeView />
      </MemoryRouter>,
    );
  };

  afterEach(cleanup);

  it('should render without crashing', () => {
    // act
    const renderedComponent = renderComponent();

    // assert
    expect(renderedComponent.container.firstChild).toMatchSnapshot();
  });
});
