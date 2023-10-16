import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Table, Space, Skeleton } from 'antd';
import { Pencil, Trash } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import { getMaterials } from '@/services';

import AddEditMaterialModal from './components/add-edit-material-modal';

const { Column } = Table;

export default function Material() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['materials', { page }],
    queryFn: () => getMaterials({ page }),
  });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-12">
      <div className="text-right">
        <AddEditMaterialModal modalId="add-material-modal" />
      </div>
      <Table dataSource={data.data.materials}>
        <Column title="#" dataIndex="id" />
        <Column title="name" dataIndex="material_name" />
        <Column title="Description" dataIndex="material_desc" />
        <Column
          title="Action"
          key="action"
          render={() => (
            <Space size="middle">
              <Pencil size={16} color="green" />
              <Trash
                size={16}
                color="red"
                onClick={() => setIsDeleteOpen(true)}
              />
            </Space>
          )}
        />
      </Table>

      <DeleteModalTrigger open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    </div>
  );
}
