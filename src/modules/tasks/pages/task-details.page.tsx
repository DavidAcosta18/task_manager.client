import React from 'react';
import { Typography, Space, Tag, Divider, Button, Form, Input, List, Avatar, message } from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  CommentOutlined,
  SendOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetTaskDetails, useInvalidateGetTaskDetails } from '../hooks/useGetTaskDetails';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import { TaskStatus, type TaskPriority, type TaskComment } from '../common/tasks.types';
import { useCreateComment } from '../hooks/useCreateComment';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface NewCommentForm {
  content: string;
}

const PRIORITY_CONFIG: Record<TaskPriority, { color: string; text: string }> = {
  HIGH: { color: 'red', text: 'High' },
  MEDIUM: { color: 'orange', text: 'Medium' },
  LOW: { color: 'green', text: 'Low' },
};

const TaskDetails: React.FC = () => {
  const [form] = Form.useForm<NewCommentForm>();
  const { taskId } = useParams();
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const invalidateTask = useInvalidateGetTaskDetails();

  const { data: task, isLoading } = useGetTaskDetails(taskId as string);

  const { mutate: createComment } = useCreateComment({
    onSuccess: () => {
      messageApi.success('Comment added successfully');
      invalidateTask();
    },
    onError: (error: any) => {
      messageApi.error(`Error Comment: ${error.message}`);
    },
  });

  if (isLoading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }
  const comments: TaskComment[] = task?.comments || [];
  const assignee = comments.find(m => m.id === task.assigneeId);
  const priority = PRIORITY_CONFIG[task.priority as TaskPriority];

  const handlePostComment = (values: NewCommentForm) => {
    const newComment: TaskComment = {
      userId: user?.id as number,
      content: values.content,
      createdAt: dayjs(),
    };

    createComment({ ...newComment, taskId: task?.id });
    form.resetFields();
    message.success('Comment posted!');
  };

  return (
    <div className="bg-gray--50 max-h-screen p-4 sm:p-8">
      {contextHolder}
      <div className="max-w-4xl mx-auto">
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Text strong>Status:</Text>
            <Tag
              color={task.status === TaskStatus.DONE ? 'green' : 'blue'}
              className="ml-2 capitalize"
            >
              {task.status.replace('-', ' ')}
            </Tag>
            <Divider />

            <Space wrap size="middle" className="mb-4">
              <Tag icon={<UserOutlined />}>
                **Assignee:**{' '}
                {`${assignee?.author?.email} ${assignee?.author?.firstName}` || 'Unassigned'}
              </Tag>
              <Tag icon={<ExclamationCircleOutlined />} color={priority.color}>
                **Priority:** {priority.text}
              </Tag>
              <Tag icon={<ClockCircleOutlined />}>
                **Due Date:** {new Date(task.dueDate as string)?.toLocaleDateString()}
              </Tag>
            </Space>

            <Title level={5}>Description</Title>
            <Text className="text-gray-700 whitespace-pre-line">{task.description}</Text>
          </div>

          <Divider orientation="left" className="!mt-2 !mb-2">
            <Title level={4} className="m-0 flex items-center">
              <CommentOutlined className="mr-2" /> Comments ({comments.length})
            </Title>
          </Divider>

          <div className="bg-gray-50 p-4 rounded-lg max-h-[40vh] overflow-y-auto border border-gray-200">
            {comments.length === 0 ? (
              <Text italic type="secondary">
                No comments yet. Be the first to add one!
              </Text>
            ) : (
              <List
                dataSource={comments.sort(
                  (a, b) =>
                    new Date(a.createdAt as string).valueOf() -
                    new Date(b.createdAt as string).valueOf(),
                )}
                renderItem={comment => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                      }
                      title={
                        <Space>
                          <Text strong>{comment.author?.firstName}</Text>
                          <Text type="secondary" style={{ fontSize: '0.8em' }}>
                            {new Date(comment.createdAt as any).toTimeString()}
                          </Text>
                        </Space>
                      }
                      description={<Text className="text-gray-700">{comment.content}</Text>}
                    />
                  </List.Item>
                )}
              />
            )}
          </div>

          <Divider className="!mt-0 !mb-4" />

          <Title level={5}>Write a Comment</Title>
          <Form form={form} name="new_comment_form" onFinish={handlePostComment}>
            <Form.Item
              name="content"
              rules={[{ required: true, message: 'Comment cannot be empty.' }]}
              className="mb-2"
            >
              <TextArea rows={3} placeholder={`Write a comment as ${user?.firstName}...`} />
            </Form.Item>

            <Form.Item className="text-right mb-0">
              <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                Post Comment
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default TaskDetails;
