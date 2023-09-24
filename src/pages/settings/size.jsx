import { useState, useEffect, useId } from 'react';

import SizeTable from './components/size-table';
import { getSizes } from '@/services';
import AddEditSizeModal from './components/add-edit-size-modal';

export default function Size() {
  const [sizes, setSizes] = useState([]);
  const modalId = useId();

  useEffect(() => {
    const fetchSize = async () => {
      const data = await getSizes();
      setSizes(data);
    };

    fetchSize();
  }, []);

  return (
    <>
      <div className="mb-12 flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />

        <AddEditSizeModal modalId={modalId} />
      </div>
      <SizeTable sizes={sizes} />
    </>
  );
}
