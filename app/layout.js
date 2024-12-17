import { Inter } from "next/font/google";
import { NextUIProvider } from '@nextui-org/react'; // Import NextUIProvider
import "./globals.css";
import { UniformContextProvider } from "@/context/UniformContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Taekwondozone0",
  description: "Available taekwondo uniforms here...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <UniformContextProvider >
        <NextUIProvider>  {/* Wrap the app with NextUIProvider */}
          {children}
        </NextUIProvider>
        </UniformContextProvider>
      </body>
    </html>
  );
}
