import { useEffect, useState } from 'react';

const Popup = ({ show, name }: { show: string | boolean; name?: string | null }) =>  {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (show) {
      setDisplay(true);
      const timeout = setTimeout(() => {
        setDisplay(false);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!display) return null;

  return (
    <div className="bg-white text-black p-4 rounded shadow fixed top-10 right-10 z-50">
      <h1>
        {
         display && name
        }
        </h1>
    </div>
  );
};

export default Popup;
