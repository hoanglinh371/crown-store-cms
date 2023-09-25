import React from 'react';

import DeleteModalTrigger from '../../../components/delete-modal-trigger';
import EditProductModelTrigger from './edit-products-modal-trigger';

const ProductsTable = ({ products }) => {
  const editModalId = React.useId();
  const deleteModalId = React.useId();

  return (
    <div className="flex flex-col items-center space-y-10 overflow-x-auto">
      <table className=" table table-xs">
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
          {products.slice(0, 10).map((products, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{`${products.product_name} `}</td>
              <td>{products.product_desc}</td>
              <td>{products.product_image}</td>
              <td>{products.category_id}</td>
              <td>{products.brand_id}</td>
              <td>
                <EditProductModelTrigger modalId={editModalId} />
              </td>
              <td>
                <DeleteModalTrigger modalId={deleteModalId} />
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
