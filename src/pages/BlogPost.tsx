import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { getPostBySlug, getLatestPosts, Post } from "../lib/api";
import { ArrowLeft } from "lucide-react";
import FloatingWhatsApp from "../components/blocks/FloatingWhatsApp";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      window.scrollTo(0, 0);
      getPostBySlug(slug).then(data => {
        setPost(data);
        setLoading(false);
      });
      // Fetch related
      getLatestPosts(3).then(data => {
        setRelated(data.filter(p => p.slug !== slug).slice(0, 2));
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 max-w-3xl mx-auto px-4">
        <div className="animate-pulse flex flex-col gap-6">
          <div className="h-8 bg-black/5 rounded w-1/4"></div>
          <div className="h-16 bg-black/5 rounded w-full"></div>
          <div className="h-96 bg-black/5 rounded-3xl w-full my-8"></div>
          <div className="h-4 bg-black/5 rounded w-full"></div>
          <div className="h-4 bg-black/5 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Artikel Tidak Ditemukan</h1>
        <Link to="/blog" className="text-accent hover:underline">Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <>
      <article className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-accent mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Jurnal
        </Link>
        
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-accent mb-6">
          <span>{post.categories[0]}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-black/20"></span>
          <span className="text-foreground/50">{post.date}</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground mb-8">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12 border-b border-black/5 pb-8">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
            {post.authorName.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-foreground">{post.authorName}</div>
            <div className="text-sm text-foreground/50">Penulis</div>
          </div>
        </div>

        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-xl border border-black/5">
          <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Prose Content */}
        <div 
          className="prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:text-foreground/80 prose-a:text-accent"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-20 bg-white/50 border-t border-black/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold mb-12">Baca Juga</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {related.map(rel => (
                <Link key={rel.id} to={`/blog/${rel.slug}`} className="group flex gap-6 items-center">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={rel.featuredImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight mb-2 line-clamp-2">
                       {rel.title}
                    </h3>
                    <p className="text-sm text-foreground/50">{rel.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FloatingWhatsApp />
    </>
  );
}
