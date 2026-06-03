import { createBlog } from '../api/blogApi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { PenLine, Eye, Save, ArrowLeft, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const TIPS = [
  'Start with a compelling hook — a question, a bold claim, or a surprising fact.',
  'Use short paragraphs and clear subheadings to improve readability.',
  'Add concrete examples and data to support your key points.',
  'End with a clear takeaway or call to action for your readers.',
];

export default function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('write'); // 'write' | 'preview'
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) { setError('Both title and content are required.'); return; }
    setLoading(true);
    setError('');
    try {
      await createBlog({ title, content });
      navigate('/home');
    } catch (err) {
      setError('Failed to publish. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '36px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', border: '1.5px solid #E2E8F0', borderRadius: '10px', background: 'white', fontSize: '14px', fontWeight: '500', color: '#64748B', cursor: 'pointer' }}>
              <ArrowLeft size={14} /> Back
            </button>
            <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: '#0F172A' }}>Create New Post</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>{wordCount} words · ~{readTime} min read</span>
            <div style={{ display: 'flex', border: '1.5px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', background: 'white' }}>
              {['write', 'preview'].map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: '9px 18px', fontSize: '13px', fontWeight: '600',
                    background: mode === m ? '#0F172A' : 'transparent',
                    color: mode === m ? 'white' : '#64748B',
                    border: 'none', cursor: 'pointer',
                    textTransform: 'capitalize', transition: 'all 0.2s',
                  }}
                >
                  {m === 'write' ? <><PenLine size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />Write</> : <><Eye size={13} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />Preview</>}
                </button>
              ))}
            </div>
            <button
              onClick={handleCreate}
              disabled={loading}
              className="btn-primary"
              style={{ fontSize: '14px', padding: '10px 20px', opacity: loading ? 0.7 : 1 }}
            >
              <Save size={15} />
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
          {/* Editor / Preview */}
          <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            {mode === 'write' ? (
              <>
                <div style={{ padding: '28px 32px', borderBottom: '1px solid #F1F5F9' }}>
                  <textarea
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Write your post title here..."
                    style={{
                      width: '100%', border: 'none', outline: 'none', resize: 'none',
                      fontFamily: 'DM Serif Display, serif', fontSize: '28px',
                      color: '#0F172A', background: 'transparent', lineHeight: '1.3',
                    }}
                    rows={2}
                  />
                </div>
                <div style={{ padding: '28px 32px' }}>
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Start writing your article... (Markdown supported)"
                    style={{
                      width: '100%', border: 'none', outline: 'none', resize: 'none',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '16px',
                      color: '#334155', background: 'transparent', lineHeight: '1.8',
                      minHeight: '480px',
                    }}
                  />
                </div>
              </>
            ) : (
              <div style={{ padding: '40px 48px' }}>
                {title ? (
                  <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', color: '#0F172A', lineHeight: '1.2', marginBottom: '32px' }}>{title}</h1>
                ) : (
                  <p style={{ color: '#94A3B8', fontSize: '16px', fontStyle: 'italic', marginBottom: '32px' }}>Your title will appear here</p>
                )}
                {content ? (
                  <div className="prose-blog"><ReactMarkdown>{content}</ReactMarkdown></div>
                ) : (
                  <p style={{ color: '#94A3B8', fontSize: '15px', fontStyle: 'italic' }}>Your content will appear here in preview mode</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '88px' }}>
            {error && (
              <div style={{ padding: '14px', background: '#FFF5F5', border: '1px solid #FEE2E2', borderRadius: '12px', fontSize: '14px', color: '#DC2626' }}>
                {error}
              </div>
            )}

            {/* Publish card */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', marginBottom: '14px' }}>Publish Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {[
                  { label: 'Status', value: 'Ready to publish' },
                  { label: 'Visibility', value: 'Public' },
                  { label: 'Category', value: 'Technology' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: '#64748B' }}>{item.label}</span>
                    <span style={{ fontWeight: '600', color: '#334155' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '14px', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Publishing...' : 'Publish Now'}
              </button>
            </div>

            {/* Writing tips */}
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '14px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Lightbulb size={16} color="#D97706" />
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#92400E' }}>Writing Tips</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {TIPS.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ width: '18px', height: '18px', background: '#FDE68A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#92400E', flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
                    <p style={{ fontSize: '12px', color: '#92400E', lineHeight: '1.6' }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Markdown ref */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>Markdown Reference</h3>
              {[
                ['# H1, ## H2, ### H3', 'Headings'],
                ['**bold**, *italic*', 'Emphasis'],
                ['> text', 'Blockquote'],
                ['`code`', 'Inline code'],
                ['- item', 'List item'],
              ].map(([syntax, label]) => (
                <div key={label} style={{ display: 'flex', gap: '8px', marginBottom: '7px', alignItems: 'flex-start' }}>
                  <code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', color: '#E11D48', fontFamily: 'monospace', flexShrink: 0 }}>{syntax}</code>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
