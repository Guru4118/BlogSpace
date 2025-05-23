import { useEffect, useState } from 'react';
import { fetchBlog, updateBlog } from '../api/blogApi';
import BlogForm from '../components/BlogForm';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog(id)
      .then(res => setBlog(res.data))
      .catch(console.error);
  }, [id]);

  const handleUpdate = async (data) => {
    await updateBlog(id, data);
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-white to-pink-200 backdrop-blur-2xl z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 px-4 pt-10 max-w-7xl mx-auto">
        <Navbar />
        <div className="mt-8 p-6 bg-white bg-opacity-90 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Edit Blog</h2>
          {blog ? (
            <BlogForm onSubmit={handleUpdate} initialData={blog} />
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
