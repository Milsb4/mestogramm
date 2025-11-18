import  Head  from "next/head";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "@/components/BootstrapClient";
import { interRegular, interBlack, interMedium } from "../fonts";
import icon from "@/public/icon.svg";
import "./globals.css";

import { UserProvider } from "@/utils/context/UserContext";


export const metadata: Metadata = {
  title: "Mestogram",
  description: "App for photographer and design",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${interRegular.variable} ${interBlack.variable} ${interMedium.variable}`}
    >
      <head>
        <link
          rel="icon"
          href={icon.src}
        />
      </head>
      <body className={interRegular.className}>
        <UserProvider>
          {children}
          <BootstrapClient />
        </UserProvider>
      </body>
    </html>
  );
}
