import { useEffect, useState } from "react";

function removeParam(param: string): null {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete(param);
  window.history.pushState({}, "", `?${urlParams.toString()}`);
  const cleanUrl = window.location.toString().replace("/?", "/");
  window.history.replaceState({}, "", cleanUrl);
  return null;
}

function setParam(param: string, value: string): string {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(param, value);
  window.history.pushState({}, "", `?${urlParams.toString()}`);
  return value;
}

function useUrlParam(param: string): {
  value: string | null;
  update: (value: string | null) => void;
} {
  const [value, setValue] = useState<string | null>(
    new URLSearchParams(window.location.search).get(param) || null,
  );

  useEffect(() => {
    const handlePopState = () => {
      setValue(new URLSearchParams(window.location.search).get(param) || null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [param]);

  const update = (value: string | null) => {
    if (value === null) setValue(() => removeParam(param));
    else setValue(() => setParam(param, value));
  };

  return { value, update };
}

export { useUrlParam };
