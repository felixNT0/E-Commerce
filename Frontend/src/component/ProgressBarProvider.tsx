"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="3px"
      color="oklch(76.9% 0.188 70.08);"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <>{children}</>
    </ProgressProvider>
  );
};

export default ProgressBarProvider;
