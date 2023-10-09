import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus } from 'lucide-react';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

import Input from '@/components/input';
import { ERROR_MESSAGE } from '@/constants';
import { createBrand, updateBrand } from '@/services';

const schema = yup.object().shape({
  brand_name: yup.string().required(ERROR_MESSAGE.REQUIRED),
  brand_email: yup
    .string()
    .email(ERROR_MESSAGE.EMAIL)
    .required(ERROR_MESSAGE.REQUIRED),
  brand_phone: yup.string().required(ERROR_MESSAGE.REQUIRED),
  brand_address: yup.string().required(ERROR_MESSAGE.REQUIRED),
});

const AddEditBrandModal = ({ modalId, brand }) => {
  const queryClient = useQueryClient();
  const formId = useId();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      brand_name: brand ? brand.brand_name : '',
      brand_email: brand ? brand.brand_email : '',
      brand_phone: brand ? brand.brand_phone : '',
      brand_address: brand ? brand.brand_address : '',
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
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

  const handleSubmitForm = async (values) => {
    mutation.mutate(values);
    document.getElementById(modalId).close();
  };

  return (
    <div>
      {brand ? (
        <Pencil
          size={16}
          color="#4bb543"
          className="cursor-pointer"
          onClick={() => document.getElementById(modalId).showModal()}
        />
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById(modalId).showModal()}
        >
          <Plus />
          Add New Brand
        </button>
      )}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {brand ? 'Edit Brand' : 'Add New Brand'}
          </h3>
          <p className="py-4 text-xs font-medium italic">
            Press ESC key or click the button below to close
          </p>
          <form
            id={formId}
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Input
              type="text"
              label="Brand Name"
              name="brand_name"
              control={control}
            />
            <Input
              type="text"
              label="Brand Email"
              name="brand_email"
              control={control}
            />
            <Input
              type="text"
              label="Brand Phone"
              name="brand_phone"
              control={control}
            />
            <Input
              type="text"
              label="Brand Address"
              name="brand_address"
              control={control}
            />
          </form>
          <div className="modal-action">
            <form method="dialog" className="space-x-4">
              <button className="btn btn-primary" form={formId}>
                Submit
              </button>
              <button className="btn" onClick={reset}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddEditBrandModal;
