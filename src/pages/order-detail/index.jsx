import React from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Divider, Table, Card } from 'antd';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { getOrdersDetail } from '@/services/order';

function OrderDetail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['order', { id }],
    queryFn: () => getOrdersDetail(id),
  });

  /* eslint-disable */
  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'product_item',
      render: (product_item) => product_item.product.product_name,
    },
    {
      key: 'color',
      title: 'Color',
      dataIndex: 'product_item',
      render: (product_item) => (
        <div
          style={{ backgroundColor: product_item.color.color_hex_code }}
          className="h-6 w-6"
        />
      ),
    },
    {
      key: 'size',
      title: 'Size',
      dataIndex: 'product_item',
      render: (product_item) => product_item.size.size_value,
    },
    {
      key: 'qty',
      title: 'Quantity',
      dataIndex: 'qty',
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
    },
    {
      key: 'total',
      title: 'Total',
      render: (_, record) => record.price * record.qty,
    },
    {
      key: 'action',
      title: 'Action',
      render: () => (
        <span>
          <span>
            <EditOutlined />
          </span>
          <Divider type="vertical" />
          <span>
            <DeleteOutlined />
          </span>
        </span>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <>
            <h1 className=" my-5 flex text-2xl font-bold">
              Thông tin đơn hàng <p className="ml-3">#{data?.data?.id}</p>
            </h1>

            <p>
              Ngày đặt hàng:
              {data?.data?.order_date}
            </p>
            <p>
              Tên người nhận: {data?.data?.user && data?.data?.user.first_name}
              {data?.data?.user && data?.data?.user.last_name}
            </p>
            <p>
              Email:
              {data?.data?.user && data?.data?.user.email}
            </p>
            <p>
              Số điện thoại:
              {data?.data?.user && data?.data?.user.phone}
            </p>
            <p>
              Địa chỉ:
              {data?.data?.user && data?.data?.user.address}
            </p>
          </>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data?.order_lines}
          loading={isLoading}
        />
      </Card>
      <div className="mr-16 mt-10 text-right">
        <button
          type="button"
          className="btn btn-accent btn-active mr-5"
          onClick={() => toast.success('Success')}
        >
          Order
        </button>
        <button
          type="button"
          className="btn btn-accent btn-active"
          onClick={() => toast.error('Fail')}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default OrderDetail;
