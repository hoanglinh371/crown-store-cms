import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Card, Divider, Button, Input, Flex, Popconfirm } from 'antd';
import { toast } from 'sonner';

import { delMaterial, getMaterials } from '@/services';

import AddEditMaterialModal from './components/add-edit-material-modal';

export default function Material() {
  const queryClient = useQueryClient();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: () => getMaterials(),
  });

  const { mutate } = useMutation({
    mutationFn: () => delMaterial(selectedMaterial.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['materials']);
      toast.success('Delete material');
    },
  });

  const onCancel = () => {
    setSelectedMaterial(undefined);
    setIsFormOpen(false);
  };

  const onConfirm = () => {
    mutate();
  };

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'material_name',
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'material_desc',
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedMaterial(record);
                setIsFormOpen(true);
              }}
            />
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="Delete material"
            description="Are you sure to delete this material?"
            onConfirm={onConfirm}
          >
            <DeleteOutlined onClick={() => setSelectedMaterial(record)} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Flex vertical gap="large">
      <Card
        title={<span>Materials</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Material
          </Button>
        }
      >
        <Table columns={columns} dataSource={data?.data} loading={isLoading} />
      </Card>

      <AddEditMaterialModal
        open={isFormOpen}
        material={selectedMaterial}
        onCancel={onCancel}
      />
    </Flex>
  );
}
