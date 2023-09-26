import { useEffect, useState, useId } from 'react';

import EditProductModelTrigger from './components/edit-products-modal-trigger';
import ProductsTable from './components/products-table';
import { getProducts } from '@/services';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const modalId = useId();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="mb-12 flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <EditProductModelTrigger modalId={modalId} />
      </div>
      <ProductsTable products={products} />
    </>
  );
};

export default ProductsPage;
