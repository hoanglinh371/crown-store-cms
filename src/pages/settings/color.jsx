import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';

import { getColors } from '@/services/color';

import AddEditColorModal from './components/add-edit-color-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

export default function Color() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['colors', page],
    queryFn: () => getColors({ page }),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />

        <AddEditColorModal modalId="add-color-modal" />
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
                <th>Color</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((color, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{color.color_name}</td>
                  <td>
                    <div
                      className="h-6 w-6 rounded-md"
                      style={{
                        backgroundColor: color.color_hex_code,
                      }}
                    ></div>
                  </td>
                  <td>
                    <AddEditColorModal
                      modalId={`color-${color.id}`}
                      color={color}
                    />
                  </td>
                  <td>
                    <DeleteModalTrigger modalId="delete-color-modal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="join self-center">
            {Array.from({ length: data.pagination.total_pages }, (_, index) => (
              <Link
                key={index}
                to={`/settings/colors?page=${index + 1}`}
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
}
