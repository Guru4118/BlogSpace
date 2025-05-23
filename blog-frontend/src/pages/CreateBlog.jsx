import { createBlog } from '../api/blogApi';
import BlogForm from '../components/BlogForm';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import QuickLink from './QuickLink';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function CreateBlog() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleCreate = async (data) => {
    await createBlog(data);
    navigate('/home');
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">

      {/* 🌸 Blurred Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-white to-pink-200 backdrop-blur-2xl z-0"></div>

      {/* 🌐 Main Content Container */}
      <div className="relative z-10 px-4 pt-10 max-w-7xl mx-auto">
        <Navbar />
        <br/>

        <h2 className="text-3xl font-bold mb-6 text-rose-600 text-center" data-aos="zoom-in">
          Create Blog
        </h2>

        <div data-aos="fade-up">
          <BlogForm onSubmit={handleCreate} />
        </div>

        <div className="mt-12" data-aos="fade-up">
          <QuickLink />
        </div>
      </div>
    </div>
  );
}
