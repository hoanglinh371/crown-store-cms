import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Modal } from 'antd';
import { toast } from 'sonner';

import { createSize, updateSize } from '@/services';

export default function AddEditMaterialModal({ size, open, onCancel }) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: size ? (values) => updateSize(values, size.id) : createSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sizes'] });
      toast.success(
        size ? 'Update size successful.' : 'Created size successful',
      );
    },
    onError: () => {
      toast.error('Somethings went wrong. Please check again!');
    },
  });

  const onFinish = async (values) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={() => {
        onCancel();
      }}
      title={size ? 'Edit Size' : 'Created Size'}
      footer={[
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="size-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="size-form"
        name="size-form"
        preserve={false}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        initialValues={{ ...size }}
      >
        <Form.Item
          label={<span>Size</span>}
          name="size_value"
          rules={[
            {
              required: true,
              message: 'Please input size name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span>width</span>}
          name="width"
          rules={[
            {
              required: true,
              message: 'Please input width!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span>height</span>}
          name="height"
          rules={[
            {
              required: true,
              message: 'Please input height!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
