import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative mx-auto">{children}</main>
      <Footer />
    </>
  );
}
