import { Fragment } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/services';

import AddEditCategoryModal from './components/add-edit-categoty-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['categories', page],
    queryFn: () => getCategories({ page }),
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
                    <img
                      src={category.category_image}
                      alt="category_image"
                      width={300}
                      height={300}
                    />
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
          <div className="join self-center">
            {Array.from({ length: data.pagination.total_pages }, (_, index) => (
              <Link
                key={index}
                to={`/categories?page=${index + 1}`}
                className={`btn join-item btn-sm ${
                  data.pagination.current_page === index + 1 ? 'btn-active' : ''
                }`}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default CategoriesPage;
