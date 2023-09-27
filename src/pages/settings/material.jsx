import { Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getMaterials } from '@/services';

import AddEditMaterialModal from './components/add-edit-material-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

export default function Material() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['materials', page],
    queryFn: () => getMaterials({ page }),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <AddEditMaterialModal modalId="add-material-modal" />
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((material, index) => (
                <tr key={index} className="hover">
                  <th>{material.id}</th>
                  <td>{material.material_name}</td>
                  <td>{material.material_desc}</td>
                  <td>
                    <AddEditMaterialModal
                      modalId={`material-${material.id}`}
                      material={material}
                    />
                  </td>
                  <td>
                    <DeleteModalTrigger modalId="delete-material-modal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="join self-center">
            {Array.from({ length: data.pagination.total_pages }, (_, index) => (
              <Link
                key={index}
                to={`/settings/materials?page=${index + 1}`}
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
