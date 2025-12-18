import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children, className = "" }) {
  return (
    <>
      <Navbar />
      <main
        className={`min-h-screen relative mx-auto bg-secondary ${className}`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
