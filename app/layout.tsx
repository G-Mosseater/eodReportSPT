import "./globals.css";
import MainNavigation from "./components/navigation/mainNavigation";
import SessionProviderWrapper from "./components/SessionWrapper";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
