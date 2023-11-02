import React, { useContext } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button } from 'antd';

import { toast } from 'sonner';

import { UserContext } from '@/contexts/user.context';
import instance from '@/services/axios';

import crownLogo from '../../../public/crown.svg';

export default function Login() {
  const { setIsAuthenticated } = useContext(UserContext);

  const { mutate } = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await instance.post('/login', { email, password });
      return response;
    },
    onSuccess: () => {
      localStorage.setItem('user', 1);
      setIsAuthenticated(true);
      toast.success('Login!');
    },
    onError: () => {
      toast.error('Login fail!');
    },
  });

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="border-top w-full rounded-md border-t-4 border-gray-600 bg-white p-6 shadow-md lg:max-w-lg">
        <div className="flex justify-center pb-4">
          <img src={crownLogo} alt="logo" />
        </div>
        <Form onFinish={mutate}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input email!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
