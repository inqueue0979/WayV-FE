import "../globals.css";
import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";

export const metadata = {
  title: "웹브릿지 대시보드",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <section>
        <Navbar />
        {children}
        <Footer />
    </section>
  );
}
