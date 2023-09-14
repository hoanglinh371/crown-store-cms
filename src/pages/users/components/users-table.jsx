import React from 'react';
import { Pencil } from 'lucide-react';

import DeleteModalTrigger from './delete-modal-trigger';

const UsersTable = ({ users }) => {
  const editModalId = React.useId();
  const deleteModalId = React.useId();

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <Pencil
                  size={16}
                  color="#4bb543"
                  className="cursor-pointer"
                  onClick={() =>
                    document.getElementById('my_modal_2').showModal()
                  }
                />
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click outside to close
                    </p>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </td>
              <td>
                <DeleteModalTrigger modalId={deleteModalId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
