import React, { useContext, useEffect, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Select, Upload, Button, Modal } from 'antd';
import { toast } from 'sonner';

import { ConfigContext } from '@/contexts/config.context';
import { createProduct, updateProduct } from '@/services';
import { getBase64 } from '@/utils';

export default function AddEditProductModel({ product, open, onCancel }) {
  const queryClient = useQueryClient();

  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const { configs } = useContext(ConfigContext);

  const mutation = useMutation({
    mutationFn: product
      ? (values) => updateProduct(values, product.id)
      : createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onCancel();
      toast.success(product ? 'Updated product!' : 'Created product!');
    },
    onError: () => {
      toast.error('Somethings went wrong. Please check again!');
    },
  });

  const onFinish = async (values) => {
    mutation.mutate(values);
  };

  const onChange = async ({ file, newFileList }) => {
    setFileList(newFileList);
    const newFile = await getBase64(file.originFileObj);
    form.setFieldValue('product_image', newFile);
  };

  useEffect(() => {
    if (product) {
      setFileList([
        {
          url: product.product_image,
        },
      ]);
    }
  }, [product]);

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={() => {
        onCancel();
        setFileList([]);
      }}
      title={product ? 'Edit Product' : 'Create product'}
      footer={[
        <Button
          onClick={() => {
            onCancel();
            setFileList([]);
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="product-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="product-form"
        name="product-form"
        preserve={false}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        initialValues={{ ...product }}
      >
        <Form.Item
          label={<span>Name</span>}
          name="product_name"
          rules={[
            {
              required: true,
              message: 'Please input product name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="product_desc" label={<span>Description</span>}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label={<span>Image</span>}
          name="product_image"
          rules={[
            {
              required: true,
              message: 'Please upload product image!',
            },
          ]}
        >
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture"
            fileList={fileList}
            onChange={onChange}
          >
            {fileList?.length && fileList?.length >= 1 ? null : (
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label={<span>Category</span>}
          name="category_id"
          rules={[
            {
              required: true,
              message: 'Please select product category!',
            },
          ]}
        >
          <Select options={configs?.categories} />
        </Form.Item>
        <Form.Item
          label={<span>Brand</span>}
          name="brand_id"
          rules={[
            {
              required: true,
              message: 'Please select product brand!',
            },
          ]}
        >
          <Select options={configs?.brands} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
