import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <NextUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NextUIProvider>
  </RecoilRoot>,
);
