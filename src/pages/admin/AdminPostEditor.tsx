import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, Save, FileText } from "lucide-react";

export default function AdminPostEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    authorName: "Redaksi Gipang",
    categories: "",
    status: "published",
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      getDoc(doc(db, "posts", id)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setFormData({
            title: data.title || "",
            slug: data.slug || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
            featuredImage: data.featuredImage || "",
            authorName: data.authorName || "",
            categories: data.categories ? data.categories.join(", ") : "",
            status: data.status || "published",
            date: data.date || ""
          });
        }
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // auto slugify title if we are writing the title and slug is empty or matches auto slug
      ...(name === 'title' && {
         slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      })
    }));
  };

  const handleSave = async (status: "published" | "draft") => {
    setSaving(true);
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        excerpt: formData.excerpt,
        content: formData.content, // Real app: you would use a rich text editor here
        featuredImage: formData.featuredImage,
        authorName: formData.authorName,
        categories: formData.categories.split(",").map(s => s.trim()).filter(Boolean),
        status,
        date: formData.date,
        ...(isNew ? { createdAt: serverTimestamp() } : { updatedAt: serverTimestamp() })
      };

      if (isNew) {
        await addDoc(collection(db, "posts"), postData);
      } else {
        await setDoc(doc(db, "posts", id as string), postData, { merge: true });
      }
      navigate("/admin/posts");
    } catch (e: any) {
      alert("Error saving: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pb-24">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <button onClick={() => navigate("/admin/posts")} className="text-gray-500 hover:text-gray-900 flex items-center gap-1 text-sm font-medium mb-4">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{isNew ? 'Tambah Artikel Baru' : 'Edit Artikel'}</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving} className="gap-2">
            <FileText className="w-4 h-4" /> Simpan Draft
          </Button>
          <Button onClick={() => handleSave("published")} disabled={saving} className="gap-2 bg-green-600 hover:bg-green-700 shadow-none border-transparent text-white">
            <Save className="w-4 h-4" /> {isNew ? 'Terbitkan' : 'Update & Terbitkan'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel</label>
            <input 
              name="title" value={formData.title} onChange={handleChange}
              placeholder="Masukkan judul disini..."
              className="w-full text-2xl font-bold border-gray-300 border rounded-md p-3 focus:ring-accent focus:border-accent"
              required
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Konten (HTML didukung)</label>
            {/* In a real scenario, integrate a rich-text editor like Quill, TipTap, or React-Quill */}
            <textarea 
              name="content" value={formData.content} onChange={handleChange}
              rows={15}
              placeholder="<p>Mulai menulis cerita Anda disini...</p>"
              className="w-full font-mono text-sm border-gray-300 border rounded-md p-3 focus:ring-accent focus:border-accent"
            />
            <p className="text-xs text-gray-400 mt-2">Untuk sementara, gunakan tag HTML seperti &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Kutipan Singkat (Excerpt)</label>
            <textarea 
              name="excerpt" value={formData.excerpt} onChange={handleChange}
              rows={3}
              placeholder="Tuliskan ringkasan 1-2 kalimat untuk ditampilkan di halaman blog."
              className="w-full border-gray-300 border rounded-md p-2 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Pengaturan Publikasi</h3>
            
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full border-gray-300 border rounded-md p-2">
                     <option value="published">Diterbitkan (Publik)</option>
                     <option value="draft">Draft (Sembunyi)</option>
                  </select>
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                  <input name="slug" value={formData.slug} onChange={handleChange} className="w-full border-gray-300 border rounded-md p-2" />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Tampil</label>
                  <input name="date" value={formData.date} onChange={handleChange} className="w-full border-gray-300 border rounded-md p-2" />
               </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Media Utama</h3>
            
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar Featured</label>
                  <input name="featuredImage" value={formData.featuredImage} onChange={handleChange} placeholder="https://images.unsplash..." className="w-full border-gray-300 border rounded-md p-2" />
               </div>
               {formData.featuredImage && (
                 <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 aspect-video">
                    <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                 </div>
               )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Kategori & Penulis</h3>
            
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Athor</label>
                  <input name="authorName" value={formData.authorName} onChange={handleChange} className="w-full border-gray-300 border rounded-md p-2" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori (Pisah koma)</label>
                  <input name="categories" value={formData.categories} onChange={handleChange} placeholder="Tradisi, Resep" className="w-full border-gray-300 border rounded-md p-2" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
