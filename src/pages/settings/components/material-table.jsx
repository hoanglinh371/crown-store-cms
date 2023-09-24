import { useId } from 'react';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import AddEditMaterialModal from '../components/add-edit-material-modal';

export default function MaterialTable({ materials }) {
  const modalId = useId();
  const editModalId = useId();

  return (
    <div className="flex flex-col items-center space-y-10 overflow-x-auto">
      <table className="table table-zebra">
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
          {materials.slice(0, 10).map((material, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{material.material_name}</td>
              <td>{material.material_desc}</td>
              <td>
                <AddEditMaterialModal
                  modalId={material.id + editModalId}
                  material={material}
                />
              </td>
              <td>
                <DeleteModalTrigger modalId={modalId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="join">
        <button className="btn join-item btn-sm">1</button>
        <button className="btn join-item btn-active btn-sm">2</button>
        <button className="btn join-item btn-sm">3</button>
        <button className="btn join-item btn-sm">4</button>
      </div>
    </div>
  );
}
