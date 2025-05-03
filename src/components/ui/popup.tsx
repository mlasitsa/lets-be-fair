import { useEffect, useState } from 'react';

type PopUpProps = {
    show: string | boolean,
    name?: string | null,
    color? : string 
}

const Popup = ( {show, name = "No Name", color = "bg-black"} : PopUpProps) =>  {
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
    <div className={`${color} text-white p-4 rounded shadow fixed top-10 right-10 z-50`}>
      <h1>
        {
         display && name
        }
        </h1>
    </div>
  );
};

export default Popup;
