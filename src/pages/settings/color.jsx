import { useState, useEffect, useId } from 'react';

import ColorsTable from './components/colors-table';
import { getColors } from '../../services/color';
import AddEditColorModal from './components/add-edit-color-modal';

export default function Color() {
  const [colors, setColors] = useState([]);
  const modalId = useId();

  useEffect(() => {
    const fetchColors = async () => {
      const data = await getColors();
      setColors(data);
    };

    fetchColors();
  }, []);

  return (
    <>
      <div className="mb-12 flex items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />

        <AddEditColorModal modalId={modalId} />
      </div>
      <ColorsTable colors={colors} />
    </>
  );
}
