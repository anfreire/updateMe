import { useEffect, useState } from "react";

function getColorScheme(): "light" | "dark" {
  const storedTheme = localStorage.getItem("color-scheme");
  const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (storedTheme) return storedTheme === "light" ? "light" : "dark";
  return themeQuery.matches ? "dark" : "light";
}

function saveColorScheme(theme: "light" | "dark") {
  localStorage.setItem("color-scheme", theme);
  if (theme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  return theme;
}

function useColorScheme(): {
  colorScheme: "light" | "dark";
  toggle: () => void;
} {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(
    getColorScheme(),
  );

  const toggle = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    saveColorScheme(colorScheme);
  }, [colorScheme]);

  return { colorScheme, toggle };
}

export { useColorScheme };
