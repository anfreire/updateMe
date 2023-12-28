import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </NextUIProvider>
  </RecoilRoot>,
);
