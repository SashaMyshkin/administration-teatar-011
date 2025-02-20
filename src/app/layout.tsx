import { ReactNode } from "react";
import "./globals.css";
import Login from "@/app/components/Login";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "@/theme";
import { auth } from "@/auth";
import { AlertProvider } from "@components/AlertProvider";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={defaultTheme}>
            {!session ? <AlertProvider><Login /></AlertProvider>: children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
