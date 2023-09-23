import { useId } from 'react';

import DeleteModalTrigger from '../../../components/delete-modal-trigger';
import AddEditMaterialModal from '../components/add-edit-material-modal';

export default function SizeTable({ sizes }) {
  const modalId = useId();
  const editModalId = useId();

  return (
    <div className="flex flex-col items-center space-y-10 overflow-x-auto">
      <table className="table table-zebra">
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
          {sizes.slice(0, 10).map((size, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{size.size_value}</td>
              <td>{size.width}</td>
              <td>{size.height}</td>
              <td>
                <AddEditMaterialModal
                  modalId={size.id + editModalId}
                  material={size}
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
