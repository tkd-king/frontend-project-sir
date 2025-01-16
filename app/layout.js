import { Inter } from "next/font/google";
import { NextUIProvider } from '@nextui-org/react'; // Import NextUIProvider
import "./globals.css";
import { UniformContextProvider } from "@/context/UniformContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " Taekwondo-zone Best Gloves and Protective Gears in Pakistan",
  description: "This taekwondo uniform is made from lightweight, durable fabric, perfect for training and competitions. Available in all sizes, with a free belt included. Ideal for kids, adults, and professionals.",
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
