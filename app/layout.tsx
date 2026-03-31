'use client'
import "./globals.css";
import MainNavigation from "./components/navigation/mainNavigation";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <MainNavigation />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
