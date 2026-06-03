import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PenLine, LogOut, Edit2, Trash2, Calendar, BookOpen, TrendingUp, Award, Plus, ExternalLink } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const load = async () => {
      try {
        const ur = await axios.get('http://localhost:5000/api/auth/me', config);
        setUser(ur.data);
        const br = await axios.get(`http://localhost:5000/api/blogs?author=${ur.data._id}`, config);
        setBlogs(br.data);
      } catch (err) { console.error(err); }
    };
    load();
  }, [token, navigate]);

  const handleEdit = (id) => navigate(`/blogs/edit/${id}`);
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (err) { console.error(err); }
  };
  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); };

  if (!user) {
    return (
      <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ maxWidth: '900px', margin: '48px auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
            <div className="skeleton" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: '24px', width: '200px', marginBottom: '10px' }} />
              <div className="skeleton" style={{ height: '16px', width: '140px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: <BookOpen size={20} />, value: blogs.length, label: 'Published Posts', color: '#2563EB', bg: '#EFF6FF' },
    { icon: <TrendingUp size={20} />, value: '—', label: 'Total Views', color: '#10B981', bg: '#F0FDF4' },
    { icon: <Award size={20} />, value: '—', label: 'Followers', color: '#7C3AED', bg: '#F5F3FF' },
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <Navbar />

      {/* Profile Hero */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <div style={{
                width: '80px', height: '80px',
                background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontFamily: 'DM Serif Display, serif',
                fontSize: '32px', fontWeight: '400',
                boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
              }}>
                {user.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: '#0F172A', marginBottom: '4px' }}>
                  {user.username}
                </h1>
                <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '10px' }}>{user.email}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="badge badge-blue">Writer</span>
                  <span style={{ fontSize: '13px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> Joined {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link to="/blogs/create" className="btn-primary" style={{ fontSize: '14px', padding: '10px 20px' }}>
                <Plus size={15} /> New Post
              </Link>
              <button
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 20px', border: '1.5px solid #FEE2E2', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#EF4444', background: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FFF5F5'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '36px', flexWrap: 'wrap' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: s.bg, borderRadius: '12px', flex: '1', minWidth: '160px' }}>
                <div style={{ color: s.color }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: '#0F172A', lineHeight: '1' }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs + Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 24px' }}>
        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid #E2E8F0', marginBottom: '32px' }}>
          {['posts', 'drafts', 'saved'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', fontSize: '14px', fontWeight: '600',
                border: 'none', background: 'none', cursor: 'pointer',
                color: activeTab === tab ? '#2563EB' : '#64748B',
                borderBottom: activeTab === tab ? '2px solid #2563EB' : '2px solid transparent',
                marginBottom: '-1px',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
            >
              {tab === 'posts' ? `My Posts (${blogs.length})` : tab === 'drafts' ? 'Drafts (0)' : 'Saved (0)'}
            </button>
          ))}
        </div>

        {activeTab === 'posts' && (
          <>
            {blogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '52px', marginBottom: '16px' }}>✍️</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: '#0F172A', marginBottom: '8px' }}>Your writing journey starts here</h3>
                <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '24px', maxWidth: '360px', margin: '0 auto 24px' }}>
                  Share your expertise, experiences, and ideas with a global community of curious readers.
                </p>
                <Link to="/blogs/create" className="btn-primary" style={{ fontSize: '15px' }}>
                  <PenLine size={16} /> Write Your First Post
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {blogs.map((blog, i) => (
                  <div
                    key={blog._id}
                    style={{
                      background: 'white', border: '1px solid #E2E8F0',
                      borderRadius: '14px', padding: '24px',
                      display: 'flex', gap: '20px', alignItems: 'flex-start',
                      transition: 'box-shadow 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span className="badge badge-blue">Published</span>
                        <span style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} />
                          {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', color: '#0F172A', marginBottom: '6px', lineHeight: '1.35' }}>
                        {blog.title}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {blog.content?.slice(0, 150)}...
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <Link to={`/blogs/${blog._id}`} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#334155', textDecoration: 'none', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <button onClick={() => handleEdit(blog._id)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', border: '1.5px solid #E2E8F0', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#334155', background: 'white', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#2563EB'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                      >
                        <Edit2 size={13} /> Edit
                      </button>
                      <button onClick={() => handleDelete(blog._id)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 14px', border: '1.5px solid #FEE2E2', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#EF4444', background: '#FFF5F5', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#FEE2E2'}
                        onMouseLeave={e => e.currentTarget.style.background = '#FFF5F5'}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab !== 'posts' && (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
            <p style={{ fontSize: '15px' }}>Nothing here yet.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
