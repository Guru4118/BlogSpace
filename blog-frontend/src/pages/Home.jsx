import { useEffect, useState, useRef } from 'react';
import { fetchBlogs } from '../api/blogApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Users, Star, TrendingUp,
  Clock, ChevronRight, Zap, Award, Globe, PenLine,
  MessageCircle, Heart, Eye, Sparkles
} from 'lucide-react';

const CATEGORIES = ['All', 'Technology', 'Design', 'Business', 'Science', 'Culture', 'Health'];

function BlogCard({ blog, index, featured = false }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const colors = ['#EFF6FF', '#F0FDF4', '#FFF7ED', '#F5F3FF', '#FFF1F2', '#F0F9FF'];
  const accentColors = ['#2563EB', '#10B981', '#F97316', '#7C3AED', '#E11D48', '#0EA5E9'];
  const colorIdx = index % colors.length;

  if (featured) {
    return (
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
          background: 'white',
          border: '1px solid #E2E8F0',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.25s ease`,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.10)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = visible ? 'translateY(0)' : 'translateY(32px)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
      >
        <div style={{ height: '6px', background: `linear-gradient(90deg, ${accentColors[colorIdx]}, ${accentColors[(colorIdx + 1) % accentColors.length]})` }} />
        <div style={{ background: colors[colorIdx], padding: '32px 32px 24px' }}>
          <span className="badge" style={{ background: `${accentColors[colorIdx]}18`, color: accentColors[colorIdx], marginBottom: '16px', display: 'inline-flex' }}>
            {blog.category || 'Technology'}
          </span>
          <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: '#0F172A', lineHeight: '1.35', marginBottom: '12px' }}>
            {blog.title}
          </h3>
          <p style={{ color: '#64748B', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
            {blog.content?.slice(0, 120)}...
          </p>
        </div>
        <div style={{ padding: '16px 32px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px',
              background: `linear-gradient(135deg, ${accentColors[colorIdx]}, ${accentColors[(colorIdx + 1) % accentColors.length]})`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '13px', fontWeight: '700',
            }}>
              {blog.author?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>{blog.author?.username || 'Anonymous'}</p>
              <p style={{ fontSize: '12px', color: '#94A3B8' }}>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          <Link
            to={`/blogs/${blog._id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: accentColors[colorIdx],
              fontSize: '14px', fontWeight: '600',
              textDecoration: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              background: `${accentColors[colorIdx]}12`,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${accentColors[colorIdx]}22`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${accentColors[colorIdx]}12`; }}
          >
            Read <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
        display: 'flex', gap: '16px', alignItems: 'flex-start',
        padding: '20px', borderRadius: '14px',
        background: 'white', border: '1px solid #E2E8F0',
        cursor: 'pointer',
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, background 0.2s ease`,
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
      onMouseLeave={e => e.currentTarget.style.background = 'white'}
    >
      <div style={{
        width: '44px', height: '44px', flexShrink: 0,
        background: colors[colorIdx],
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px',
      }}>
        📝
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link to={`/blogs/${blog._id}`} style={{ textDecoration: 'none' }}>
          <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '16px', color: '#0F172A', lineHeight: '1.4', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {blog.title}
          </h4>
        </Link>
        <p style={{ fontSize: '13px', color: '#94A3B8' }}>
          {blog.author?.username || 'Anonymous'} · {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}

const stats = [
  { icon: <Users size={22} />, value: '50K+', label: 'Active Writers', color: '#2563EB' },
  { icon: <BookOpen size={22} />, value: '200K+', label: 'Published Articles', color: '#10B981' },
  { icon: <Globe size={22} />, value: '180+', label: 'Countries Reached', color: '#F97316' },
  { icon: <Star size={22} />, value: '4.9', label: 'Average Rating', color: '#7C3AED' },
];

const features = [
  {
    icon: <Zap size={24} />,
    title: 'Instant Publishing',
    description: 'Share your ideas with the world in seconds. Our streamlined editor gets out of your way so you can focus on writing.',
    color: '#FFF7ED', accent: '#F97316',
  },
  {
    icon: <Users size={24} />,
    title: 'Engaged Community',
    description: 'Connect with readers and writers who share your passions. Build a following and grow your influence organically.',
    color: '#EFF6FF', accent: '#2563EB',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Growth Analytics',
    description: 'Understand your audience with detailed insights on reads, engagement, and subscriber growth over time.',
    color: '#F0FDF4', accent: '#10B981',
  },
  {
    icon: <Award size={24} />,
    title: 'Recognized Quality',
    description: 'Top posts get featured to thousands of readers. Our curators highlight the best content every single day.',
    color: '#F5F3FF', accent: '#7C3AED',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Designer',
    content: 'BlogSpace completely transformed how I share my design process. The clean interface lets my work speak for itself.',
    avatar: 'S',
    color: '#2563EB',
  },
  {
    name: 'Marcus Webb',
    role: 'Full-Stack Engineer',
    content: 'I gained 10,000 followers in my first three months. The community here is genuinely supportive and engaged.',
    avatar: 'M',
    color: '#10B981',
  },
  {
    name: 'Priya Nair',
    role: 'Startup Founder',
    content: 'Writing on BlogSpace helped me attract investors and early customers. It\'s an incredible business tool.',
    avatar: 'P',
    color: '#7C3AED',
  },
];

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    fetchBlogs()
      .then(res => setBlogs(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
    return () => clearTimeout(timer);
  }, []);

  const featuredBlogs = blogs.slice(0, 6);
  const recentBlogs = blogs.slice(6, 12);

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(160deg, #F8FAFF 0%, #EFF6FF 40%, #F0F9FF 100%)',
        padding: '80px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'white',
              border: '1px solid #BFDBFE',
              borderRadius: '20px',
              padding: '8px 16px',
              marginBottom: '32px',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease',
              boxShadow: '0 2px 12px rgba(37,99,235,0.08)',
            }}
          >
            <Sparkles size={14} color="#2563EB" />
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#2563EB' }}>The Professional Writing Platform</span>
          </div>

          <h1 style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(42px, 7vw, 78px)',
            lineHeight: '1.1',
            color: '#0F172A',
            marginBottom: '24px',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease 0.1s',
          }}>
            Where great ideas<br />
            <span className="gradient-text">find their audience</span>
          </h1>

          <p style={{
            fontSize: '19px',
            color: '#64748B',
            lineHeight: '1.7',
            maxWidth: '560px',
            margin: '0 auto 40px',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            Join 50,000+ writers sharing expertise, building communities, and making an impact through the power of thoughtful writing.
          </p>

          <div style={{
            display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease 0.3s',
          }}>
            <Link to="/blogs/create" className="btn-primary" style={{ fontSize: '16px', padding: '14px 28px', borderRadius: '12px' }}>
              <PenLine size={18} />
              Start Writing Free
            </Link>
            <Link to="/blogs" className="btn-secondary" style={{ fontSize: '16px', padding: '14px 28px', borderRadius: '12px' }}>
              Explore Articles
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Floating trust badges */}
          <div style={{
            display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '52px', flexWrap: 'wrap',
            opacity: heroVisible ? 1 : 0,
            transition: 'all 0.7s ease 0.5s',
          }}>
            {['✓ Free forever', '✓ No ads', '✓ Full ownership'].map(item => (
              <span key={item} style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '36px 20px',
                  textAlign: 'center',
                  borderRight: i < 3 ? '1px solid #E2E8F0' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', color: stat.color }}>{stat.icon}</div>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: '#0F172A', lineHeight: '1' }}>{stat.value}</div>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="badge badge-blue" style={{ marginBottom: '12px' }}>Featured Stories</div>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', color: '#0F172A', lineHeight: '1.2' }}>
                Trending this week
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: activeCategory === cat ? 'none' : '1.5px solid #E2E8F0',
                    background: activeCategory === cat ? '#2563EB' : 'white',
                    color: activeCategory === cat ? 'white' : '#64748B',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', background: '#F1F5F9' }}>
                  <div className="skeleton" style={{ height: '200px' }} />
                  <div style={{ padding: '24px' }}>
                    <div className="skeleton" style={{ height: '14px', width: '80px', marginBottom: '12px' }} />
                    <div className="skeleton" style={{ height: '22px', marginBottom: '8px' }} />
                    <div className="skeleton" style={{ height: '14px', width: '70%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
              {(featuredBlogs.length > 0 ? featuredBlogs : [...Array(6)].map((_, i) => ({
                _id: i, title: ['The Future of AI-Assisted Design', 'Building Scalable Systems in 2025', 'Why Deep Work is Your Superpower', 'The Art of Persuasive Writing', 'Mastering Remote Team Collaboration', 'Startup Lessons from a Serial Founder'][i],
                content: 'Exploring the intersection of technology, design, and human creativity to build products that truly matter to the people who use them every day.',
                author: { username: ['Alex M.', 'Priya S.', 'James L.', 'Aisha K.', 'David C.', 'Nina R.'][i] },
                createdAt: new Date().toISOString(),
              }))).map((blog, i) => (
                <BlogCard key={blog._id} blog={blog} index={i} featured={true} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/blogs" className="btn-secondary" style={{ fontSize: '15px' }}>
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="badge badge-green" style={{ marginBottom: '16px' }}>Why BlogSpace</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '40px', color: '#0F172A', marginBottom: '16px' }}>
              Everything you need to<br />write and grow
            </h2>
            <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '480px', margin: '0 auto', lineHeight: '1.7' }}>
              A thoughtfully designed platform built for writers who take their craft seriously.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {features.map((feat, i) => (
              <FeatureCard key={i} feat={feat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts + Sidebar */}
      {recentBlogs.length > 0 && (
        <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: '#0F172A', marginBottom: '32px' }}>
              Latest Posts
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recentBlogs.map((blog, i) => (
                  <BlogCard key={blog._id} blog={blog} index={i} />
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <NewsletterWidget />
                <TopicsWidget />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="badge badge-purple" style={{ marginBottom: '16px' }}>Testimonials</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '40px', color: '#0F172A' }}>
              Loved by writers worldwide
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #0284C7 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 50%)' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '44px', color: 'white', marginBottom: '20px', lineHeight: '1.2' }}>
            Ready to share your story?
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.75)', marginBottom: '36px', lineHeight: '1.7' }}>
            Join our community of passionate writers. No credit card required — start writing in 60 seconds.
          </p>
          <Link to="/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'white', color: '#1D4ED8',
            padding: '16px 32px', borderRadius: '14px',
            fontSize: '16px', fontWeight: '700',
            textDecoration: 'none',
            transition: 'all 0.25s ease',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
          >
            Create Your Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ feat, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        padding: '28px', borderRadius: '16px',
        background: feat.color,
        border: '1px solid transparent',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s, border-color 0.2s`,
        cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${feat.accent}40`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ width: '48px', height: '48px', background: `${feat.accent}18`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: feat.accent, marginBottom: '20px' }}>
        {feat.icon}
      </div>
      <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: '#0F172A', marginBottom: '10px' }}>{feat.title}</h3>
      <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7' }}>{feat.description}</p>
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        padding: '28px', borderRadius: '16px',
        background: 'white', border: '1px solid #E2E8F0',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {[...Array(5)].map((_, i) => <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />)}
      </div>
      <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7', marginBottom: '20px', fontStyle: 'italic' }}>"{t.content}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', background: `linear-gradient(135deg, ${t.color}, ${t.color}90)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '16px' }}>
          {t.avatar}
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{t.name}</p>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function NewsletterWidget() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #EFF6FF, #F0F9FF)', border: '1px solid #BFDBFE', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ width: '36px', height: '36px', background: '#2563EB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageCircle size={18} color="white" />
        </div>
        <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: '#0F172A' }}>Weekly Digest</h3>
      </div>
      <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', marginBottom: '16px' }}>
        Get the best articles of the week delivered to your inbox. No spam, ever.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <input className="input-field" type="email" placeholder="Your email address" style={{ fontSize: '14px' }} />
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}>
          Subscribe Free
        </button>
      </div>
    </div>
  );
}

function TopicsWidget() {
  const topics = [
    { name: 'Technology', count: 1240, color: '#2563EB' },
    { name: 'Design', count: 842, color: '#7C3AED' },
    { name: 'Business', count: 693, color: '#10B981' },
    { name: 'Science', count: 521, color: '#F97316' },
    { name: 'Culture', count: 418, color: '#E11D48' },
  ];
  return (
    <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
      <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: '#0F172A', marginBottom: '16px' }}>Trending Topics</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {topics.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{t.name}</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>{t.count.toLocaleString()}</span>
              </div>
              <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${(t.count / 1240) * 100}%`, background: t.color, borderRadius: '2px', transition: 'width 1s ease' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
