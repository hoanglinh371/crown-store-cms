import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table, Divider, Card, Button, Popconfirm, Flex, Image } from 'antd';
import { toast } from 'sonner';

import { getCategories, deleteCategory } from '@/services';

import AddEditCategoryModal from './components/add-edit-category-modal';

export default function CategoriesPage() {
  const [queryObj, setQueryObj] = useState({
    page: 1,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['categories', queryObj],
    queryFn: () => getCategories(queryObj),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteCategory(selectedCategory.id),
    onSuccess: () => {
      refetch();
      toast.success('Category deleted!');
    },
  });

  const handleTableChange = (page) => {
    setQueryObj({
      ...queryObj,
      page,
    });
  };

  const onCancel = () => {
    setSelectedCategory(undefined);
    setIsFormOpen(false);
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'category_name',
    },
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'category_image',
      render: (value) => (
        <Image src={value} alt="img" width={192} className="rounded-3xl" />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedCategory(record);
                setIsFormOpen(true);
              }}
            />
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="Delete category"
            description="Are you sure to delete this category?"
            onConfirm={mutate}
          >
            <DeleteOutlined onClick={() => setSelectedCategory(record)} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Flex vertical gap="large">
      <Card
        title={<span>Categories</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Category
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{
            total: data?.metadata.total,
            pageSize: data?.metadata.per_page,
            onChange: handleTableChange,
          }}
        />
      </Card>

      <AddEditCategoryModal
        open={isFormOpen}
        category={selectedCategory}
        refetch={refetch}
        onCancel={onCancel}
      />
    </Flex>
  );
}
