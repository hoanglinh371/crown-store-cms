import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Card, Divider, Button, Input, Flex, Popconfirm } from 'antd';
import { toast } from 'sonner';
import { getColors, delColor } from '@/services/color';

import AddEditColorModal from './components/add-edit-color-modal';

export default function Color() {
  const queryClient = useQueryClient();
  const [selectedColor, setSelectedColor] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [queryObj, setQueryObj] = useState({
    page: 1,
    search: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['colors', queryObj],
    queryFn: () => getColors(queryObj),
  });

  const { mutate } = useMutation({
    mutationFn: () => delColor(selectedColor.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['colors']);
      toast.success('Delete Color');
    },
  });

  const onSearch = (search) => {
    setQueryObj({
      ...queryObj,
      search,
    });
  };

  const onChange = (page) => {
    setQueryObj({
      ...queryObj,
      page,
    });
  };

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
      <Card>
        <Input.Search onSearch={onSearch} placeholder="Search here..." />
      </Card>

      <Card
        title={<span>Colors</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Color
          </Button>
        }
      >
        <Table columns={columns} dataSource={data?.data} loading={isLoading} />
      </Card>

      <AddEditColorModal
        open={isFormOpen}
        color={selectedColor}
        onCancel={onCancel}
      />
    </Flex>
  );
}
