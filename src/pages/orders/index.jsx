import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Pagination from '@/components/pagination';
import Spinner from '@/components/spinner';
import { getOrders } from '@/services';

function Orders() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => getOrders({ page }),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <form>
          <input
            type="search"
            name="search"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </form>
      </div>

      <table className="table table-zebra table-lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((order, index) => (
            <tr
              key={index}
              className="hover cursor-pointer"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <th>{order.id}</th>
              <td>{order.order_date}</td>
              <td>{order.order_total}</td>
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

export default Orders;
47;
