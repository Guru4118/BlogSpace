import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../api/blogApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Filter, Clock, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';

const TAGS = ['All', 'Technology', 'Design', 'Business', 'Science', 'Culture', 'Productivity'];

function BlogRow({ blog, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const colors = ['#EFF6FF', '#F0FDF4', '#FFF7ED', '#F5F3FF', '#FFF1F2', '#F0F9FF'];
  const accents = ['#2563EB', '#10B981', '#F97316', '#7C3AED', '#E11D48', '#0EA5E9'];
  const ci = index % colors.length;

  return (
    <article
      ref={ref}
      style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '28px',
        display: 'flex', gap: '24px', alignItems: 'flex-start',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s, box-shadow 0.2s ease`,
        cursor: 'pointer',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Number */}
      <div style={{
        width: '48px', height: '48px', flexShrink: 0,
        background: colors[ci],
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'DM Serif Display, serif',
        fontSize: '18px',
        color: accents[ci],
        fontWeight: '400',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span className="badge" style={{ background: `${accents[ci]}12`, color: accents[ci] }}>
            {TAGS[1 + (index % (TAGS.length - 1))]}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#94A3B8' }}>
            <Clock size={11} />
            {Math.max(2, Math.floor(Math.random() * 8))} min read
          </span>
        </div>
        <Link to={`/blogs/${blog._id}`} style={{ textDecoration: 'none' }}>
          <h2 style={{
            fontFamily: 'DM Serif Display, serif', fontSize: '20px',
            color: '#0F172A', lineHeight: '1.35',
            marginBottom: '8px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = accents[ci]}
          onMouseLeave={e => e.target.style.color = '#0F172A'}
          >
            {blog.title}
          </h2>
        </Link>
        <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {blog.content?.slice(0, 150)}...
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', background: `linear-gradient(135deg, ${accents[ci]}, ${accents[(ci + 1) % accents.length]})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: '700' }}>
              {blog.author?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>{blog.author?.username || 'Anonymous'}</span>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>·</span>
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <Link
            to={`/blogs/${blog._id}`}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: accents[ci], textDecoration: 'none' }}
          >
            Read Article <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    fetchBlogs()
      .then(res => setBlogs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    b.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <Navbar />

      {/* Page Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <BookOpen size={20} color="#2563EB" />
            <span className="badge badge-blue">All Articles</span>
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '42px', color: '#0F172A', marginBottom: '12px' }}>
            Explore the Collection
          </h1>
          <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '500px', lineHeight: '1.7' }}>
            Discover in-depth articles written by professionals across technology, design, business, and beyond.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Search + Filter Row */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              className="input-field"
              type="text"
              placeholder="Search articles, topics, authors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: '9px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                  border: activeTag === tag ? 'none' : '1.5px solid #E2E8F0',
                  background: activeTag === tag ? '#0F172A' : 'white',
                  color: activeTag === tag ? 'white' : '#64748B',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{tag}</button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', alignItems: 'center' }}>
          <TrendingUp size={14} color="#10B981" />
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Showing <strong style={{ color: '#0F172A' }}>{filtered.length}</strong> articles
            {search && ` matching "${search}"`}
          </span>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '28px', display: 'flex', gap: '20px' }}>
                <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: '14px', width: '80px', marginBottom: '12px' }} />
                  <div className="skeleton" style={{ height: '22px', marginBottom: '10px' }} />
                  <div className="skeleton" style={{ height: '14px', width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: '#0F172A', marginBottom: '8px' }}>No articles found</h3>
            <p style={{ fontSize: '15px', color: '#64748B' }}>Try a different search term or explore all topics.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filtered.map((blog, i) => (
              <BlogRow key={blog._id} blog={blog} index={i} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
