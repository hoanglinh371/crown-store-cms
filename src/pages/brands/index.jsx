import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Pagination from '@/components/pagination';
import Spinner from '@/components/spinner';
import { getBrands } from '@/services';

import AddEditBrandModal from './components/add-edit-brand-modal';

function BrandsPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['brands', page],
    queryFn: () => getBrands({ page }),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <AddEditBrandModal modalId="add-brand-modal" />
      </div>

      <table className="table table-zebra table-lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {data.data.brands.map((brand, index) => (
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

      <Pagination
        pathname={location.pathname}
        totalPages={data.pagination.total_pages}
        currentPage={data.pagination.current_page}
      />
    </div>
  );
}

export default BrandsPage;
