import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { Container, Button, Row, Spinner } from 'react-bootstrap';
import { getSurvey } from '../../utils/api/SurveyApi';
import { Survey } from '../../models';
import { SurveyQuestion } from '../../components/SurveyQuestion';

export const SurveyView: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [survey, setSurvey] = useState({} as Survey);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result : Survey = await getSurvey(id);
      setSurvey(result);
      setLoading(false);
    };

    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const handleBackClick = () => {
    history.push('/');
  };

  return (
    <Container>
      {isLoading
        ? <Row className="d-flex justify-content-center m-5">
            <Spinner animation="border" />
          </Row>
        : <div>
            <h1>{survey.name}</h1>
            <div className="mt-5 mb-5">
              {survey.questions && survey.questions.map((value, index) => {
                return (
                  <SurveyQuestion key={value.id} question={value} />
                );
              })}
            </div>
            <div className="float-right">
              <Button
                value="Back"
                variant="primary"
                className="mr-1"
                onClick={handleBackClick}
                data-testid="btnBack"
              >
                Back
              </Button>
            </div>
          </div>
      }
    </Container>
  );
};
