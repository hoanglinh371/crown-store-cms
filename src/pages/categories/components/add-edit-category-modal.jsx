import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus } from 'lucide-react';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

import { ERROR_MESSAGE } from '@/constants';
import { createCategory, updateCategory } from '@/services';

import Input from '@/components/input';

const schema = yup.object().shape({
  category_name: yup.string().required(ERROR_MESSAGE.REQUIRED),
});

const AddEditCategoryModal = ({ modalId, category }) => {
  const queryClient = useQueryClient();
  const formId = useId();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      category_name: category ? category.category_name : '',
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: category
      ? (values) => updateCategory(values, category.id)
      : createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(
        category ? 'Update category successful.' : 'Add category successful.',
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
          <h3 className="text-lg font-bold">
            {category ? 'Edit Category' : 'Add New Category'}
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
              label="Category Name"
              name="category_name"
              control={control}
            />
            <Input
              type="file"
              label="Category Image"
              name="file"
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
