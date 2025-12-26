// app/layout.tsx
import "./globals.css";
// import Header from "./Header";
import Providers from "./providers";

export const metadata = {
  title: "Edward's Log",
  description: "A way to track and visualize seizure data for pets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {/* <Header /> */}
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
