import React, { useEffect, useState } from "react";

export function useLocalStorageState(
  name: string,
  defaultValue?: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, _setValue] = useState("");
  useEffect(() => {
    _setValue(window.localStorage.getItem(name) || defaultValue || "");
  }, [name, defaultValue]);
  const setValue = (val: string | ((prevState: string) => string)) => {
    _setValue(val);

    if (typeof val === "string") {
      window.localStorage.setItem(name, val);
    } else {
      window.localStorage.setItem(name, val(value));
    }
  };

  return [value, setValue];
}
