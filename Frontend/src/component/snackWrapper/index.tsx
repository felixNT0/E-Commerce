// components/SnackbarWrapper.tsx
"use client";

import { SnackbarProvider } from "notistack";

const SnackbarWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};

export default SnackbarWrapper;
