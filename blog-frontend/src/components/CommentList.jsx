import { useEffect, useState } from 'react';
import axios from 'axios';
import { MessageCircle, ThumbsUp } from 'lucide-react';

export default function CommentList({ blogId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://blogspace-b5td.onrender.com/api/comments/${blogId}`)
      .then(res => setComments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [blogId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px' }}>
            <div className="skeleton" style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: '14px', width: '120px', marginBottom: '8px' }} />
              <div className="skeleton" style={{ height: '14px' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', background: '#F8FAFC', borderRadius: '14px', border: '1px dashed #E2E8F0' }}>
        <MessageCircle size={24} color="#CBD5E1" style={{ marginBottom: '8px' }} />
        <p style={{ fontSize: '14px', color: '#94A3B8' }}>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{comments.length} Comment{comments.length !== 1 ? 's' : ''}</p>
      {comments.map((comment, i) => {
        const colors = ['#2563EB', '#10B981', '#F97316', '#7C3AED', '#E11D48'];
        const c = colors[i % colors.length];
        return (
          <div key={comment._id || i} style={{ display: 'flex', gap: '12px', padding: '16px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
            <div style={{ width: '36px', height: '36px', flexShrink: 0, background: `linear-gradient(135deg, ${c}, ${c}90)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: '700' }}>
              {comment.author?.username?.[0]?.toUpperCase() || 'A'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{comment.author?.username || 'Anonymous'}</span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>{new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.7' }}>{comment.text}</p>
              <button style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px', fontSize: '12px', color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', padding: '0', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2563EB'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                <ThumbsUp size={12} /> Like
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
