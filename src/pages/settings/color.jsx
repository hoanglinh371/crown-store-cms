import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Table, Space, Skeleton } from 'antd';
import { Pencil, Trash } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import { getColors } from '@/services/color';

import AddEditColorModal from './components/add-edit-color-modal';

const { Column } = Table;

export default function Color() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['colors', { page }],
    queryFn: () => getColors({ page }),
  });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-12">
      <div className="text-right">
        <AddEditColorModal modalId="add-color-modal" />
      </div>
      <Table dataSource={data.data.colors}>
        <Column title="#" dataIndex="id" />
        <Column title="Name" dataIndex="color_name" />
        <Column
          title="Color"
          dataIndex="color_hex_code"
          render={(value) => (
            <div
              style={{
                backgroundColor: `${value}`,
                width: 28,
                height: 28,
                borderRadius: 99,
              }}
            />
          )}
        />
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
