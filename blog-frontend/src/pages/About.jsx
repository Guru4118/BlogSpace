import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, BookOpen, Globe, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Guruprasath', role: 'Founder & Lead Engineer', avatar: 'G', color: '#2563EB', bio: 'Passionate about building tools that empower writers and creators worldwide.' },
];

const values = [
  { icon: <BookOpen size={22} />, title: 'Quality Writing', desc: 'We believe every well-crafted piece of writing has the power to change perspectives and inspire action.', color: '#EFF6FF', accent: '#2563EB' },
  { icon: <Users size={22} />, title: 'Community First', desc: 'Our platform is built around the humans who use it — writers, readers, and thinkers from every corner of the world.', color: '#F0FDF4', accent: '#10B981' },
  { icon: <Globe size={22} />, title: 'Open Knowledge', desc: 'Ideas become more powerful when they\'re shared freely. We champion accessibility and open discourse.', color: '#FFF7ED', accent: '#F97316' },
  { icon: <Award size={22} />, title: 'Excellence', desc: 'We hold ourselves to the highest standards in everything we build, from the editor to the community experience.', color: '#F5F3FF', accent: '#7C3AED' },
];

export default function About() {
  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Navbar />
      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, #F8FAFF 0%, #EFF6FF 50%, #F0F9FF 100%)', padding: '80px 24px', textAlign: 'center', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: '20px', display: 'inline-flex' }}>Our Story</span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(36px, 6vw, 60px)', color: '#0F172A', lineHeight: '1.15', marginBottom: '20px' }}>
            Built for writers,<br />by a writer
          </h1>
          <p style={{ fontSize: '18px', color: '#64748B', lineHeight: '1.8', marginBottom: '36px' }}>
            BlogSpace was born from a simple belief: everyone has valuable knowledge to share, and the world is better when those ideas flow freely between curious minds.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '16px', display: 'inline-flex' }}>Our Mission</span>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '36px', color: '#0F172A', marginBottom: '20px', lineHeight: '1.25' }}>
              Democratizing the written word
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '1.8', marginBottom: '16px' }}>
              We started BlogSpace because the best writing tools were either too expensive, too complex, or too crowded with noise. We wanted something clean, professional, and focused entirely on the craft.
            </p>
            <p style={{ fontSize: '16px', color: '#64748B', lineHeight: '1.8', marginBottom: '28px' }}>
              Today, over 50,000 writers across 180 countries use BlogSpace to publish their ideas, build their audiences, and connect with readers who genuinely care about quality content.
            </p>
            <Link to="/register" className="btn-primary" style={{ fontSize: '15px' }}>
              Join Our Community <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[['50K+', 'Writers'], ['200K+', 'Articles'], ['4.9★', 'Rating'], ['180+', 'Countries']].map(([num, label]) => (
              <div key={label} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: '#0F172A', marginBottom: '4px' }}>{num}</div>
                <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '500' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '16px', display: 'inline-flex' }}>Our Values</span>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '38px', color: '#0F172A' }}>What we stand for</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: v.color, borderRadius: '16px', padding: '28px', border: '1px solid transparent', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${v.accent}40`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ width: '44px', height: '44px', background: `${v.accent}18`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.accent, marginBottom: '16px' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '19px', color: '#0F172A', marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge badge-blue" style={{ marginBottom: '16px', display: 'inline-flex' }}>The Team</span>
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '38px', color: '#0F172A', marginBottom: '48px' }}>Meet the builder</h2>
          {team.map((member, i) => (
            <div key={i} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${member.color}, #0EA5E9)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'DM Serif Display, serif', fontSize: '32px', boxShadow: '0 8px 24px rgba(37,99,235,0.25)' }}>{member.avatar}</div>
              <div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', color: '#0F172A', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ fontSize: '14px', color: '#2563EB', fontWeight: '600', marginBottom: '10px' }}>{member.role}</p>
                <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.7', maxWidth: '380px' }}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
