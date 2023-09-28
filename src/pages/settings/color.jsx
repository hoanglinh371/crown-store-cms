import { useQuery } from '@tanstack/react-query';

import { getColors } from '@/services/color';

import AddEditColorModal from './components/add-edit-color-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

export default function Color() {
  const { data, isLoading } = useQuery({
    queryKey: ['colors'],
    queryFn: () => getColors(),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="self-end">
        <AddEditColorModal modalId="add-color-modal" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <table className="table table-zebra table-lg">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Color</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((color, index) => (
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>{color.color_name}</td>
                <td>
                  <div
                    className="h-6 w-6 rounded-full"
                    style={{
                      backgroundColor: color.color_hex_code,
                    }}
                  ></div>
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
      )}
    </div>
  );
}
