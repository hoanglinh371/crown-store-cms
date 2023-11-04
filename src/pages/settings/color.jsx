import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Card, Divider, Button, Flex, Popconfirm } from 'antd';
import { toast } from 'sonner';

import { getColors, delColor } from '@/services/color';

import AddEditColorModal from './components/add-edit-color-modal';

export default function Color() {
  const queryClient = useQueryClient();
  const [selectedColor, setSelectedColor] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: () => getColors(),
  });

  const { mutate } = useMutation({
    mutationFn: () => delColor(selectedColor.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['colors']);
      toast.success('Delete Color');
    },
  });

  const onCancel = () => {
    setSelectedColor(undefined);
    setIsFormOpen(false);
  };

  const onConfirm = () => {
    mutate();
  };

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'color_name',
    },
    {
      key: 'color',
      title: 'Color',
      dataIndex: 'color_hex_code',
      render: (value) => (
        <div
          style={{
            backgroundColor: `${value}`,
            width: 28,
            height: 28,
            borderRadius: 99,
          }}
        />
      ),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedColor(record);
                setIsFormOpen(true);
              }}
            />
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="Delete color"
            description="Are you sure to delete this color?"
            onConfirm={onConfirm}
          >
            <DeleteOutlined onClick={() => setSelectedColor(record)} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Flex vertical gap="large">
      <Card
        title={<span>Colors</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Color
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

      <AddEditColorModal
        open={isFormOpen}
        color={selectedColor}
        onCancel={onCancel}
      />
    </Flex>
  );
}
