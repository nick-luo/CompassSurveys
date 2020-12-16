import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { SurveyQuestion } from '../SurveyQuestion';
import { Question } from '../../../models/Question';

describe('SurveyQuestion', () => {
  const renderComponent = (): RenderResult => {
    const question: Question = {
      id: '1',
      createdBy: 'John Smith',
      createdDateTime: new Date(2020, 12, 16),
      title: 'Question 1',
      subTitle: 'Subtitle',
      questionType: 3,
      options: [
        {
          id: '1',
          text: 'Option 1'
        },
        {
          id: '2',
          text: 'Option 2'
        }
      ]
    };

    return render(
      <MemoryRouter>
        <SurveyQuestion question={question}/>
      </MemoryRouter>,
    );
  };

  afterEach(cleanup);

  it('should display question title', async () => {
    // act
    const { findByText } = renderComponent();

    // assert
    const title = await findByText('Question 1');
    expect(title).toBeTruthy();
  });

  it('should display question sub-title', async () => {
    // act
    const { findByText } = renderComponent();

    // assert
    const subtitle = await findByText('Subtitle');
    expect(subtitle).toBeTruthy();
  });

  it('should display options', async () => {
    // act
    const { findByText } = renderComponent();

    // assert
    const option1 = await findByText('Option 1');
    expect(option1).toBeTruthy();

    const option2 = await findByText('Option 2');
    expect(option2).toBeTruthy();
  });
});
