import { useState, useEffect } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T = [] as T
) {
  const [data, setData] = useState<T>(defaultValue);

  function setItem(data: string) {
    localStorage.setItem(key, data);
  }

  useEffect(() => {
    const item = localStorage.getItem(key);

    if (item) {
      setData(JSON.parse(item));
    }
  }, [key]);

  return { data, setItem };
}
