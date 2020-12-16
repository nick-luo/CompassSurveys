import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { SurveyView } from '../Survey.view';
import { Survey } from '../../../models';
import * as SurveyApi from '../../../utils/api/SurveyApi';
import { act } from "react-dom/test-utils";

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('SurveyView', () => {
  const mockResponse: Survey = {
    id: '1',
    name: 'Survey 1',
    questions: [
      {
        id: '1',
        createdBy: 'John Smith',
        createdDateTime: new Date(2020, 12, 16),
        title: 'Question 1',
        subTitle: 'First question',
        questionType: 3,
        options: []
      },
      {
        id: '2',
        createdBy: 'John Smith',
        createdDateTime: new Date(2020, 12, 16),
        title: 'Question 2',
        subTitle: 'Second question',
        questionType: 3,
        options: []
      }
    ]
  };

  const renderComponent = (): RenderResult => {
    return render(
      <MemoryRouter>
        <SurveyView />
      </MemoryRouter>,
    );
  };

  afterEach(cleanup);

  it('should display list of questions', async () => {
    // arrange
    jest.spyOn(SurveyApi, 'getSurvey').mockImplementation(() => {
      return Promise.resolve(mockResponse);
    });

    // act
    let renderResult: RenderResult;

    await act(async () => {
      renderResult = renderComponent();
    });

    // assert
    const firstQuestion = await renderResult.findByText('First question');
    expect(firstQuestion).toBeTruthy();

    const secondQuestion = await renderResult.findByText('Second question');
    expect(secondQuestion).toBeTruthy();
  });

  it('should navigate to surveys page when Back button is clicked', async () => {
    // arrange
    jest.spyOn(SurveyApi, 'getSurvey').mockImplementation(() => {
      return Promise.resolve(mockResponse);
    });

    // act
    let renderResult: RenderResult;

    await act(async () => {
      renderResult = renderComponent();
    });

    const backButton = renderResult.getByTestId('btnBack');
    await act(async () => {
      fireEvent.click(backButton);
    });

    // assert
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
