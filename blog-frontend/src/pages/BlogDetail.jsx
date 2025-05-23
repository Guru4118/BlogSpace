import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBlog, deleteBlog } from '../api/blogApi';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Navbar from '../components/Navbar';
import QuickLink from './QuickLink';
import ReactMarkdown from 'react-markdown';


export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(() => {
    fetchBlog(id)
      .then(res => setBlog(res.data))
      .catch(console.error);
  }, [id]);

  const handleDelete = async () => {
    await deleteBlog(id);
    navigate('/');
  };

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Background Layer */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-white to-pink-200 backdrop-blur-2xl z-0"></div>

      {/* Content Layer */}
      <div className="relative z-10 px-4 pt-15 max-w-7xl mx-auto">
        <Navbar />
        <div className="mt-8 p-6 bg-white bg-opacity-90 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-pink-700 mb-1">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-4">By {blog.author?.username || "Unknown"}</p>
          <ReactMarkdown >{blog.content}</ReactMarkdown>



          <div className="mt-6">
            <h2 className="text-xl font-semibold text-pink-600 mb-2">Comments</h2>
            <CommentForm
              blogId={id}
              onCommentPosted={() => setRefreshComments(r => !r)}
            />
            <CommentList
              blogId={id}
              key={String(refreshComments)}
            />
          </div>
        </div>

        <QuickLink />
      </div>
    </div>
  );
}
