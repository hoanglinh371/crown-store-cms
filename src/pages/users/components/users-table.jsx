import React from 'react';
import { Pencil } from 'lucide-react';

import DeleteModalTrigger from './delete-modal-trigger';
import { RESULT_PER_PAGE } from '../../../constants';

const UsersTable = ({ users }) => {
  const editModalId = React.useId();
  const deleteModalId = React.useId();

  return (
    <div className="flex flex-col items-center space-y-10 overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 10).map((user, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{`${user.first_name} ${user.last_name}`}</td>
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

      <div className="join">
        <button className="btn join-item btn-sm">1</button>
        <button className="btn join-item btn-active btn-sm">2</button>
        <button className="btn join-item btn-sm">3</button>
        <button className="btn join-item btn-sm">4</button>
      </div>
    </div>
  );
};

export default UsersTable;
