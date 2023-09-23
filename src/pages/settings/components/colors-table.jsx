import { useId } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Pencil, Plus } from 'lucide-react';

import Input from '../../../components/input';
import { ERROR_MESSAGE } from '../../../constants';

const schema = yup.object().shape({
  size_value: yup.string().required(ERROR_MESSAGE.REQUIRED),
  width: yup.number().required(ERROR_MESSAGE.REQUIRED),
  height: yup.number().required(ERROR_MESSAGE.REQUIRED),
});

export default function AddEditColorModal({ modalId, size }) {
  const formId = useId();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      size_value: size ? size.value : '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (values) => {
    console.log(values);
    reset();
    document.getElementById(modalId).close();
  };

  return (
    <div>
      {size ? (
        <Pencil
          size={16}
          color="#4bb543"
          className="cursor-pointer"
          onClick={() => document.getElementById(modalId).showModal()}
        />
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById(modalId).showModal()}
        >
          <Plus />
          Add New Size
        </button>
      )}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <form
            id={formId}
            className="w-full space-y-4"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Input type="text" name="color_name" control={control} />
            <Input type="color" name="color_hex_code" control={control} />
          </form>
          <div className="modal-action">
            <form method="dialog" className="space-x-4">
              <button className="btn btn-primary" form={formId}>
                Submit
              </button>
              <button className="btn" onClick={reset}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
