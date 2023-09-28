import { useQuery } from '@tanstack/react-query';

import { getSizes } from '@/services';

import AddEditSizeModal from './components/add-edit-size-modal';
import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';

export default function Size() {
  const { data, isLoading } = useQuery({
    queryKey: ['sizes'],
    queryFn: () => getSizes(),
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="self-end">
        <AddEditSizeModal modalId="add-size-modal" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <table className="table table-zebra table-lg">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Width</th>
              <th>Height</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((size, index) => (
              <tr key={index} className="hover">
                <th>{index + 1}</th>
                <td>{size.size_value}</td>
                <td>{size.width}</td>
                <td>{size.height}</td>
                <td>
                  <AddEditSizeModal modalId={`size-${size.id}`} size={size} />
                </td>
                <td>
                  <DeleteModalTrigger modalId="delete-size-modal" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
