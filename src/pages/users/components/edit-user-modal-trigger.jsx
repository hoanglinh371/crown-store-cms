import React from 'react';

import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

export default function EditUserModalTrigger({ modalId, handler }) {
  const handleEdit = () => {
    handler();
    toast.success('Update successful');
  };

  return (
    <>
      <Pencil
        size={16}
        color="#4bb543"
        className="cursor-pointer"
        onClick={() => document.getElementById(modalId).showModal()}
      />
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog" className="space-x-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleEdit}
              >
                Save
              </button>
              <button type="button" className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
