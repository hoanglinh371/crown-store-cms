import React from 'react';

import { useId } from 'react';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import EditProductModelTrigger from './edit-products-modal-trigger';

const ProductsTable = ({ products }) => {
  const modalId = useId();
  const editModalId = useId();

  return (
    <div className="flex flex-col items-center space-y-10 overflow-x-auto">
      <table className=" table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Category</th>
            <th>Brand</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, 10).map((product, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{product.product_name}</td>
              <td>{product.product_desc.slice(0, 50)}</td>
              <td>
                <img
                  src={product.product_image}
                  alt="product_image"
                  width={300}
                  height={300}
                />
              </td>
              <td>{product.category_id}</td>
              <td>{product.brand_id}</td>
              <td>
                <EditProductModelTrigger
                  modalId={product.id + editModalId}
                  product={product}
                />
              </td>
              <td>
                <DeleteModalTrigger modalId={modalId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="join">
        <button className="btn join-item btn-sm">1</button>
        <button className="btn join-item btn-active btn-sm">2</button>
        <button className="btn join-item btn-sm">3</button>
        <button className="btn join-item btn-sm">4</button>
      </div>
    </div>
  );
};

export default ProductsTable;
