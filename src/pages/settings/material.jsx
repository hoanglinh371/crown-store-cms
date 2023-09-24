import { useState, useEffect, useId } from 'react';

import MaterialTable from './components/material-table';
import { getMaterials } from '@/services';
import AddEditMaterialModal from './components/add-edit-material-modal';

export default function Material() {
  const [materials, setMaterials] = useState([]);
  const modalId = useId();

  useEffect(() => {
    const fetchColors = async () => {
      const data = await getMaterials();
      setMaterials(data);
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

        <AddEditMaterialModal modalId={modalId} />
      </div>
      <MaterialTable materials={materials} />
    </>
  );
}
