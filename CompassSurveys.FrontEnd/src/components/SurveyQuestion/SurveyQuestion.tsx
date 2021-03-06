import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { Question } from '../../models/Question';

export interface SurveyQuestionProps {
  question: Question
}

export const SurveyQuestion: React.FC<SurveyQuestionProps> = (props) => {
  const { question } = props;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{question.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{question.subTitle}</Card.Subtitle>
        <Card.Text as="div">
            {question.options && question.options.map((value, index) => {
              return (
                <Form.Check
                  key={index}
                  type='radio'
                  id={`${question.id}-${value.id}`}
                  name={question.id}
                  label={value.text}
                />
              )
            })}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
