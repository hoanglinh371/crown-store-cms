import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Modal, Button } from 'antd';
import { toast } from 'sonner';

import { createBrand, updateBrand } from '@/services';

function AddEditBrandModal({ open, onCancel, brand }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: brand ? (values) => updateBrand(values, brand.id) : createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success(
        brand ? 'Update brand successful.' : 'Add brand successful.',
      );
    },
    onError: () => {
      toast.error('Somethings went wrong. Please check again!');
    },
  });

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={onCancel}
      title={brand ? 'Edit brand' : 'Create brand'}
      footer={[
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="brand-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        preserve={false}
        id="brand-form"
        name="brand-form"
        labelCol={{ span: 4 }}
        onFinish={mutate}
        initialValues={{ ...brand }}
      >
        <Form.Item
          label="Name"
          name="brand_name"
          rules={[{ required: true, message: 'Please input brand name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="brand_email"
          rules={[{ required: true, message: 'Please input brand email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="brand_phone"
          rules={[{ required: true, message: 'Please input brand phone' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="brand_address"
          rules={[{ required: true, message: 'Please input brand address' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddEditBrandModal;
