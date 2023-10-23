import React, { useState, useEffect } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Form, Upload, Modal, Input, Button } from 'antd';
import { toast } from 'sonner';

import { createCategory, updateCategory } from '@/services';
import { getBase64 } from '@/utils';

function AddEditCategoryModal({ open, category, refetch, onCancel }) {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const { mutate } = useMutation({
    mutationFn: category
      ? (values) => updateCategory(values, category.id)
      : createCategory,
    onSuccess: () => {
      refetch();
      onCancel();
      toast.success(category ? 'Category updated!' : 'Category created!');
    },
    onError: () => {
      toast.error('Somethings went wrong. Please check again!');
    },
  });

  const onChange = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    const newFile = await getBase64(file.originFileObj);
    form.setFieldValue('category_image', newFile);
  };

  useEffect(() => {
    if (category) {
      setFileList([
        {
          url: category.category_image,
        },
      ]);
    }
  }, [category]);

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={() => {
        onCancel();
        setFileList([]);
      }}
      title={category ? 'Edit category' : 'Create category'}
      footer={[
        <Button
          onClick={() => {
            onCancel();
            setFileList([]);
          }}
        >
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="category-form">
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        preserve={false}
        id="category-form"
        name="category-form"
        labelCol={{ span: 4 }}
        onFinish={mutate}
        initialValues={{ ...category }}
      >
        <Form.Item
          label={<span>Name</span>}
          name="category_name"
          rules={[{ required: true, message: 'Please input category name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span>Image</span>}
          name="category_image"
          rules={[{ required: true, message: 'Please input category image!' }]}
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
      </Form>
    </Modal>
  );
}

export default AddEditCategoryModal;
