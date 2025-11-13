import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from '@/components/BootstrapClient';
import { interRegular, interBlack, interMedium } from '../fonts'
import "./globals.css";
import { CardProvider } from "@/utils/context/CardContext";
import { UserProvider } from "@/utils/context/UserContex";

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
    <html lang="ru" className={`${interRegular.variable} ${interBlack.variable} ${interMedium.variable}`}>
      <body
       className={interRegular.className}
      >
         <UserProvider>
          {children}
          <BootstrapClient />
        </UserProvider>
      </body>
    </html>
  );
}
