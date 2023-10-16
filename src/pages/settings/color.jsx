import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Pagination from '@/components/pagination';
import Spinner from '@/components/spinner';
import { getColors } from '@/services/color';

import AddEditColorModal from './components/add-edit-color-modal';

export default function Color() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['colors', { page }],
    queryFn: () => getColors({ page }),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-12">
      <div className="text-right">
        <AddEditColorModal modalId="add-color-modal" />
      </div>

      <table className="table table-zebra table-lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Color</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {data.data.colors.map((color) => (
            <tr key={color.id} className="hover">
              <th>{color.id}</th>
              <td>{color.color_name}</td>
              <td>
                <div
                  className="h-6 w-6 rounded-full"
                  style={{
                    backgroundColor: color.color_hex_code,
                  }}
                />
              </td>
              <td>
                <AddEditColorModal
                  modalId={`color-${color.id}`}
                  color={color}
                />
              </td>
              <td>
                <DeleteModalTrigger modalId="delete-color-modal" />
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
