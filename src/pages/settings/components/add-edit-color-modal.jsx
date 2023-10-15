import { useId } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Pencil, Plus } from 'lucide-react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import Input from '@/components/input';
import { ERROR_MESSAGE } from '@/constants';
import { createColor, updateColor } from '@/services';

const schema = yup.object().shape({
  color_name: yup.string().required(ERROR_MESSAGE.REQUIRED),
  color_hex_code: yup.string().required(ERROR_MESSAGE.REQUIRED),
});

export default function AddEditColorModal({ modalId, color }) {
  const formId = useId();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      color_name: color?.color_name ?? '',
      color_hex_code: color ? color.color_hex_code : '#000000',
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: color ? (values) => updateColor(values, color.id) : createColor,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success(
        color ? 'Update color successful.' : 'Add color successful',
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
      {color ? (
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
          Add New Color
        </button>
      )}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <form
            id={formId}
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Input type="text" name="color_name" control={control} />
            <Input type="color" name="color_hex_code" control={control} />
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
}
