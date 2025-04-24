import { Tektur } from "next/font/google";
import { metadata } from "./metadata";
import "../styles/globals.css";
import ClientLayout from "@/components/ClientLayout";

const tektur = Tektur({ subsets: ["latin"], variable: "--font-tektur" });

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={tektur.variable}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}