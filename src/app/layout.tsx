import { ReactNode } from "react";
import "./globals.css";
import Login from "@components/Login";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "@/theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={defaultTheme}>
            <Login></Login>
          </ThemeProvider>
        </AppRouterCacheProvider>

        {children}
      </body>
    </html>
  );
}
