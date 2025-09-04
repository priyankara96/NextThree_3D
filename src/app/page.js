import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeStorySection from "@/components/ThreeStorySection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      <div className="h-20" />
      {/* Lock scroll to this section only */}
      <ThreeStorySection />
      <Footer />
    </main>
  );
}
