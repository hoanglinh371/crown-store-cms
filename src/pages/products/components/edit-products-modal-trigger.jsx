import { Fragment } from 'react';
import { Pencil } from 'lucide-react';
import { toast } from 'react-toastify';

export default function EditProductModelTrigger({ modalId, handle }) {
  const handleEdit = () => {
    //handler();
    toast.success('update successful');
  };

  return (
    <Fragment>
      <Pencil
        size={16}
        color="#4bb543"
        className="cursor-pointer"
        onClick={() => document.getElementById(modalId).showModal()}
      />
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Product</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="mb-3 flex gap-4">
            <input
              type="text"
              placeholder="Name Product"
              className="input input-bordered input-md  w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Image Product"
              className="input input-bordered input-md  w-full max-w-xs"
            />
          </div>
          <textarea
            className="textarea textarea-bordered mb-3 w-full gap-4"
            placeholder="Description"
          ></textarea>
          <div className="mb-3 flex gap-4">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Pick Categoty
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <select className="select select-bordered  w-full max-w-xs">
              <option disabled selected>
                Pick Brand
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="modal-action">
            <form method="dialog" className="space-x-3">
              <button className="btn btn-success" onClick={handleEdit}>
                Save
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </Fragment>
  );
}
