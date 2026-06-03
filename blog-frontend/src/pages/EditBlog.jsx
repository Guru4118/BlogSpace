import { useEffect, useState } from 'react';
import { fetchBlog, updateBlog } from '../api/blogApi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Save, Eye, PenLine } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [mode, setMode] = useState('write');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchBlog(id)
      .then(res => { setTitle(res.data.title); setContent(res.data.content); })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) { setError('Both title and content are required.'); return; }
    setLoading(true); setError('');
    try {
      await updateBlog(id, { title, content });
      setSaved(true);
      setTimeout(() => navigate(`/blogs/${id}`), 1000);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  if (fetching) {
    return (
      <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 24px' }}>
          <div className="skeleton" style={{ height: '40px', marginBottom: '20px' }} />
          <div className="skeleton" style={{ height: '400px', borderRadius: '16px' }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link to={`/blogs/${id}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1.5px solid #E2E8F0', borderRadius: '10px', background: 'white', fontSize: '14px', fontWeight: '500', color: '#64748B', textDecoration: 'none' }}>
              <ArrowLeft size={14} /> Back
            </Link>
            <div>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: '#0F172A' }}>Edit Post</h1>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>{wordCount} words</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', border: '1.5px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', background: 'white' }}>
              {['write', 'preview'].map(m => (
                <button key={m} onClick={() => setMode(m)} style={{ padding: '9px 18px', fontSize: '13px', fontWeight: '600', background: mode === m ? '#0F172A' : 'transparent', color: mode === m ? 'white' : '#64748B', border: 'none', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s' }}>
                  {m === 'write' ? <><PenLine size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />Write</> : <><Eye size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />Preview</>}
                </button>
              ))}
            </div>
            <button onClick={handleUpdate} disabled={loading || saved} className="btn-primary" style={{ fontSize: '14px', padding: '10px 20px', opacity: loading ? 0.7 : 1, background: saved ? '#10B981' : undefined }}>
              <Save size={15} />
              {saved ? 'Saved!' : loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error && <div style={{ padding: '14px', background: '#FFF5F5', border: '1px solid #FEE2E2', borderRadius: '12px', fontSize: '14px', color: '#DC2626', marginBottom: '20px' }}>{error}</div>}

        {/* Editor */}
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          {mode === 'write' ? (
            <>
              <div style={{ padding: '28px 36px', borderBottom: '1px solid #F1F5F9' }}>
                <textarea
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: '#0F172A', background: 'transparent', lineHeight: '1.3' }}
                  rows={2}
                  placeholder="Post title..."
                />
              </div>
              <div style={{ padding: '28px 36px' }}>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#334155', background: 'transparent', lineHeight: '1.8', minHeight: '500px' }}
                  placeholder="Write your content here... (Markdown supported)"
                />
              </div>
            </>
          ) : (
            <div style={{ padding: '40px 48px' }}>
              <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', color: '#0F172A', lineHeight: '1.2', marginBottom: '32px' }}>{title || 'Untitled'}</h1>
              <div className="prose-blog"><ReactMarkdown>{content}</ReactMarkdown></div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
