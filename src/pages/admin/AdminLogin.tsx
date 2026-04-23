import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { loginWithGoogle } from "../../lib/firebase";
import { useAuth } from "../../lib/AuthContext";
import { Button } from "../../components/ui/Button";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user && isAdmin) {
    return <Navigate to="/admin/posts" replace />;
  }

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const u = await loginWithGoogle();
      if (u.email === 'masroficom@gmail.com') {
        navigate("/admin/posts");
      } else {
        setError("Anda bukan administrator.");
      }
    } catch (err: any) {
      setError("Gagal login: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 border border-t-[8px] border-accent">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Login Admin</h1>
          <p className="text-gray-500">Masuk untuk mengelola konten Gipang</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button 
          className="w-full justify-between pr-2 pl-4 h-14 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-none font-sans"
          onClick={handleLogin}
          disabled={isLoading}
        >
          <span className="flex items-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Masuk dengan Google
          </span>
          {isLoading ? (
            <span className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          ) : (
            <span className="bg-gray-100 p-2 rounded-full">&rarr;</span>
          )}
        </Button>
      </div>
    </div>
  );
}
