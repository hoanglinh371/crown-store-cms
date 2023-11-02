import React, { useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table, Card, Button, Divider, Popconfirm } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import { deleteBrand, getBrands } from '@/services';

import AddEditBrandModal from './components/add-edit-brand-modal';

export default function BrandsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState();

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['brands', { page }],
    queryFn: () => getBrands({ page }),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteBrand(selectedBrand.id),
    onSuccess: () => {
      refetch();
      toast.success('Category deleted!');
    },
  });

  const onCancel = () => {
    setSelectedBrand(undefined);
    setIsFormOpen(false);
  };

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'brand_name',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'brand_email',
    },
    {
      key: 'phone',
      title: 'Phone',
      dataIndex: 'brand_phone',
    },
    {
      key: 'address',
      title: 'Address',
      dataIndex: 'brand_address',
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedBrand(record);
                setIsFormOpen(true);
              }}
            />
          </span>
          <Divider type="vertical" />
          <span>
            <Popconfirm
              title="Delete brand"
              description="Are you sure to delete this brand?"
              onConfirm={mutate}
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </span>
      ),
    },
  ];

  return (
    <>
      <Card
        title={<span>Brands</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Brand
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
            onChange: (_page) => _page + 1,
          }}
        />
      </Card>

      <AddEditBrandModal
        open={isFormOpen}
        onCancel={onCancel}
        brand={selectedBrand}
      />

      <DeleteModalTrigger open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    </>
  );
}
