import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Modal } from 'antd';
import { toast } from 'sonner';

import { createColor, updateColor } from '@/services';

export default function AddEditColorModal({ color, open, onCancel }) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: color ? (values) => updateColor(values, color.id) : createColor,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onCancel();
      toast.success(
        color ? 'Update color successful.' : 'Add color successful',
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
      title={color ? 'Edit Color' : 'Created Color'}
      footer={[
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="color-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="color-form"
        name="color-form"
        preserve={false}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        initialValues={{ ...color }}
      >
        <Form.Item
          label={<span>Name</span>}
          name="color_name"
          rules={[
            {
              required: true,
              message: 'Please input color name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span>Color</span>}
          name="color_hex_code"
          rules={[
            {
              required: true,
              message: 'Please input color hex!',
            },
          ]}
        >
          <Input type="color" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
