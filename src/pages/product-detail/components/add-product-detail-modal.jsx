import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

import { ERROR_MESSAGE } from '@/constants';
import { createProductDetail } from '@/services';

import Input from '@/components/input';

const schema = yup.object().shape({
  sku: yup.string().required(ERROR_MESSAGE.REQUIRED),
  qty_in_stock: yup.number().required(ERROR_MESSAGE.REQUIRED),
  product_item_image: yup.string().required(ERROR_MESSAGE.REQUIRED),
  price: yup.number().required(ERROR_MESSAGE.REQUIRED),
  color_id: yup.number().required(ERROR_MESSAGE.REQUIRED),
  size_id: yup.number().required(ERROR_MESSAGE.REQUIRED),
  material_id: yup.number().required(ERROR_MESSAGE.REQUIRED),
});

const AddProductDetailModal = ({ modalId, item }) => {
  const queryClient = useQueryClient();
  const formId = useId();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      sku: '',
      qty_in_stock: 0,
      product_item_image: '',
      price: 0,
      color_id: 0,
      size_id: 0,
      material_id: 0,
    },
  });
  const mutation = useMutation({
    mutationFn: createProductDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-item'] });
      toast.success('Add item successsful');
    },
    onError: () => {
      toast.error('Something went wrong Please check again!');
    },
  });
  const handleSubmitForm = async (value) => {
    mutation.mutate(value);
    document.getElementById(modalId).close();
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById(modalId).showModal()}
      >
        <Plus />
        Add New Product Item
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Add New Product Item</h3>
          <p className="py-4 text-xs font-medium italic">
            Press ESC key or click the button below to close
          </p>
          <form
            id={formId}
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Input type="text" label="Item Sku" name="Sku" control={control} />
            <Input
              type="number"
              label="Stock"
              name="qty_in_stock"
              control={control}
            />
            <Input
              type="file"
              label="Item Image"
              name="product_item_image"
              control={control}
            />
            <Input type="number" label="Price" name="price" control={control} />
            <Input
              type="number"
              label="Color"
              name="color_id"
              control={control}
            />
            <Input
              type="number"
              label="size"
              name="size_id"
              control={control}
            />
            <Input
              type="number"
              label="Material"
              name="material_id"
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

export default AddProductDetailModal;
