import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { getLatestPosts, Post } from "../../lib/api";
import { Button } from "../ui/Button";

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestPosts(3).then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold tracking-wider text-accent uppercase mb-4 block">Artikel & Wawasan</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Cerita di Balik <span className="italic text-accent">Kerenyahan.</span>
            </h2>
          </div>
          <Link to="/blog">
            <Button variant="outline" size="lg">Lihat Semua Artikel</Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-black/5 rounded-3xl h-96"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer flex flex-col"
              >
                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="overflow-hidden rounded-[2rem] aspect-[4/3] mb-6">
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                    <span>{post.categories[0]}</span>
                    <span className="w-1 h-1 rounded-full bg-black/20"></span>
                    <span className="text-foreground/50">{post.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-foreground/70 mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto font-semibold text-sm hover:underline underline-offset-4 decoration-accent">
                    Baca Selengkapnya &rarr;
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
