import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, Card, Divider, Button, Input, Flex, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

import { toast } from 'sonner';

import { deleteProduct, getProducts } from '@/services';

import AddEditProductModel from './components/add-edit-product-modal';

export default function ProductsPage() {
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [queryObj, setQueryObj] = useState({
    page: 1,
    search: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products', queryObj],
    queryFn: () => getProducts(queryObj),
  });

  const { mutate } = useMutation({
    mutationFn: () => deleteProduct(selectedProduct.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Deleted product!');
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
    setSelectedProduct(undefined);
    setIsFormOpen(false);
  };

  const onConfirm = () => {
    mutate();
  };

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'product_name',
      render: (_, record) => (
        <Link to={`/products/${record.id}`}>{record.product_name}</Link>
      ),
    },
    {
      key: 'description',
      title: 'Description',
      dataIndex: 'product_desc',
    },
    {
      key: 'image',
      title: 'image',
      dataIndex: 'product_image',
      render: (value) => (
        <img src={value} alt="img" width={192} className="rounded-3xl" />
      ),
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedProduct(record);
                setIsFormOpen(true);
              }}
            />
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="Delete product"
            description="Are you sure to delete this product?"
            onConfirm={onConfirm}
          >
            <DeleteOutlined onClick={() => setSelectedProduct(record)} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <Flex vertical gap="large">
      <Card>
        <Input.Search onSearch={onSearch} placeholder="Search here..." />
      </Card>

      <Card
        title={<span>Products</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Product
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
            onChange,
          }}
        />
      </Card>

      <AddEditProductModel
        open={isFormOpen}
        product={selectedProduct}
        onCancel={onCancel}
      />
    </Flex>
  );
}
