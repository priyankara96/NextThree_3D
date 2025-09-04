import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MusicProvider } from "@/components/MusicProvider";
import MusicButton from "@/components/MusicButton"; // Not MusicProvider!

export const metadata = {
  title: "Chitra Lane Welfare Society",
  description: "For children with special needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MusicProvider>
          <Navbar />
          {children}
          <MusicButton />
          <Footer />
        </MusicProvider>
      </body>
    </html>
  );
}
