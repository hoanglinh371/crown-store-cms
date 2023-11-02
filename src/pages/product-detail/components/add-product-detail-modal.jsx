import React, { useState, useContext, useEffect } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Select, InputNumber, Modal, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { ConfigContext } from '@/contexts/config.context';
import { createProductDetail } from '@/services';
import { getBase64 } from '@/utils';

function AddProductDetailModal({ open, onCancel, productItem }) {
  const [fileList, setFileList] = useState([]);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { id } = useParams();
  const { configs } = useContext(ConfigContext);

  const { mutate } = useMutation({
    mutationFn: (value) => createProductDetail(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', id] });
      toast.success('Add item successful');
    },
    onError: () => {
      toast.error('Something went wrong Please check again!');
    },
  });

  const onChange = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    const newFile = await getBase64(file.originFileObj);
    form.setFieldValue('product_item_image', newFile);
  };

  useEffect(() => {
    if (productItem) {
      setFileList([
        {
          url: productItem.product_item_image,
        },
      ]);
    }
  }, [productItem]);

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={onCancel}
      title={productItem ? 'Edit' : 'Add'}
      footer={[
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="product-item-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="product-item-form"
        name="product-item-form"
        preserve={false}
        labelCol={{ span: 4 }}
        onFinish={mutate}
        initialValues={{ ...productItem }}
      >
        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="qty_in_stock"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Image"
          name="product_item_image"
          rules={[{ required: true, message: 'Please input this field!' }]}
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
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Color"
          name="color_id"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Select options={configs.colors} />
        </Form.Item>
        <Form.Item
          label="Size"
          name="size_id"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Select options={configs.sizes} />
        </Form.Item>
        <Form.Item
          label="Material"
          name="material_id"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Select options={configs.materials} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddProductDetailModal;
