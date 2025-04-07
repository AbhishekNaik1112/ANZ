import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Card, Space } from 'antd';
import { UserOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import useSWR from 'swr';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const { Option } = Select;

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface Role {
  id: number;
  name: string;
}

const AdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const fetcher = (url: string) => axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);

  const { data: users = [], mutate: mutateUsers } = useSWR('/api/auth/users/', fetcher);
  const { data: roles = [] } = useSWR('/api/auth/roles/', fetcher);

  const processedUsers = users.map((user: any) => ({
    ...user,
    key: user.id,
    role: user.role || 'user'
  }));

  const handleDeleteUser = async (userId: number) => {
    try {
      await axios.delete(`/api/auth/users/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('User deleted successfully');
      mutateUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleUserSubmit = async (values: any) => {
    try {
      if (editingUser) {
        await axios.patch(`/api/auth/users/${editingUser.id}/`, values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('User updated successfully');
      } else {
        await axios.post('/api/auth/register/', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        message.success('User created successfully');
      }
      mutateUsers();
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
    } catch (error) {
      message.error(`Failed to ${editingUser ? 'update' : 'create'} user`);
    }
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: User) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button type="link" onClick={() => {
            setEditingUser(record);
            // Find the role object that matches the user's role name
            const userRole = roles.find((r: Role) => r.name === record.role);

            form.setFieldsValue({
              email: record.email,
              first_name: record.first_name,
              last_name: record.last_name,
              role: userRole?.id,
              password: '' // Clear password field when editing
            });
            setIsModalVisible(true);
          }}>Edit</Button>
          <Button type="link" danger onClick={() => handleDeleteUser(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Admin Dashboard</h2>
      <Card className="mb-16">
        <div className="button-group">
          <Button
            className="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingUser(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add User
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={processedUsers}
          rowKey="id"
          bordered
        />

        <Modal
          title={editingUser ? "Edit User" : "Create New User"}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleUserSubmit}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'Please enter valid email!' }
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: !editingUser, message: 'Please input password!' }]}
              extra={editingUser ? "Leave blank to keep current password" : ""}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: 'Please input first name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[{ required: true, message: 'Please input last name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select role!' }]}
            >
              <Select>
                {roles.map((role: Role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {editingUser ? "Update User" : "Create User"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default AdminDashboard;
