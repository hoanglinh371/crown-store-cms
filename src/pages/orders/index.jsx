import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Table, Card, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getOrders } from '@/services';

function Orders() {
  const navigate = useNavigate();
  const [queryObj, setQueryObj] = useState({
    phone: '',
    page: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['orders', queryObj],
    queryFn: () => getOrders(queryObj),
  });

  const columns = [
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'order_date',
    },
    {
      key: 'total',
      title: 'Total',
      dataIndex: 'order_total',
    },
  ];

  const handleSearchOrderByUserPhone = (phone) => {
    setQueryObj({
      ...queryObj,
      phone,
    });
  };

  const handleTableChange = (page) => {
    setQueryObj({
      ...queryObj,
      page,
    });
  };

  const handleRowClick = (record) => navigate(`/orders/${record.id}`);

  return (
    <Flex vertical gap={32}>
      <Card title="Search Order">
        <Input.Search onSearch={handleSearchOrderByUserPhone} />
      </Card>

      <Card title="Orders">
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{
            total: data?.metadata.total,
            pageSize: data?.metadata.per_page,
            onChange: handleTableChange,
          }}
        />
      </Card>
    </Flex>
  );
}

export default Orders;
