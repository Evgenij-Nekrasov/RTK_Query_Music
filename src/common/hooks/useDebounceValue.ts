import { useEffect, useState } from 'react';

export const useDebounceValue = <T>(value: T, delay: number = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => setDebounced(value), delay);
    return () => clearInterval(handleDebounce);
  }, [value, delay]);

  return debounced;
};
