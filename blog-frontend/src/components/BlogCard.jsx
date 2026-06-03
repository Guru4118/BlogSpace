import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

export default function BlogCard({ blog, colorIndex = 0 }) {
  const colors = ['#EFF6FF', '#F0FDF4', '#FFF7ED', '#F5F3FF', '#FFF1F2', '#F0F9FF'];
  const accents = ['#2563EB', '#10B981', '#F97316', '#7C3AED', '#E11D48', '#0EA5E9'];
  const ci = colorIndex % colors.length;
  const readTime = Math.max(2, Math.ceil((blog.content?.length || 400) / 1000));

  return (
    <div style={{
      background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px',
      overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.09)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ height: '5px', background: `linear-gradient(90deg, ${accents[ci]}, ${accents[(ci + 1) % accents.length]})` }} />
      <div style={{ background: colors[ci], padding: '24px 24px 18px' }}>
        <span className="badge" style={{ background: `${accents[ci]}18`, color: accents[ci], marginBottom: '12px', display: 'inline-flex', fontSize: '11px' }}>
          Technology
        </span>
        <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '19px', color: '#0F172A', lineHeight: '1.35', marginBottom: '8px' }}>
          {blog.title}
        </h3>
        <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {blog.content?.slice(0, 100)}...
        </p>
      </div>
      <div style={{ padding: '14px 24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: `linear-gradient(135deg, ${accents[ci]}, ${accents[(ci + 1) % accents.length]})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: '700' }}>
            {blog.author?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>{blog.author?.username || 'Anonymous'}</p>
            <p style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} />{readTime} min</p>
          </div>
        </div>
        <Link to={`/blogs/${blog._id}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600', color: accents[ci], textDecoration: 'none' }}>
          Read <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
