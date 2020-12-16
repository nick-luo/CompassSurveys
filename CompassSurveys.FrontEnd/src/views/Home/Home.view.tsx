import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Row, Spinner } from 'react-bootstrap';
import { getSurveys } from '../../utils/api/SurveyApi';
import { Survey } from '../../models';

export const HomeView: React.FC = () => {
  const [surveys, setSurveys] = useState([] as Survey[]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getSurveys();
      setSurveys(result);
      setLoading(false);
    };

    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClick = (surveyId: string) => {
    history.push('/survey/' + surveyId);
  };

  return (
    <Container>
      <h1>Compass Surveys</h1>
      {isLoading
        ? <Row className="justify-content-md-center">
            <Spinner animation="border" />
          </Row>
        : surveys.map((value, index) => {
          return (
            <Button
              key={`${index}`}
              value={value.id}
              variant="primary"
              onClick={e => handleClick((e.target as HTMLInputElement).value)}
              block
              data-testid={`button-${value.id}`}
            >
              {value.name}
            </Button>
          );
        })
      }
    </Container>
  );
};
