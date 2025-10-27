import { Button, Select, Space, Tag } from 'antd';
import Card from 'antd/es/card/Card';
import { ClockCircleOutlined, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { TaskPriority, TaskStatus, type Task } from '../common/tasks.types';

const PRIORITY_CONFIG: Record<TaskPriority, { color: string; text: string }> = {
  HIGH: { color: 'red', text: 'High' },
  MEDIUM: { color: 'orange', text: 'Medium' },
  LOW: { color: 'green', text: 'Low' },
};

export const TaskCard: React.FC<{
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}> = ({ task, onStatusChange }) => {
  const assignee = task.assignee;
  const priority = PRIORITY_CONFIG[task.priority];

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id as string);
  };

  return (
    <Card
      title={task.title}
      size="small"
      draggable
      onDragStart={handleDragStart}
      className="mb-3 cursor-grab shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      extra={
        <Button size="small" type="link" className="p-0">
          View
        </Button>
      }
    >
      <div className="space-y-2 text-sm">
        <p className="text-gray-600 line-clamp-2">{task.description}</p>
        <Space wrap size={4}>
          <Tag color={priority.color} icon={<ExclamationCircleOutlined />}>
            {priority.text}
          </Tag>
          <Tag icon={<UserOutlined />}>
            {assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unassigned'}
          </Tag>
          <Tag icon={<ClockCircleOutlined />}>
            Due: {new Date(task.dueDate as string).toLocaleDateString()}
          </Tag>
        </Space>
      </div>

      <div className="mt-3">
        <Select
          value={task.status}
          onChange={newStatus => onStatusChange(task?.id as string, newStatus)}
          style={{ width: '100%' }}
          size="small"
          placeholder="Change Status"
        >
          {Object.keys(TaskStatus).map(status => (
            <Select.Option key={status} value={status}>
              Move to {status}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Card>
  );
};
