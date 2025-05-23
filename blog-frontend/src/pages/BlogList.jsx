import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../api/blogApi';
import Navbar from '../components/Navbar';
import QuickLink from './QuickLink';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchBlogs()
      .then(res => setBlogs(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">

      {/* 🌸 Blurred Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-white to-pink-200 backdrop-blur-2xl z-0"></div>

      {/* 🌐 Main Content Container */}
      <div className="relative z-10 px-4 pt-10 max-w-7xl mx-auto">
        <Navbar />
        <br />
        <h1 className="text-3xl font-bold mb-8 text-center text-rose-600" data-aos="none">
          All Blogs
        </h1>

        {blogs.length === 0 && (
          <p className="text-center text-gray-600" data-aos="fade-in">No blogs found.</p>
        )}

        <ul className="space-y-6">
          {blogs.map((blog, index) => (
            <li
              key={blog._id}
              className="bg-white bg-opacity-90 p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
              data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
            >
              <Link
                to={`/blogs/${blog._id}`}
                className="text-xl font-semibold text-pink-700 hover:underline"
              >
                {blog.title}
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                By: {blog.author?.username || 'Unknown'}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12" data-aos="fade-up">
          <QuickLink />
        </div>
      </div>
    </div>
  );
}
