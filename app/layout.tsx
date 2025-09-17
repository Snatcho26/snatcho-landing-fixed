import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Snatcho – Snatch the Best Deals",
  description: "Compare prices from Amazon, Flipkart, Blinkit, Zepto & more.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
