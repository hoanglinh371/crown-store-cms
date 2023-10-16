import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Table, Space, Skeleton } from 'antd';
import { Pencil, Trash } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import { getCategories, deleteCategory } from '@/services';

import AddEditCategoryModal from './components/add-edit-category-modal';

const { Column } = Table;

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

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <AddEditCategoryModal modalId="add-category-modal" />
      </div>

      <Table dataSource={data.data.categories}>
        <Column title="#" dataIndex="id" />
        <Column title="Name" dataIndex="category_name" />
        <Column
          title="Image"
          dataIndex="category_image"
          render={(value) => <img src={value} alt="img" width="75" />}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Pencil size={16} color="green" />
              <Trash
                size={16}
                color="red"
                onClick={() => handleDeleteIconClick(record.id)}
              />
            </Space>
          )}
        />
      </Table>

      <DeleteModalTrigger
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        handler={() => deleteCategory(selectedId)}
      />
    </div>
  );
}
