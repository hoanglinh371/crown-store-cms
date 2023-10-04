import { Fragment } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/services';

import AddEditCategoryModal from './components/add-edit-categoty-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';
import Pagination from '@/components/pagination';

const CategoriesPage = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('search') ?? '';

  const { data, isLoading } = useQuery({
    queryKey: ['categories', { page, search }],
    queryFn: () => getCategories({ page, search }),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <AddEditCategoryModal modalId="add-category-modal" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table table-zebra table-lg">
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
              {data.data.map((category, index) => (
                <tr key={index} className="hover">
                  <th>{category.id}</th>
                  <td>{category.category_name}</td>
                  <td>
                    <div className="w-32">
                      <img
                        src={category.category_image}
                        alt="category_image"
                        className="h-36 max-w-full"
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
                    <DeleteModalTrigger modalId="delete-category-modal" />
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
        </Fragment>
      )}
    </div>
  );
};

export default CategoriesPage;
