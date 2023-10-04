import { Fragment, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getProductsDetail } from '@/services';

import DeleteModalTrigger from '@/components/delete-modal-trigger';
import Spinner from '@/components/spinner';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`products`, id],
    queryFn: () => getProductsDetail(id),
  });
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <table className="table table-zebra table-lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.data.product_items.map((product, index) => (
                <tr key={index} className="hover">
                  <th>{product.id}</th>
                  <td>{product.sku}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      )}
    </div>
  );
}
