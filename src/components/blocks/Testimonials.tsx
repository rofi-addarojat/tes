import { motion } from "motion/react";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Budi Santoso",
      city: "Jakarta Selatan",
      quote: "Saya beli untuk oleh-oleh mertua. Katanya ini gipang paling enak yang pernah beliau makan. Renyahnya pas, manisnya nggak bikin sakit gigi.",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop"
    },
    {
      name: "Siti Aminah",
      city: "Serang, Banten",
      quote: "Sebagai orang asli Banten, saya tahu betul mana gipang asli dan mana yang asal-asalan. Gipang Premium ini beneran otentik. Pertahankan kualitasnya!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      name: "Deny Pratama",
      city: "Bandung",
      quote: "Iseng pesen karena lihat iklannya keren. Ternyata rasanya lebih keren lagi. Packingnya aman banget sampai Bandung nggak ada yang hancur.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    }
  ];

  return (
    <section id="testimoni" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Ribuan Lidah <span className="italic text-accent">Tidak Pernah Bohong.</span>
            </h2>
            <p className="text-lg text-foreground/70">
              Setiap harinya puluhan box meluncur ke seluruh Indonesia. Inilah kata mereka yang sudah membuktikan kelezatan Gipang Premium.
            </p>
          </div>
          <div className="flex gap-2 pb-2">
            <div className="flex flex-col items-end">
              <span className="text-3xl font-bold text-foreground">4.9/5</span>
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-black/5"
            >
              <div className="flex text-accent mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-8 text-lg">"{testi.quote}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={testi.image} alt={testi.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-foreground">{testi.name}</h4>
                  <p className="text-sm text-foreground/50">{testi.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
