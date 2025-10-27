import React from 'react';
import { Spin, Typography, message } from 'antd';
import { TaskStatus, type Task } from '../common/tasks.types';
import CreateTaskModal from '../components/create-task-modal';
import { TasksBoardColumn } from '../components/task-board-column';
import { useGetProjectsTasks, useInvalidateProjectsTasks } from '../hooks/useGetProjectTasks';
import { orderTasksByStatus } from '../common/order-task-by-status';
import { useParams } from 'react-router-dom';
import { useUpdateTask } from '../hooks/useUpdateTask';

const { Title } = Typography;

const KanbanBoard: React.FC = () => {
  const { projectId } = useParams();
  const { data: tasks } = useGetProjectsTasks(projectId as string);
  const invalidateTasks = useInvalidateProjectsTasks();
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: updateTaskStatus } = useUpdateTask({
    onSuccess: () => {
      messageApi.success('Task updated successfully');
      invalidateTasks();
    },
    onError: (error: any) => {
      messageApi.error(`Error updated Task: ${error.message}`);
    },
  });

  const handleStatusUpdate = (taskId: string, status: TaskStatus) => {
    updateTaskStatus({ taskId, status });
    message.success(`Task status updated to "${status}"`);
  };

  if (!tasks) {
    return (
      <div>
        <span>Loading...</span>
        <Spin />
      </div>
    );
  }

  const tasksByStatus = tasks ? orderTasksByStatus(tasks) : [];

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {contextHolder}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="text-gray-800 m-0">
            Project Tasks Board
          </Title>
          <CreateTaskModal />
        </div>

        <div className="flex space-x-4 overflow-x-auto h-[calc(100vh-180px)]">
          {Object.entries(tasksByStatus).map(([status, taskList]) => (
            <TasksBoardColumn
              key={status}
              status={status as TaskStatus}
              tasks={taskList as Task[]}
              onDrop={handleStatusUpdate}
              onStatusChange={handleStatusUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
