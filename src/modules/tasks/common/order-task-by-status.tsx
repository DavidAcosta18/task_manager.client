import { TaskStatus, type Task } from './tasks.types';

export function orderTasksByStatus(tasks: Task[]): Record<TaskStatus, Task[]> {
  return tasks.reduce(
    (acc: any, task: Task) => {
      acc[task.status].push(task);
      return acc;
    },
    {
      [TaskStatus.TODO]: [] as Task[],
      [TaskStatus.IN_PROGRESS]: [] as Task[],
      [TaskStatus.DONE]: [] as Task[],
    } as Record<TaskStatus, Task[]>,
  );
}
