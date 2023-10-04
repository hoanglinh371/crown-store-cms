import { Fragment } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/services';

import AddEditProductModel from './components/add-edit-product-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';
import Pagination from '@/components/pagination';

const ProductsPage = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('search') ?? '';

  const { data, isLoading } = useQuery({
    queryKey: ['products', { page, search }],
    queryFn: () => getProducts({ page, search }),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Serch here..."
          className="input input-bordered w-full max-w-xs"
        />
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((product, index) => (
                <tr key={index} className="hover">
                  <th>{product.id}</th>
                  <td>
                    <Link to={`/products/${product.id}`}>
                      {product.product_name}
                    </Link>
                  </td>
                  <td>{product.product_desc}</td>
                  <td>
                    <div className="w-32">
                      <img
                        src={product.product_image}
                        alt="product_image"
                        className="h-36 w-full "
                      />
                    </div>
                  </td>
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
          <Pagination
            pathname={location.pathname}
            totalPages={data.pagination.total_pages}
            currentPage={data.pagination.current_page}
          />
        </Fragment>
      )}
    </div>
  );
};

export default ProductsPage;
