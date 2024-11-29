import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer.js";
import Navbar from "./components/Navbar.js";

import SessionProviderWrapper from "./components/SessionProviderWrapper";

export const metadata = {
  title: "Webridge | KWCAG 검사 툴킷",
  description: "웹브릿지는 한국형 웹 접근성을 검사하는 툴킷입니다.",
};

export default function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProviderWrapper>
          <Navbar />
          {children}
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
