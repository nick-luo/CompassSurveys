import { Question } from './Question';

export type Survey = {
  id: string;
  name: string;
  questions: Question[];
};
