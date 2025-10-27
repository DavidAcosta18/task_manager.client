import type { Dayjs } from 'dayjs';

export interface Project {
  id?: number;
  key: string;
  name: string;
  description: string;
  startDate: Dayjs;
  endDate: Dayjs;
  customColor: string;
  leaderId: number;
}

export type NewProjectForm = {
  name: string;
  description: string;
  dateRange: [Dayjs, Dayjs];
  color: string;
};
