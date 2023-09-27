import { Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getBrands } from '@/services';

import AddEditBrandModal from './components/add-edit-brand-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

const BrandsPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['brands', page],
    queryFn: () => getBrands({ page }),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <AddEditBrandModal modalId="add-brand-modal" />
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
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((brand, index) => (
                <tr key={index} className="hover">
                  <th>{brand.id}</th>
                  <td>{brand.brand_name}</td>
                  <td>{brand.brand_email}</td>
                  <td>{brand.brand_phone}</td>
                  <td>{brand.brand_address}</td>
                  <td>
                    <AddEditBrandModal
                      modalId={`brand-${brand.id}`}
                      brand={brand}
                    />
                  </td>
                  <td>
                    <DeleteModalTrigger modalId="delete-brand-modal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="join self-center">
            {Array.from({ length: data.pagination.total_pages }, (_, index) => (
              <Link
                key={index}
                to={`/brands?page=${index + 1}`}
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

export default BrandsPage;
