import React from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Table, Space, Divider, Card, Button } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { getUsers } from '@/services';

function UsersPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const page = searchParams.get('page') ?? 1;

  const handleDeleteIconClick = () => {};

  const { data, isLoading } = useQuery({
    queryKey: ['users', { page, search }],
    queryFn: () => getUsers({ page, search }),
  });

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <span>{`${record.first_name} ${record.last_name}`}</span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <EditOutlined />
          <Divider type="vertical" />
          <DeleteOutlined onClick={() => handleDeleteIconClick(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-12">
      <Card>
        <form>
          <input
            type="search"
            name="search"
            placeholder="Search here..."
            className="input input-bordered w-full max-w-sm"
          />
        </form>
      </Card>

      <Card title="Users">
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={data?.data.users}
        />
      </Card>
    </div>
  );
}

export default UsersPage;
