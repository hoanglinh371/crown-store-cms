import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Table, Space, Skeleton } from 'antd';
import { Pencil, Trash } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import { getSizes } from '@/services';

import AddEditSizeModal from './components/add-edit-size-modal';

const { Column } = Table;

export default function Size() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['sizes', { page }],
    queryFn: () => getSizes({ page }),
  });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-12">
      <div className="text-right">
        <AddEditSizeModal modalId="add-size-modal" />
      </div>

      <Table dataSource={data.data.sizes}>
        <Column title="#" dataIndex="id" />
        <Column title="Name" dataIndex="size_value" />
        <Column title="Width (cm)" dataIndex="width" />
        <Column title="Height (cm)" dataIndex="height" />
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
