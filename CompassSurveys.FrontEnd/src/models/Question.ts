import { Option } from './Option';

export type Question = {
  id: string;
  createdBy: string;
  createdDateTime: Date;
  title: string;
  subTitle: string;
  questionType: number;
  options: Option[];
};
