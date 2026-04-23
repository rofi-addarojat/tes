import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, Post } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { Edit, Plus, Trash2, Eye } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getAllPosts(true); // include drafts
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Yakin ingin menghapus artikel ini?")) {
      await deleteDoc(doc(db, "posts", id));
      fetchPosts();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Artikel</h1>
          <p className="text-gray-500 mt-1">Kelola semua artikel blog Anda disini.</p>
        </div>
        <Link to="/admin/posts/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Tambah Baru
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500 animate-pulse">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
             <Edit className="w-8 h-8 text-gray-400" />
           </div>
           <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada artikel</h3>
           <p className="text-gray-500 mb-6">Mulai tambahkan artikel pertama Anda untuk mengisi blog.</p>
           <Link to="/admin/posts/new">
             <Button>Buat Artikel Pertama</Button>
           </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 tracking-wider">
                <th className="px-6 py-4 font-medium">Judul</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 mb-1">{post.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                       post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                     }`}>
                       {post.status === 'published' ? 'Terbit' : 'Draft'}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    {post.status === 'published' && (
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-accent rounded-lg hover:bg-accent/10">
                        <Eye className="w-5 h-5" />
                      </a>
                    )}
                    <Link to={`/admin/posts/${post.id}`} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
