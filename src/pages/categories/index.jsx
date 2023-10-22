import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Table, Space, Divider, Card, Button } from 'antd';
import { useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import { getCategories, deleteCategory } from '@/services';

import AddEditCategoryModal from './components/add-edit-category-modal';

export default function CategoriesPage() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('search') ?? '';

  const { data, isLoading } = useQuery({
    queryKey: ['categories', { page, search }],
    queryFn: () => getCategories({ page, search }),
  });

  const handleDeleteIconClick = (id) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
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
      render: (value) => <img src={value} alt="img" width={192} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <EditOutlined />
          <Divider type="vertical" />
          <DeleteOutlined onClick={() => handleDeleteIconClick(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="Category"
        extra={<Button type="primary">Add Category</Button>}
      >
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={data?.data.categories}
        />
      </Card>

      <DeleteModalTrigger
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        handler={() => deleteCategory(selectedId)}
      />
    </div>
  );
}
