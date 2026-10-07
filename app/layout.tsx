import type { Metadata, Viewport } from "next";
import { Inter, Marcellus } from "next/font/google";
import { TabBar } from "@/components/TabBar";
import "./globals.css";

const marcellus = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-marcellus" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "El Falla · El jurado de la afición",
  description:
    "Puntúa cada actuación del COAC, descubre qué opina El Palco y juega la porra con tus amigos. Iniciativa independiente.",
  applicationName: "El Falla",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#6b0d26",
};

// Aplica el modo sala antes de pintar, para que no haya parpadeo.
const themeScript = `try{if(localStorage.getItem("elfalla:tema")==="sala")document.documentElement.dataset.theme="sala"}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${marcellus.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <div className="mx-auto flex min-h-dvh max-w-[480px] flex-col">
          <main className="flex-1 pb-24">{children}</main>
          <TabBar />
        </div>
      </body>
    </html>
  );
}
