import { Dayjs } from 'dayjs';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | Dayjs | string;
  assigneeId: number;
  createdBy?: number;
  projectId?: string;
  assignee?: Member;
}

export interface NewTaskForm {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: Date | Dayjs;
  assigneeId: number;
}

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
