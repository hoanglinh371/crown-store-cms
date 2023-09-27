import { useId } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Pencil, Plus } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Input from '@/components/input';
import Textarea from '@/components/textarea';

import { ERROR_MESSAGE } from '@/constants';
import { createMaterial, updateMaterial } from '@/services';

const schema = yup.object().shape({
  material_name: yup.string().required(ERROR_MESSAGE.REQUIRED),
  material_desc: yup.string().required(ERROR_MESSAGE.REQUIRED),
});

export default function AddEditMaterialModal({ modalId, material }) {
  const queryClient = useQueryClient();
  const formId = useId();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      material_name: material ? material.material_name : '',
      material_desc: material ? material.material_desc : '',
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: material ? updateMaterial : createMaterial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materials'] });
    },
  });

  const handleSubmitForm = async (values) => {
    mutation.mutate(values);
    document.getElementById(modalId).close();
  };

  return (
    <div>
      {material ? (
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
          Add New Material
        </button>
      )}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {material ? 'Edit Material' : 'Add New Material'}
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
              label="Material Name"
              name="material_name"
              control={control}
            />
            <Textarea
              type="text"
              label="Material Description"
              name="material_desc"
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
}
