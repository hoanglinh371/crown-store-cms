import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getMaterials } from '@/services';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Pagination from '@/components/pagination';
import Spinner from '@/components/spinner';
import AddEditMaterialModal from './components/add-edit-material-modal';

export default function Material() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['materials', { page }],
    queryFn: () => getMaterials({ page }),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-12">
      <div className="text-right">
        <AddEditMaterialModal modalId="add-material-modal" />
      </div>

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
          {data.data.materials.map((material, index) => (
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

      <Pagination
        pathname={location.pathname}
        totalPages={data.pagination.total_pages}
        currentPage={data.pagination.current_page}
      />
    </div>
  );
}
