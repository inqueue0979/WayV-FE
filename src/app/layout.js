import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer.js";
import Navbar from "./components/Navbar.js";

export const metadata = {
  title: "WayV 4.20",
  description: "SK LOOKIE WayV 4.20",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
