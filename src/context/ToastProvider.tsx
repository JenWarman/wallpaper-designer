import { useState } from "react";
import { Toast } from "../components/Toast/Toast";
import { ToastContext } from "./ToastContext";

export type Toast = {
  id: string;
  message: string;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = crypto.randomUUID()

    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)

  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message}/>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
