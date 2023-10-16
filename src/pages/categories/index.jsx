import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Pagination from '@/components/pagination';
import Spinner from '@/components/spinner';
import { getCategories, deleteCategory } from '@/services';

import AddEditCategoryModal from './components/add-edit-category-modal';

function CategoriesPage() {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('search') ?? '';

  const { data, isLoading } = useQuery({
    queryKey: ['categories', { page, search }],
    queryFn: () => getCategories({ page, search }),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <AddEditCategoryModal modalId="add-category-modal" />
      </div>

      <table className="table table-zebra table-lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Image</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {data.data.categories.map((category) => (
            <tr key={category.id} className="hover">
              <th>{category.id}</th>
              <td>{category.category_name}</td>
              <td>
                <div className="w-32">
                  <img
                    src={category.category_image}
                    alt="category_image"
                    className="h-[100px] w-[75px] object-cover"
                  />
                </div>
              </td>
              <td>
                <AddEditCategoryModal
                  modalId={`category-${category.id}`}
                  category={category}
                />
              </td>
              <td>
                <DeleteModalTrigger
                  modalId={`delete-category-modal-${category.id}`}
                  handler={() => deleteCategory(category.id)}
                  queryKey={['categories']}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pathname={location.pathname}
        totalPages={data.pagination.total_pages}
        currentPage={data.pagination.current_page}
      />
    </div>
  );
}

export default CategoriesPage;
