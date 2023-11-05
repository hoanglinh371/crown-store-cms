import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Table, Space, Divider, Card, Input } from 'antd';

import { getUsers } from '@/services';

function UsersPage() {
  const [queryObj, setQueryObj] = useState({
    page: 1,
    search: '',
  });

  const handleDeleteIconClick = () => {};

  const { data, isLoading } = useQuery({
    queryKey: ['users', queryObj],
    queryFn: () => getUsers(queryObj),
  });

  const handleTableChange = (page) => {
    setQueryObj({
      ...queryObj,
      page,
    });
  };

  const handleSearch = (search) => {
    setQueryObj({
      ...queryObj,
      search,
    });
  };

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
  ];

  return (
    <div className="space-y-12">
      <Card>
        <Input.Search
          onSearch={handleSearch}
          placeholder="Search by phone number"
        />
      </Card>

      <Card title="Users">
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={data?.data}
          pagination={{
            total: data?.metadata.total,
            pageSize: data?.metadata.per_page,
            onChange: (page) => setQueryObj({ ...queryObj, page }),
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
}

export default UsersPage;
