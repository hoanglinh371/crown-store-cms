import React from 'react';
import { Trash } from 'lucide-react';

const DeleteModalTrigger = ({ modalId }) => {
  return (
    <React.Fragment>
      <Trash
        size={16}
        color="#d11a2a"
        className="cursor-pointer"
        onClick={() => document.getElementById(modalId).showModal()}
      />
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </React.Fragment>
  );
};

export default DeleteModalTrigger;
