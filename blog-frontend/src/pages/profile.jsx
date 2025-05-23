import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import QuickLinks from './QuickLink';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    if (!token) return navigate('/login');

    const fetchUserAndBlogs = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const userRes = await axios.get('https://blogspace-b5td.onrender.com/api/auth/me', config);
        setUser(userRes.data);

        const blogRes = await axios.get(`https://blogspace-b5td.onrender.com/api/blogs?author=${userRes.data._id}`, config);
        setBlogs(blogRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserAndBlogs();
  }, [token, navigate]);

  const fetchUserBlogs = async (userId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`https://blogspace-b5td.onrender.com/api/blogs?author=${userId}`, config);
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateBlog = () => {
    navigate('/blogs/create');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleEdit = (id) => {
    navigate(`/blogs/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm || !user) return;

    try {
      await axios.delete(`https://blogspace-b5td.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUserBlogs(user._id);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* 🌸 Gradient Blurred Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-white to-pink-200 backdrop-blur-2xl z-0"></div>

      {/* 🌐 Main Container */}
      
    
      <div className="relative z-10 px-4 pt-10 max-w-7xl mx-auto">
        <Navbar />
        <br />
        <h1
          className="text-3xl font-bold mb-4 text-pink-600"
          data-aos="fade-up"
        >
          Welcome, {user.username} 👋
        </h1>

        <h2
          className="text-xl font-semibold mb-2 text-gray-800"
          data-aos="fade-up"
        >
          Your Blogs
        </h2>

        {blogs.length > 0 ? (
          <ul className="space-y-4" data-aos="fade-up">
            {blogs.map((blog) => (
              <li
                key={blog._id}
                className="p-4 border rounded shadow-sm bg-white"
              >
                <h3 className="text-lg font-bold text-pink-700">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Created on {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-2 flex space-x-3">
                  <button
                    onClick={() => handleEdit(blog._id)}
                    className="px-4 py-1 bg-pink-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded"
            data-aos="fade-up"
          >
            <p className="text-yellow-700 font-medium">
              You haven't written any blogs yet.
            </p>
            <p className="text-yellow-600">
              Let your voice be heard. Share your thoughts and inspire others!
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mt-6" data-aos="fade-up">
          <button
            onClick={handleCreateBlog}
            className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
          >
            Create Blog
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <div className="mt-12" data-aos="fade-up">
                  <QuickLinks />
                </div>
      </div>
    </div>
  );
}
