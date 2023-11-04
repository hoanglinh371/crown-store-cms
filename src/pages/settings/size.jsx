import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Card, Divider, Button, Flex, Popconfirm } from 'antd';
import { toast } from 'sonner';

import { getSizes, delSize } from '@/services';

import AddEditSizeModal from './components/add-edit-size-modal';

export default function Size() {
  const queryClient = useQueryClient();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['sizes'],
    queryFn: () => getSizes(),
  });

  const { mutate } = useMutation({
    mutationFn: () => delSize(selectedSize.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['sizes']);
      toast.success('Delete Size');
    },
  });

  const onCancel = () => {
    setSelectedSize(undefined);
    setIsFormOpen(false);
  };

  const onConfirm = () => {
    mutate();
  };

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'size_value',
    },
    {
      key: 'width',
      title: 'Width',
      dataIndex: 'width',
    },
    {
      key: 'height',
      title: 'Height',
      dataIndex: 'height',
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedSize(record);
                setIsFormOpen(true);
              }}
            />
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="Delete Size"
            description="Are you sure to delete this size?"
            onConfirm={onConfirm}
          >
            <DeleteOutlined onClick={() => setSelectedSize(record)} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Flex vertical gap="large">
      <Card
        title={<span>Sizes</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Size
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={false}
        />
      </Card>

      <AddEditSizeModal
        open={isFormOpen}
        size={selectedSize}
        onCancel={onCancel}
      />
    </Flex>
  );
}
