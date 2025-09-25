import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Hero />
      <Footer />
    </div>
  );
}
