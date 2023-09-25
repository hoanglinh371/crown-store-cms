import { useEffect, useState } from 'react';

import ProductsTable from './components/products-table';
import { getProducts } from '../../services/products';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };
  return (
    <>
      <div className="mb-12 flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <button
          className="btn"
          onClick={() => document.getElementById('my_modal_3').showModal()}
        >
          open modal
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
      <ProductsTable products={products} />
    </>
  );
};

export default ProductsPage;
