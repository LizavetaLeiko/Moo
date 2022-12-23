import React from "react";

const useOutsideClick = ({ setSearch }: any) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = () => {
      setSearch(undefined);
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return ref;
};

export default useOutsideClick;