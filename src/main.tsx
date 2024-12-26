import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { UserProvider } from "@/contexts/UserContext";
import { ToastProvider } from "@/contexts/ToastContext";
import "./i18n";
import { CategoriesProvider } from "./contexts/CategoriesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CategoriesProvider>
      <ToastProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ToastProvider>
    </CategoriesProvider>
  </StrictMode>
);
