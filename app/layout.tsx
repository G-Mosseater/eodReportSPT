import "./globals.css";
import MainNavigation from "./components/navigation/mainNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainNavigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
