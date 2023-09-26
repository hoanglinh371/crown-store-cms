import React from 'react';
import { useId } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Pencil, Plus } from 'lucide-react';

import Input from '@/components/input';
import { ERROR_MESSAGE } from '@/constants';

const schema = yup.object().shape({
  category_name: yup.string().required(ERROR_MESSAGE.REQUIRED),
  category_image: yup.string().required(ERROR_MESSAGE.REQUIRED),
});

const AddEditCategoryModal = ({ modalId, category }) => {
  const formId = useId();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      category_name: category ? category.category_name : '',
      category_image: category ? category.category_image : '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (values) => {
    console.log(values);
    reset();
    document.getElementById(modalId).close();
  };

  return (
    <div>
      {category ? (
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
          Add New Category
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
            <Input
              type="text"
              label="Category Name"
              name="category_name"
              control={control}
            />
            <Input
              type="text"
              label="Category Image"
              name="category_image"
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

export default AddEditCategoryModal;
