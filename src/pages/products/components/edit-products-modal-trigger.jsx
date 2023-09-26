import React from 'react';
import { useId } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Pencil, Plus } from 'lucide-react';

import Input from '@/components/input';
import { ERROR_MESSAGE } from '@/constants';

const schema = yup.object().shape({
  product_name: yup.string().required(ERROR_MESSAGE.REQUIRED),
  product_desc: yup.string().required(ERROR_MESSAGE.REQUIRED),
  product_image: yup.string().required(ERROR_MESSAGE.REQUIRED),
  category_id: yup.number().required(ERROR_MESSAGE.REQUIRED),
  brand_id: yup.number().required(ERROR_MESSAGE.REQUIRED),
});

const EditProductModelTrigger = ({ modalId, product }) => {
  const formId = useId();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      product_name: product ? product.product_name : '',
      product_desc: product ? product.product_desc : '',
      product_image: product ? product.product_image : '',
      category_id: product ? product.category_id : 0,
      brand_id: product ? product.brand_id : 0,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (values) => {
    console.log(values);
    reset();
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
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
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
            <Input
              type="text"
              label="Product Description"
              name="product_desc"
              control={control}
            />
            <div className="mb-3 flex gap-4">
              <Input
                type="number"
                label="Product Categoriy"
                name="category_id"
                control={control}
              />
              <Input
                type="number"
                label="Product Brand"
                name="brand_id"
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
export default EditProductModelTrigger;
