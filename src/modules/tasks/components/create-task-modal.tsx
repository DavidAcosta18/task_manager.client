import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Spin,
  type FormProps,
} from 'antd';
import { Option } from 'antd/es/mentions';
import { useState } from 'react';
import { TaskPriority, TaskStatus, type NewTaskForm, type Task } from '../common/tasks.types';
import { PlusOutlined } from '@ant-design/icons';

import { useGetUserList } from '../hooks/useGetUsers';
import { useCreateTask } from '../hooks/useCreateTask';
import { useAuth } from '../../../hooks/use-auth';
import { useInvalidateProjectsTasks } from '../hooks/useGetProjectTasks';
import { useParams } from 'react-router-dom';

function CreateTaskModal() {
  const [messageApi, contextHolder] = message.useMessage();
  const { projectId } = useParams();
  const { data: members, isLoading } = useGetUserList();
  const { user } = useAuth();
  const [form] = Form.useForm<NewTaskForm>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invalidateTask = useInvalidateProjectsTasks();
  const { mutate: createTask } = useCreateTask({
    onSuccess: () => {
      invalidateTask();
      messageApi.success('Task created successfully');
    },
    onError: (error: any) => {
      messageApi.error(`Error creating Task: ${error.message}`);
    },
  });

  const onFinish: FormProps<NewTaskForm>['onFinish'] = values => {
    const newTask: Task = {
      title: values.title,
      description: values.description,
      status: TaskStatus.TODO,
      priority: values.priority,
      dueDate: values.dueDate,
      assigneeId: values.assigneeId,
      createdBy: user?.id,
      projectId,
    };

    createTask(newTask);
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        size="large"
      >
        Create Task
      </Button>

      <Modal
        title="Create New Task"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="new_task_form"
          onFinish={onFinish}
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a task title!' }]}
          >
            <Input placeholder="E.g., Implement JWT Authentication" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Detailed steps or context for the task." />
          </Form.Item>

          <Space className="w-full mb-4" size="middle">
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: 'Select priority!' }]}
              className="flex-1"
            >
              <Select placeholder="Select Priority">
                <Option value={TaskPriority.HIGH}>High</Option>
                <Option value={TaskPriority.LOW}>Medium</Option>
                <Option value={TaskPriority.MEDIUM}>Low</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: 'Select due date!' }]}
              className="flex-1"
            >
              <DatePicker className="w-full" format="MMM DD, YYYY" />
            </Form.Item>
          </Space>

          <Form.Item
            name="assigneeId"
            label="Assignee"
            rules={[{ required: true, message: 'Assign a member!' }]}
          >
            <Select placeholder="Assign to a member">
              {isLoading ? (
                <div>
                  <p>Loading members...</p>
                  <Spin />
                </div>
              ) : (
                members?.map(member => (
                  <Option key={member.id as any} value={member.id as any}>
                    <span>
                      {' '}
                      {member?.firstName} {member?.lastName}
                    </span>
                    <span> {member?.email}</span>
                  </Option>
                ))
              )}
            </Select>
          </Form.Item>

          <Form.Item className="mt-6 mb-0 text-right">
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Create Task
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateTaskModal;
