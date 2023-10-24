import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Modal } from 'antd';
import { toast } from 'sonner';

import { createMaterial, updateMaterial } from '@/services';

export default function AddEditMaterialModal({ material, open, onCancel }) {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: material
      ? (values) => updateMaterial(values, material.id)
      : createMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      onCancel();
      toast.success(material ? 'Update material!' : 'Created material!');
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
      title={material ? 'Edit Material' : 'Create Material'}
      footer={[
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="material-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="material-form"
        name="material-form"
        preserve={false}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
        initialValues={{ ...material }}
      >
        <Form.Item
          label={<span>Name</span>}
          name="material_name"
          rules={[
            {
              required: true,
              message: 'Please input material name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={<span>Description</span>} name="material_desc">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
