import { useState } from 'react';
import axios from 'axios';
import { Send, MessageCircle } from 'lucide-react';

export default function CommentForm({ blogId, onCommentPosted }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (!token) { setError('Please sign in to leave a comment.'); return; }
    setLoading(true); setError('');
    try {
      await axios.post(
        `https://blogspace-b5td.onrender.com/api/comments/${blogId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setText('');
      onCommentPosted?.();
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={{
          width: '36px', height: '36px', flexShrink: 0,
          background: user ? 'linear-gradient(135deg, #2563EB, #0EA5E9)' : '#E2E8F0',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: user ? 'white' : '#94A3B8', fontSize: '14px', fontWeight: '700',
        }}>
          {user ? user.username?.[0]?.toUpperCase() : <MessageCircle size={16} />}
        </div>
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={token ? "Share your thoughts on this article..." : "Sign in to leave a comment..."}
            disabled={!token}
            style={{
              width: '100%', border: '1.5px solid #E2E8F0', borderRadius: '10px',
              padding: '12px 14px', fontSize: '14px',
              fontFamily: 'DM Sans, sans-serif',
              color: '#334155', background: token ? 'white' : '#F8FAFC',
              resize: 'none', outline: 'none',
              transition: 'border-color 0.2s',
              lineHeight: '1.6',
              minHeight: '80px',
            }}
            onFocus={e => e.target.style.borderColor = '#2563EB'}
            onBlur={e => e.target.style.borderColor = '#E2E8F0'}
          />
          {error && <p style={{ fontSize: '13px', color: '#EF4444', marginTop: '6px' }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            {token ? (
              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="btn-primary"
                style={{ fontSize: '13px', padding: '9px 18px', opacity: (loading || !text.trim()) ? 0.5 : 1 }}
              >
                <Send size={13} />
                {loading ? 'Posting...' : 'Post Comment'}
              </button>
            ) : (
              <a href="/" className="btn-secondary" style={{ fontSize: '13px', padding: '9px 18px', textDecoration: 'none' }}>
                Sign in to comment
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
