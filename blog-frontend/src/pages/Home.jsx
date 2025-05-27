import { useEffect, useState } from 'react';
import { fetchBlogs } from '../api/blogApi';
import BlogCard from '../components/BlogCard';
import Navbar from "../components/Navbar";
import QuickLinks from './QuickLink';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchBlogs()
      .then(res => setBlogs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false)); // stop loading when done
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-pink-100">
        <div className="text-rose-600 text-xl font-semibold animate-pulse">
          Loading blogs...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">

     
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-white to-pink-200 backdrop-blur-2xl z-0"></div>

     
      <div className="relative z-10 px-4 pt-10 max-w-7xl mx-auto">
        <Navbar />
        <br/>
        <h1 className="text-3xl font-bold mb-8 text-center text-rose-600" data-aos="fade-up">
          Featured Blogs
        </h1>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              data-aos='zoom-in' 
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        <div className="mt-12" data-aos="fade-up">
          <QuickLinks />
        </div>
      </div>
    </div>
  );
}
