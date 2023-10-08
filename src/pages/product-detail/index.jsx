import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { getProductsDetail } from '@/services';

import AddProductDetailModal from './components/add-product-detail-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

export default function ProductDetail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`products`, id],
    queryFn: () => getProductsDetail(id),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Serch here..."
          className="input input-bordered w-full max-w-xs"
        />
        <AddProductDetailModal modalId="add-product-modal" />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table table-zebra table-lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Sku</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Color</th>
                <th>Size</th>
                <th>Material</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.product_items.map((product, index) => (
                <tr key={index} className="hover">
                  <th>{product.id}</th>
                  <td>{product.sku}</td>
                  <td>{product.qty_in_stock}</td>
                  <td>
                    <div className="w-32">
                      <img
                        src={product.product_item_image}
                        alt="product_image"
                        className="h-[100px] w-[75px] object-cover"
                      />
                    </div>
                  </td>
                  <td>
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{
                        backgroundColor: product.color.color_hex_code,
                      }}
                    ></div>
                  </td>
                  <td>{product.size.size_value}</td>
                  <td>{product.material.material_name}</td>
                  <td>{product.price}</td>
                  <td>
                    <DeleteModalTrigger modalId="delete-product-item-modal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      )}
    </div>
  );
}
