import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Table, Card } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getOrders } from '@/services';

function Orders() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => getOrders({ page }),
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

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <form>
          <input
            type="search"
            name="search"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </form>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          onRow={(record) => ({
            onClick: () => navigate(`/orders/${record.id}`),
          })}
          pagination={{
            total: data?.metadata.total,
            pageSize: data?.metadata.per_page,
            onChange: (_page) => _page + 1,
          }}
        />
      </Card>
    </div>
  );
}

export default Orders;
