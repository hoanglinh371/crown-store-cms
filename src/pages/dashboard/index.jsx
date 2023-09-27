import { useState } from 'react';

import BaseDialog from '@/components/dialog';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="btn" onClick={() => setIsOpen(true)}>
        Open
      </button>
      <BaseDialog isOpen={isOpen} closeDialog={() => setIsOpen(false)} />
    </div>
  );
}
