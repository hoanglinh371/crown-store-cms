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
  const [queryObj, setQueryObj] = useState({
    page: 1,
    search: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['materials', queryObj],
    queryFn: () => getMaterials(queryObj),
  });

  const { mutate } = useMutation({
    mutationFn: () => delMaterial(selectedMaterial.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['materials']);
      toast.success('Delete material');
    },
  });

  const onSearch = (search) => {
    setQueryObj({
      ...queryObj,
      search,
    });
  };

  const onChange = (page) => {
    setQueryObj({
      ...queryObj,
      page,
    });
  };

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
    // <div className="space-y-12">
    //   <div className="text-right">
    //     <AddEditMaterialModal modalId="add-material-modal" />
    //   </div>
    //   <Table dataSource={data.data.materials}>
    //     <Column title="#" dataIndex="id" />
    //     <Column title="name" dataIndex="material_name" />
    //     <Column title="Description" dataIndex="material_desc" />
    //     <Column
    //       title="Action"
    //       key="action"
    //       render={() => (
    //         <Space size="middle">
    //           <Pencil size={16} color="green" />
    //           <Trash
    //             size={16}
    //             color="red"
    //             onClick={() => setIsDeleteOpen(true)}
    //           />
    //         </Space>
    //       )}
    //     />
    //   </Table>

    //   <DeleteModalTrigger open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
    // </div>
    <Flex vertical gap="large">
      <Card>
        <Input.Search onSearch={onSearch} placeholder="Search here.." />
      </Card>

      <Card
        title={<span>Materials</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Material
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data}
          loading={isLoading}
          pagination={{
            onChange,
          }}
        />
      </Card>

      <AddEditMaterialModal
        open={isFormOpen}
        product={selectedMaterial}
        onCancel={onCancel}
      />
    </Flex>
  );
}
