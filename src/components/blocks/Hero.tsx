import { motion } from "motion/react";
import { ArrowRight, Star, ShoppingBag, Clock } from "lucide-react";
import { Button } from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background with blur and modern shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 shadow-sm w-fit">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground/80">Terjual 10.000+ Box Bulan Ini</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
              Gipang Khas <br />
              <span className="text-accent italic">Cilegon.</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-serif text-foreground/80 -mt-2">
              Panganan <span className="font-bold underline decoration-accent/50 underline-offset-4">Wong Cilegon</span>
            </h2>

            {/* Description (Sales Focused) */}
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-lg mt-2">
              Perpaduan sempurna ketan renyah pilihan dan lumeran legit gula aren murni. Dibuat <span className="font-semibold text-foreground">fresh</span> setiap subuh dengan resep pusaka leluhur. Rasakan kemewahan rasa otentik yang lumer di mulut dan buat Anda selalu rindu untuk nambah lagi. Pesan sekarang sebelum kehabisan antrean produksi hari ini!
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-2">
              <Button size="lg" className="w-full sm:w-auto text-lg gap-2" onClick={() => window.open('https://wa.me/6281234567890', '_blank')}>
                 <ShoppingBag className="w-5 h-5" />
                 Pesan Sekarang (Stok Terbatas)
              </Button>
              <div className="flex items-center gap-2 text-sm text-foreground/60 font-medium">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Sisa 12 Box Hari Ini
              </div>
            </div>

            {/* Micro trust indicators */}
            <div className="flex items-center gap-6 mt-4 text-sm text-foreground/50">
               <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Fresh Production</div>
               <div className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 100% Halal</div>
               <div className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg> Siap Kirim</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Image Composition */}
            <div className="relative">
              {/* Main Product Image */}
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-white p-2 z-10 w-full lg:w-11/12 ml-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent z-10 mix-blend-overlay" />
                <img 
                  src="https://images.unsplash.com/photo-1621255857218-a3f2b4afb0e9?q=80&w=1200&auto=format&fit=crop" 
                  alt="Gipang Premium Cilegon" 
                  className="w-full h-full object-cover rounded-[1.5rem]"
                />
              </div>

              {/* Secondary Image floating bottom left for depth */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -bottom-8 lg:-bottom-12 -left-4 lg:left-0 w-1/2 aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-20 hidden md:block"
              >
                <img 
                  src="https://images.unsplash.com/photo-1632785532296-e26b15e1ed7d?q=80&w=600&auto=format&fit=crop" 
                  alt="Proses Pembuatan Gipang" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -right-4 bottom-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex items-center gap-4 z-30"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                   <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                   <p className="text-sm font-bold text-foreground">Rating Super!</p>
                   <p className="text-xs text-foreground/60">4.9/5 dari 2,000+ ulasan</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
