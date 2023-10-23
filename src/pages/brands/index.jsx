import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Space, Table, Skeleton } from 'antd';
import { Pencil, Trash } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import { getBrands } from '@/services';

import AddEditBrandModal from './components/add-edit-brand-modal';

const { Column } = Table;

export default function BrandsPage() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['brands', { page }],
    queryFn: () => getBrands({ page }),
  });

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
        <AddEditBrandModal modalId="add-brand-modal" />
      </div>
      <Table dataSource={data.data.brands} pagination={{}}>
        <Column title="#" dataIndex="id" />
        <Column title="Name" dataIndex="brand_name" />
        <Column title="Email" dataIndex="brand_email" />
        <Column title="Phone" dataIndex="brand_phone" />
        <Column title="Address" dataIndex="brand_address" />
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
