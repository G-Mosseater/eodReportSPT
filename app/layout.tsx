import "./globals.css";
import MainNavigation from "./components/navigation/mainNavigation";
import SessionProviderWrapper from "./components/SessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
        <MainNavigation />
          <main>{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
