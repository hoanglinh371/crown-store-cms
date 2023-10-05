import { useQuery } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getUsers } from '@/services';

import Pagination from '@/components/pagination';
import Spinner from '@/components/spinner';

const UsersPage = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ['users', { page, search }],
    queryFn: () => getUsers({ page, search }),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-12">
      <form>
        <input
          type="search"
          name="search"
          placeholder="Search here..."
          className="input input-bordered w-full max-w-sm"
        />
      </form>

      <table className="table table-zebra table-lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.data.users.map((user, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
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
};

export default UsersPage;
