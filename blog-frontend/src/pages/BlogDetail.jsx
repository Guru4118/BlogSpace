import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBlog, deleteBlog } from '../api/blogApi';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, Calendar, Edit2, Trash2, Share2, Bookmark, ArrowRight } from 'lucide-react';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);
  const [visible, setVisible] = useState(false);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAuthor = user && blog && (user._id === blog.author?._id || user.id === blog.author?._id);

  useEffect(() => {
    fetchBlog(id)
      .then(res => { setBlog(res.data); setTimeout(() => setVisible(true), 100); })
      .catch(console.error);
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    await deleteBlog(id);
    navigate('/home');
  };

  if (!blog) {
    return (
      <div style={{ background: 'white', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ maxWidth: '760px', margin: '60px auto', padding: '0 24px' }}>
          <div className="skeleton" style={{ height: '14px', width: '120px', marginBottom: '32px' }} />
          <div className="skeleton" style={{ height: '48px', marginBottom: '16px' }} />
          <div className="skeleton" style={{ height: '24px', width: '280px', marginBottom: '40px' }} />
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: '16px', marginBottom: '12px', width: i % 3 === 2 ? '70%' : '100%' }} />)}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(160deg, #F8FAFF 0%, #EFF6FF 60%, #F0F9FF 100%)',
        borderBottom: '1px solid #E2E8F0',
        padding: '52px 24px 48px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Link
            to="/blogs"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#64748B', textDecoration: 'none', marginBottom: '28px', fontWeight: '500' }}
          >
            <ArrowLeft size={14} /> Back to Articles
          </Link>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span className="badge badge-blue">Technology</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#94A3B8' }}>
              <Clock size={13} /> 5 min read
            </span>
          </div>

          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(28px, 5vw, 48px)',
            color: '#0F172A',
            lineHeight: '1.2',
            marginBottom: '24px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            {blog.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', fontWeight: '700' }}>
                {blog.author?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <p style={{ fontWeight: '600', color: '#0F172A', fontSize: '15px' }}>{blog.author?.username || 'Anonymous'}</p>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {isAuthor && (
                <>
                  <Link
                    to={`/blogs/edit/${id}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1.5px solid #E2E8F0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#334155', textDecoration: 'none', background: 'white', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#2563EB'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#334155'; }}
                  >
                    <Edit2 size={13} /> Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1.5px solid #FEE2E2', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#EF4444', background: '#FFF5F5', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FEE2E2'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#FFF5F5'; }}
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </>
              )}
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1.5px solid #E2E8F0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#334155', background: 'white', cursor: 'pointer' }}>
                <Share2 size={13} /> Share
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1.5px solid #E2E8F0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#334155', background: 'white', cursor: 'pointer' }}>
                <Bookmark size={13} /> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 60px', display: 'grid', gridTemplateColumns: '1fr 200px', gap: '48px', alignItems: 'start' }}>
        {/* Main content */}
        <div>
          <div
            className="prose-blog"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.7s ease 0.2s',
            }}
          >
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '28px', borderTop: '1px solid #E2E8F0' }}>
            {['Technology', 'Writing', 'Professional'].map(tag => (
              <span key={tag} className="badge badge-blue">{tag}</span>
            ))}
          </div>

          {/* Author bio */}
          <div style={{ marginTop: '32px', padding: '28px', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: '700', flexShrink: 0 }}>
                {blog.author?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <p style={{ fontWeight: '700', color: '#0F172A', fontSize: '16px', marginBottom: '4px' }}>Written by {blog.author?.username || 'Anonymous'}</p>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7' }}>A passionate writer sharing insights and expertise on BlogSpace. Follow for more thoughtful articles on technology and innovation.</p>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div style={{ marginTop: '48px' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: '#0F172A', marginBottom: '24px' }}>
              Join the Discussion
            </h2>
            <CommentForm blogId={id} onCommentPosted={() => setRefreshComments(r => !r)} />
            <div style={{ marginTop: '28px' }}>
              <CommentList blogId={id} key={String(refreshComments)} />
            </div>
          </div>
        </div>

        {/* Sticky sidebar */}
        <div style={{ position: 'sticky', top: '88px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '20px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>Table of Contents</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Introduction', 'Key Insights', 'Practical Applications', 'Conclusion'].map((item, i) => (
                <a key={i} href="#" style={{ fontSize: '13px', color: '#64748B', textDecoration: 'none', padding: '6px 10px', borderRadius: '6px', transition: 'all 0.15s', display: 'block' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#2563EB'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748B'; }}
                >{item}</a>
              ))}
            </div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #F0F9FF)', borderRadius: '14px', padding: '20px', border: '1px solid #BFDBFE' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#1D4ED8', marginBottom: '8px' }}>Enjoying this article?</p>
            <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '14px', lineHeight: '1.6' }}>Write your own stories on BlogSpace for free.</p>
            <Link to="/blogs/create" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '13px', padding: '10px 16px' }}>
              Start Writing
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
