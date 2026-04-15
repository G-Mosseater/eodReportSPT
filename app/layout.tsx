import "./globals.css";
import MainNavigation from "./components/navigation/mainNavigation";
import SessionProviderWrapper from "./components/SessionWrapper";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className=" flex flex-col min-h-screen">
        <div id="modal"></div>
        <div id="drawer"></div>
        <SessionProviderWrapper>
          <MainNavigation />
          <main>{children}</main>
        </SessionProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}
