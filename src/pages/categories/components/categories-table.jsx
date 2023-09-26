import { useId } from 'react';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import AddEditCategoryModal from './add-edit-categoty-modal';

const CategoriesTable = ({ categories }) => {
  const modalId = useId();
  const editModalId = useId();

  return (
    <div className="flex flex-col items-center space-y-10 overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.slice(0, 10).map((category, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{category.category_name}</td>
              <td>{category.category_image}</td>
              <td>
                <AddEditCategoryModal
                  modalId={category.id + editModalId}
                  category={category}
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
};

export default CategoriesTable;
