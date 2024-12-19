import React, { createContext, useContext } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextProps {
  notify: (message: string, type: ToastType, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const notify = (message: string, type: ToastType, options?: ToastOptions) => {
    toast(message, { type, ...options });
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <CustomToastContainer />
    </ToastContext.Provider>
  );
};

const CustomToastContainer = styled(ToastContainer).attrs({
  autoClose: 2000,
})`
  .Toastify__toast {
    border-radius: 8px;
    font-size: 14px;
    padding: 12px;
    color: var(--dark);
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
  }
`;

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
