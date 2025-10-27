import Title from 'antd/es/typography/Title';
import type { Task, TaskStatus } from '../common/tasks.types';
import { Tag } from 'antd';
import { TaskCard } from './task-card';

export const TasksBoardColumn: React.FC<{
  status: TaskStatus;
  tasks: Task[];
  onDrop: (taskId: string, newStatus: TaskStatus) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}> = ({ status, tasks, onDrop, onStatusChange }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-blue-50/50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-blue-50/50');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-50/50');
    const taskId = e.dataTransfer.getData('taskId');
    onDrop(taskId, status);
  };

  return (
    <div
      className="flex-1 min-w-[280px] p-2 bg-gray-100/70 rounded-lg shadow-inner flex flex-col h-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Title level={4} className="text-gray-700 p-2 m-0 flex justify-between items-center">
        {status}
        <Tag color="blue" className="text-sm font-medium">
          {tasks.length}
        </Tag>
      </Title>
      <div className="overflow-y-auto pt-2 pb-4 space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
};
