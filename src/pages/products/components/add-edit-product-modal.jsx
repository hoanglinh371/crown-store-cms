import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus } from 'lucide-react';
import { useContext, useId } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Input from '@/components/input';
import Select from '@/components/select';
import Textarea from '@/components/textarea';

import { ERROR_MESSAGE } from '@/constants';
import { ConfigContext } from '@/contexts/config.context';
import { createProduct, updateProduct } from '@/services';
import { toast } from 'sonner';

const schema = yup.object().shape({
  product_name: yup.string().required(ERROR_MESSAGE.REQUIRED),
  product_desc: yup.string().required(ERROR_MESSAGE.REQUIRED),
  product_image: yup.string().required(ERROR_MESSAGE.REQUIRED),
  category_id: yup.number().required(ERROR_MESSAGE.REQUIRED),
  brand_id: yup.number().required(ERROR_MESSAGE.REQUIRED),
});

const AddEditProductModel = ({ modalId, product }) => {
  const queryClient = useQueryClient();
  const formId = useId();

  const { configs } = useContext(ConfigContext);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      product_name: product ? product.product_name : '',
      product_desc: product ? product.product_desc : '',
      product_image: product ? product.product_image : '',
      category_id: product ? product.category_id : 1,
      brand_id: product ? product.brand_id : 1,
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: product ? updateProduct : createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Add product successful.');
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
    <>
      {product ? (
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
          Add New Product
        </button>
      )}

      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <p className="py-4 text-xs font-medium italic">
            Press ESC key or click the button below to close
          </p>
          <form
            id={formId}
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <div className="mb-3 flex gap-4">
              <Input
                type="text"
                label="Product Name"
                name="product_name"
                control={control}
              />
              <Input
                type="text"
                label="Product Image"
                name="product_image"
                control={control}
              />
            </div>
            <Textarea
              type="text"
              label="Product Description"
              name="product_desc"
              control={control}
            />
            <div className="mb-3 flex gap-4">
              <Select
                label="Product Category"
                name="category_id"
                options={configs.categories}
                control={control}
              />
              <Select
                label="Product Brand"
                name="brand_id"
                options={configs.brands}
                control={control}
              />
            </div>
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
    </>
  );
};
export default AddEditProductModel;
