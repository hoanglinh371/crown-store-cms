import React from 'react';
import { AlertTriangle, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const DeleteModalTrigger = ({ modalId, handler, queryKey }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handler,
    onSuccess: () => {
      toast.success('Delete successful!');
      queryClient.invalidateQueries({ queryKey });
    },
    onError: () => {
      toast.error('Somethings went very wrongs =))');
    },
  });

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
          <div className="flex items-center gap-4">
            <AlertTriangle color="#ff0f0f" />
            <h3 className="text-lg font-bold">Are you sure?</h3>
          </div>

          <p className="py-4">
            Do you really want to delete this record? This process cannot be
            undone.
          </p>
          <div className="modal-action">
            <form method="dialog" className="space-x-3">
              <button className="btn btn-warning" onClick={mutation.mutate}>
                Delete
              </button>
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </React.Fragment>
  );
};

export default DeleteModalTrigger;
