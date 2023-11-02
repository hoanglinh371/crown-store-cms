import React, { useState } from 'react';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Card,
  Divider,
  Button,
  Input,
  Flex,
  Popconfirm,
  Image,
} from 'antd';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { getProductsDetail, deleteProductDetail } from '@/services';

import AddProductDetailModal from './components/add-product-detail-modal';

export default function ProductDetail() {
  const queryClient = useQueryClient();
  const [selectedProductsDetail, setSelectedProductsDetail] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [queryObj, setQueryObj] = useState({
    page: 1,
    search: '',
  });
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['products', id, queryObj],
    queryFn: () => getProductsDetail(id, queryObj),
  });
  const { mutate } = useMutation({
    mutationFn: () => deleteProductDetail(selectedProductsDetail.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['product-items']);
      toast.success('Deleted product item!');
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
    setSelectedProductsDetail(undefined);
    setIsFormOpen(false);
  };

  const onConfirm = () => {
    mutate();
  };
  const columns = [
    {
      key: 'id',
      title: 'Id',
      dataIndex: 'product_id',
    },
    {
      key: 'sku',
      title: 'Sku',
      dataIndex: 'sku',
    },
    {
      key: 'stock',
      title: 'Stock',
      dataIndex: 'qty_in_stock',
    },
    {
      key: 'image',
      title: 'Image',
      dataIndex: 'product_item_image',
      render: (value) => (
        <Image src={value} alt="img" width={192} className="rounded-3xl" />
      ),
    },
    {
      key: 'color',
      title: 'Color',
      dataIndex: 'color',
      render: (value) => (
        <div
          style={{
            backgroundColor: `${value.color_hex_code}`,
            width: 28,
            height: 28,
            borderRadius: 99,
          }}
        />
      ),
    },
    {
      key: 'size',
      title: 'Size',
      dataIndex: 'size',
      render: (size) => size.size_value,
    },
    {
      key: 'material',
      title: 'Material',
      dataIndex: 'material',
      render: (material) => material.material_name,
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, record) => (
        <span>
          <span>
            <EditOutlined
              onClick={() => {
                setSelectedProductsDetail(record);
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
            <DeleteOutlined onClick={() => setSelectedProductsDetail(record)} />
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
        title={<span>Product Items</span>}
        extra={
          <Button type="primary" onClick={() => setIsFormOpen(true)}>
            Add Product
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={data?.data.product_items}
          loading={isLoading}
          pagination={{
            onChange,
          }}
        />
      </Card>

      <AddProductDetailModal
        open={isFormOpen}
        product-item={selectedProductsDetail}
        onCancel={onCancel}
      />
    </Flex>
  );
}
