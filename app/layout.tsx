import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>AdminLTE 3 | Dashboard</title>
      </head>
      <body className="hold-transition sidebar-mini layout-fixed">
        {children}
      </body>
    </html>
  );
}