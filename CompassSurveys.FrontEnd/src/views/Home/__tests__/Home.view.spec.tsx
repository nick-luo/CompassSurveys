import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomeView } from '../Home.view';
import * as SurveyApi from '../../../utils/api/SurveyApi';
import { Survey } from '../../../models';
import { act } from "react-dom/test-utils";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

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

  it('should navigate to survey page when survey button is clicked', async () => {
    // arrange
    const mockResponse: Survey[] = [
      {
        id: '1',
        name: 'Survey 1',
        questions: []
      },
      {
        id: '2',
        name: 'Survey 2',
        questions: []
      },
    ];

    jest.spyOn(SurveyApi, 'getSurveys').mockImplementation(() => {
      return Promise.resolve(mockResponse);
    });

    // act
    let renderResult: RenderResult;

    await act(async () => {
      renderResult = renderComponent();
    });

    const survey1Button = renderResult.getByTestId('button-1');
    const survey2Button = renderResult.getByTestId('button-2');

    await act(async () => {
      fireEvent.click(survey1Button);
    });

    // assert
    expect(survey1Button).toBeTruthy();
    expect(survey2Button).toBeTruthy();

    expect(SurveyApi.getSurveys).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/survey/1');
  });
});
