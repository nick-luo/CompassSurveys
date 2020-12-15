import { Survey } from '../../models';
import { entityRequest } from '../http-request';

export const getSurveys = async (): Promise<Survey[]> => {
  return await entityRequest(CompassConfig.ApiBaseUrl + 'surveys');
};

export const getSurvey = async (id: number): Promise<Survey> => {
  return await entityRequest(CompassConfig.ApiBaseUrl + 'surveys/' + id);
};
