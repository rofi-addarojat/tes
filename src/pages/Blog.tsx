import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { getAllPosts, Post } from "../lib/api";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl text-center mx-auto mb-20">
        <h1 className="font-serif text-5xl font-bold text-foreground mb-6">Jurnal Gipang</h1>
        <p className="text-xl text-foreground/70">
          Kumpulan cerita, resep, dan wawasan seputar camilan tradisional Banten.
        </p>
      </div>

      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {[1, 2, 3, 4, 5, 6].map(i => (
             <div key={i} className="animate-pulse bg-black/5 rounded-3xl h-96"></div>
           ))}
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                <p className="text-foreground/70 mb-6 line-clamp-3">
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
  );
}
