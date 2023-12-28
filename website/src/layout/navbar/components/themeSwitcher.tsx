import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { Sun, Moon } from "lucide-react";
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected
      size="lg"
      isSelected={theme === "dark"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      color="secondary"
      thumbIcon={({ isSelected }) =>
        isSelected ? (
          <Moon className="size-4 stroke-black stroke-2" />
        ) : (
          <Sun className="size-4 stroke-black stroke-2" />
        )
      }
    ></Switch>
  );
}
