"use client";
import * as React from "react";
import { Box } from "@mui/material";
import { SessionProvider } from "next-auth/react";

export default function ThemeRegistry({ children }) {
  return (
    <main>
      <Box>
        <SessionProvider>{children}</SessionProvider>
      </Box>
    </main>
  );
}
