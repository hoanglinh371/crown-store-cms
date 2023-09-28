import { useQuery } from '@tanstack/react-query';

import { getMaterials } from '@/services';

import AddEditMaterialModal from './components/add-edit-material-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

export default function Material() {
  const { data, isLoading } = useQuery({
    queryKey: ['materials'],
    queryFn: () => getMaterials(),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="self-end">
        <AddEditMaterialModal modalId="add-material-modal" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  );
}
