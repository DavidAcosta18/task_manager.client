import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
  Tag,
  ColorPicker,
  message,
} from 'antd';
import { PlusOutlined, SearchOutlined, ProjectOutlined } from '@ant-design/icons';
import type { TableProps, FormProps } from 'antd';

import type { NewProjectForm, Project } from '../../common/project.types';
import { useCreateProjects } from '../hooks/useCreateProjects';
import { useAuth } from '../../../../hooks/use-auth';
import { useGetProjects, useInvalidateGetProjects } from '../hooks/ueGetProjects';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ProjectPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { data: projects = [], isLoading } = useGetProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<NewProjectForm>();
  const [searchText, setSearchText] = useState('');
  const invalidate = useInvalidateGetProjects();
  const { mutate: createProject } = useCreateProjects({
    onSuccess: () => {
      messageApi.success('Proyecto creado exitosamente');
      invalidate();
    },
    onError: (error: any) => {
      messageApi.error(`Error al crear el proyecto: ${error.message}`);
    },
  });

  const { user } = useAuth();
  const navigationApi = useNavigate();

  const columns: TableProps<Project>['columns'] = [
    {
      title: 'Projects',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Project) => (
        <Space>
          <Tag color={record.customColor} icon={<ProjectOutlined />} />
          <Button
            type="link"
            onClick={() => {
              messageApi.info(`Navegando a ${text}`);
              navigationApi(`/projects/tasks/${record.id}`);
            }}
            className="p-0"
          >
            {text}
          </Button>
        </Space>
      ),
      filteredValue: searchText ? [searchText] : [],
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toString().toLowerCase()) ||
        record.description.toLowerCase().includes(value.toString().toLowerCase()),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: any) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => a.endDate.valueOf() - b.endDate.valueOf(),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button size="small">Edit</Button>
          <Button
            size="small"
            danger
            onClick={() => messageApi.warning(`Archivando ${record.name}...`)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onFinish: FormProps<NewProjectForm>['onFinish'] = values => {
    const [startDate, endDate] = values.dateRange;
    const hexColor =
      values.color && (values.color as any).toHexString
        ? (values.color as any).toHexString()
        : '#1677ff';

    const newProject: Project = {
      key: (projects.length + 1).toString(),
      name: values.name,
      description: values.description,
      startDate: startDate,
      endDate: endDate,
      customColor: hexColor,
      leaderId: user?.id || 0,
    };
    createProject(newProject);
    form.resetFields();
    setIsModalOpen(false);

    messageApi.success(`Proyecto "${newProject.name}" creado exitosamente.`);
  };

  const SearchComponent = (
    <Input
      placeholder="Buscar proyectos por nombre o descripción"
      prefix={<SearchOutlined className="text-gray-400" />}
      value={searchText}
      onChange={e => setSearchText(e.target.value)}
      className="max-w-xs md:max-w-sm"
    />
  );

  if (!projects) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {contextHolder}
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <Title level={2} className="text-gray-800 m-0">
            My Projects
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            size="large"
          >
            Create New Project
          </Button>
        </div>

        <div className="mb-4 flex justify-start">{SearchComponent}</div>

        <Table
          columns={columns}
          dataSource={projects || []}
          rowKey="key"
          pagination={{ pageSize: 10 }}
          className="shadow-md rounded-lg"
          loading={isLoading}
        />

        <Modal
          title="Crear Nuevo Proyecto"
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
            name="new_project_form"
            onFinish={onFinish}
            initialValues={{ color: '#1677ff' }}
          >
            <Form.Item
              name="name"
              label="Nombre del Proyecto"
              rules={[{ required: true, message: '¡Por favor, ingresa el nombre!' }]}
            >
              <Input placeholder="Ej: TaskFlow MVP Frontend" />
            </Form.Item>

            <Form.Item name="description" label="Descripción">
              <Input.TextArea rows={3} placeholder="Breve descripción del proyecto" />
            </Form.Item>

            <Form.Item
              name="dateRange"
              label="Projects Date Range"
              rules={[{ required: true, message: '¡Por favor, selecciona las fechas!' }]}
            >
              <DatePicker.RangePicker className="w-full" format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              name="customColor"
              label="Color Personalizado"
              tooltip="A color to represent the project"
            >
              <ColorPicker />
            </Form.Item>

            <Form.Item className="mt-6 mb-0 text-right">
              <Space>
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Create Project
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProjectPage;
