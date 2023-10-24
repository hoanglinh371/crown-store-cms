import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Card, Divider, Button, Input, Flex, Popconfirm } from 'antd';
import { toast } from 'sonner';

import { getSizes, delSize } from '@/services';

import AddEditSizeModal from './components/add-edit-size-modal';

export default function Size() {
  const queryClient = useQueryClient();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [queryObj, setQueryObj] = useState({
    page: 1,
    search: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['sizes', queryObj],
    queryFn: () => getSizes(queryObj),
  });

  const { mutate } = useMutation({
    mutationFn: () => delSize(selectedSize.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['sizes']);
      toast.success('Delete Size');
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
    // <div className="space-y-12">
    //   <div className="text-right">
    //     <AddEditSizeModal modalId="add-size-modal" />
    //   </div>

    //   <Table dataSource={data.data.sizes}>
    //     <Column title="#" dataIndex="id" />
    //     <Column title="Name" dataIndex="size_value" />
    //     <Column title="Width (cm)" dataIndex="width" />
    //     <Column title="Height (cm)" dataIndex="height" />
    //     <Column
    //       title="Action"
    //       key="action"
    //       render={() => (
    //         <Space size="middle">
    //           <Pencil size={16} color="green" />
    //           <Trash
    //             size={16}
    //             color="red"
    //             onClick={() => setIsDeleteOpen(true)}
    //           />
    //         </Space>
    //       )}
    //     />
    //   </Table>

    //   <DeleteModalTrigger open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    // </div>
    <Flex vertical gap="large">
      <Card>
        <Input.Search onSearch={onSearch} placeholder="Search here.." />
      </Card>

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
          pagination={{ onChange }}
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
