import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import { toast } from 'sonner';

function DeleteModalTrigger({ handler, queryKey, open, onOpenChange }) {
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

  const handleOk = () => {
    mutation.mutate();
  };

  const handleCancel = () => {
    onOpenChange();
  };

  return (
    <Modal
      title="Are you sure?"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Do you really want to delete this record?</p>
    </Modal>
  );
}

export default DeleteModalTrigger;
