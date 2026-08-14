import "./globals.css";

export const metadata = {
  title: "OpenPrompt",
  description: "Open-source AI prompt testing and evaluation platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
