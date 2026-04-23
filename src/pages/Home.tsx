import Hero from "../components/blocks/Hero";
import Benefits from "../components/blocks/Benefits";
import Testimonials from "../components/blocks/Testimonials";
import BlogSection from "../components/blocks/BlogSection";
import FloatingWhatsApp from "../components/blocks/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Testimonials />
      <BlogSection />
      
      {/* Urgency CTA Bottom */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="font-serif text-5xl font-bold text-white mb-6">
            Pesan Sekarang Sebelum Kehabisan
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Produksi gipang kami sangat terbatas karena menggunakan tenaga manual demi menjaga kualitas rasa. Amankan pesanan Anda hari ini.
          </p>
          <a 
            href="https://wa.me/6281234567890" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center justify-center h-16 px-12 rounded-full bg-white text-accent font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
          >
            Pesan via WhatsApp
          </a>
        </div>
      </section>

      <FloatingWhatsApp />
    </>
  );
}
