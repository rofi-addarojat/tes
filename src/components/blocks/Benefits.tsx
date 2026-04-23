import { motion } from "motion/react";
import { CheckCircle2, Leaf, Heart, Award } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Resep Leluhur Asli",
      desc: "Tidak ada kompromi. Kami menjaga keaslian rasa turun temurun sejak 1980.",
      icon: <Award className="w-8 h-8 text-accent" />,
      colSpan: "col-span-1 md:col-span-2 shadow-lg bg-white",
      image: "https://images.unsplash.com/photo-1627582455982-f5c71120409a?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "100% Gula Aren",
      desc: "Manisnya alami, legit dan tidak bikin giung.",
      icon: <Leaf className="w-8 h-8 text-white" />,
      colSpan: "col-span-1 bg-accent text-white shadow-xl shadow-accent/20",
    },
    {
      title: "Dibuat dengan Cinta",
      desc: "Diolah oleh tangan-tangan terampil pembuat gipang berpengalaman.",
      icon: <Heart className="w-8 h-8 text-accent" />,
      colSpan: "col-span-1 bg-white shadow-lg",
    },
    {
      title: "Kualitas Premium",
      desc: "Renyah maksimal, kemasan elegan, cocok untuk hantaran.",
      icon: <CheckCircle2 className="w-8 h-8 text-accent" />,
      colSpan: "col-span-1 md:col-span-2 shadow-lg bg-white",
      image: "https://images.unsplash.com/photo-1605330831671-55097893eddc?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="keunggulan" className="py-24 bg-white/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold tracking-wider text-accent uppercase mb-4 block">Kenapa Memilih Kami?</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Bukan Gipang Biasa. Ini <span className="italic text-accent">Karya Seni.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-3xl p-8 relative overflow-hidden group ${item.colSpan}`}
            >
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div>
                  <div className="mb-6">{item.icon}</div>
                  <h3 className={`text-2xl font-bold mb-3 ${item.colSpan.includes('bg-accent') ? 'text-white' : 'text-foreground'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-lg opacity-90 ${item.colSpan.includes('bg-accent') ? 'text-white/90' : 'text-foreground/70'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
              
              {item.image && (
                <>
                  <div className="absolute top-0 right-0 w-1/2 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white z-10" />
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
