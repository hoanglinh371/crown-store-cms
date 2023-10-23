import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table, Divider, Card, Button, Popconfirm, Flex } from 'antd';
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
        <img src={value} alt="img" width={192} className="rounded-3xl" />
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

      <table className="table table-zebra table-lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.data.categories.map((category, index) => (
            <tr key={index} className="hover">
              <th>{category.id}</th>
              <td>{category.category_name}</td>
              <td>
                <div>
                  <img
                    src={category.category_image}
                    alt="category_image"
                    className="h-[100px] w-[75px] object-cover"
                  />
                </div>
              </td>
              <td>
                <AddEditCategoryModal
                  modalId={`category-${category.id}`}
                  category={category}
                />
              </td>
              <td>
                <DeleteModalTrigger modalId="delete-category-modal" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pathname={location.pathname}
        totalPages={data.pagination.total_pages}
        currentPage={data.pagination.current_page}
      />
    </Flex>
  );
}
