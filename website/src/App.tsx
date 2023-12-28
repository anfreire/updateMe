import { Route, Routes } from "react-router-dom";
import useColorScheme from "./hooks/useColorScheme";
import NavBar from "./layout/navbar";
import { Suspense, lazy, useEffect } from "react";

const DynamicRoutes = () => {
  const Home = lazy(() => import("./pages/home"));
  const NotFound = lazy(() => import("./pages/404"));
  const Android = lazy(() => import("./pages/android"));
  const AdBlock = lazy(() => import("./pages/adblock"));
  const Music = lazy(() => import("./pages/music"));
  const Cinema = lazy(() => import("./pages/cinema"));
  const Microsoft = lazy(() => import("./pages/microsoft"));

  return {
    Home,
    NotFound,
    Android,
    AdBlock,
    Music,
    Cinema,
    Microsoft,
  };
};

export default function App() {
  const colorScheme = useColorScheme();
  const Dynamic = DynamicRoutes();

  useEffect(() => {
    colorScheme === "dark" && document.documentElement.classList.add("dark");
  }, [colorScheme]);

  return (
    <div
      className={`h-[100dvh] w-[100dvw] overflow-hidden bg-background text-foreground ${
        colorScheme === "dark" ? "dark" : ""
      }`}
    >
      <NavBar />
      <Suspense>
        <Routes>
          <Route path="/" element={<Dynamic.Home />}></Route>
          <Route path="/android" element={<Dynamic.Android />}></Route>
          <Route path="/adblock" element={<Dynamic.AdBlock />}></Route>
          <Route path="/music" element={<Dynamic.Music />}></Route>
          <Route path="/cinema" element={<Dynamic.Cinema />}></Route>
          <Route path="/microsoft" element={<Dynamic.Microsoft />}></Route>
          <Route path="*" element={<Dynamic.NotFound />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
