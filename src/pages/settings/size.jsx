import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSizes } from '@/services';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Pagination from '@/components/pagination';
import Spinner from '@/components/spinner';
import AddEditSizeModal from './components/add-edit-size-modal';

export default function Size() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['sizes', { page }],
    queryFn: () => getSizes({ page }),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="self-end">
        <AddEditSizeModal modalId="add-size-modal" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <table className="table table-zebra table-lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Width</th>
                <th>Height</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.sizes.map((size, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{size.size_value}</td>
                  <td>{size.width}</td>
                  <td>{size.height}</td>
                  <td>
                    <AddEditSizeModal modalId={`size-${size.id}`} size={size} />
                  </td>
                  <td>
                    <DeleteModalTrigger modalId="delete-size-modal" />
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
      )}
    </div>
  );
}
