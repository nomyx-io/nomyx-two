"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          borderRadius: "0px",
          border: "1px solid rgba(10, 17, 40, 0.14)",
        },
      }}
    />
  );
}
