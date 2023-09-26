import { useState, useEffect, useId } from 'react';

import CategoriesTable from './components/categories-table';
import { getCategory } from '@/services';
import AddEditCategoryModal from './components/add-edit-categoty-modal';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const modalId = useId();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategory();
      setCategories(data);
    };

    fetchCategories();
  }, []);
  return (
    <>
      <div className="mb-12 flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <AddEditCategoryModal modalId={modalId} />
      </div>
      <CategoriesTable categories={categories} />
    </>
  );
};

export default CategoriesPage;
