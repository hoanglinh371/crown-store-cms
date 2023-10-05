import { Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/services';

import AddEditProductModel from './components/add-edit-product-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProducts({ page }),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <form>
          <input
            type="search"
            name="search"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </form>
        <AddEditProductModel modalId="add-product-modal" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table table-zebra table-lg">
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
              {data.data.map((product, index) => (
                <tr key={index} className="hover">
                  <th>{product.id}</th>
                  <td>{product.product_name}</td>
                  <td>{product.product_desc.slice(0, 50)}</td>
                  <td>
                    <img src={product.product_image} alt="product_image" />
                  </td>
                  <td>{product.category_id}</td>
                  <td>{product.brand_id}</td>
                  <td>
                    <AddEditProductModel
                      modalId={`product-${product.id}`}
                      product={product}
                    />
                  </td>
                  <td>
                    <DeleteModalTrigger modalId="delete-product-modal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="join self-center">
            {Array.from({ length: data.pagination.total_pages }, (_, index) => (
              <Link
                key={index}
                to={`/products?page=${index + 1}`}
                className={`btn join-item btn-sm ${
                  data.pagination.current_page === index + 1 ? 'btn-active' : ''
                }`}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ProductsPage;
