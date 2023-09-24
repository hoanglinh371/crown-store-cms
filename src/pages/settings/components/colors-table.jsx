import { useId } from 'react';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import AddEditColorModal from './add-edit-color-modal';

export default function ColorTable({ colors }) {
  const modalId = useId();
  const editModalId = useId();

  return (
    <div className="flex flex-col items-center space-y-10 overflow-x-auto">
      <table className="table table-zebra">
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
          {colors.slice(0, 10).map((color, index) => (
            <tr key={index}>
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
                  modalId={color.id + editModalId}
                  color={color}
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
