import React, { useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Input from '@/components/input';
import { ERROR_MESSAGE } from '@/constants';
import { UserContext } from '@/contexts/user.context';

import crownLogo from '../../../public/crown.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGE.REQUIRED)
    .email(ERROR_MESSAGE.EMAIL),
  password: yup.string().required(ERROR_MESSAGE.REQUIRED),
});

const defaultValues = {
  email: '',
  password: '',
};

export default function Login() {
  const { setIsAuthenticated } = useContext(UserContext);

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = (values) => {};

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="border-top w-full rounded-md border-t-4 border-gray-600 bg-white p-6 shadow-md lg:max-w-lg">
        <div className="flex justify-center pb-4">
          <img src={crownLogo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          <Input label="Email Address" name="email" control={control} />
          <Input label="Password" name="password" control={control} />
          <div>
            <button
              type="button"
              onClick={() => setIsAuthenticated(true)}
              className="btn btn-block"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
