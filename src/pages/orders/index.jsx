import { Fragment } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getOrders } from '@/services';

import Spinner from '@/components/spinner';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => getOrders({ page }),
  });

  return (
    <div className="flex flex-col gap-12">
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

      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
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
          <div className="join self-center">
            {Array.from({ length: data.pagination.total_pages }, (_, index) => (
              <Link
                key={index}
                to={`/orders?page=${index + 1}`}
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

export default Orders;
