import { Suspense } from "react";
import Footer from "../constants/Footer";
import { Header } from "../constants/Header";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Suspense>
        <Header />
      </Suspense>
      <Suspense>{children}</Suspense>

      <Suspense>
        <Footer />
      </Suspense>
    </section>
  );
}
