import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Table, Card, Button, Flex, Image } from 'antd';
import { useParams } from 'react-router-dom';

import { getProductsDetail } from '@/services';

import AddProductDetailModal from './components/add-product-detail-modal';

export default function ProductDetail() {
  const [selectedProductsDetail, setSelectedProductsDetail] = useState();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['products', { id }],
    queryFn: () => getProductsDetail(id),
  });

  const onCancel = () => {
    setSelectedProductsDetail(undefined);
    setIsFormOpen(false);
  };

  const columns = [
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
  ];

  return (
    <Flex vertical gap="large">
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
          pagination={false}
        />
      </Card>

      <AddProductDetailModal
        open={isFormOpen}
        productItem={selectedProductsDetail}
        onCancel={onCancel}
      />
    </Flex>
  );
}
