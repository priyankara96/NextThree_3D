import "./globals.css";

export const metadata = {
  title: "Chitra Lane Welfare Society",
  description: "For children with special needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
