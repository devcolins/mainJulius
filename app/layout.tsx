import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Venity Mall",
  description: "My Online Store ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
          <ConvexClientProvider>
            <Toaster />

            {children}
          </ConvexClientProvider>
        
      </body>
    </html>
  );
}
