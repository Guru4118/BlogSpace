import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      <Navbar />
      {/* Header */}
      <section style={{ background: 'linear-gradient(160deg, #F8FAFF 0%, #EFF6FF 50%, #F0F9FF 100%)', padding: '72px 24px', textAlign: 'center', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <span className="badge badge-blue" style={{ marginBottom: '20px', display: 'inline-flex' }}>Get in Touch</span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(32px, 5vw, 52px)', color: '#0F172A', lineHeight: '1.2', marginBottom: '16px' }}>
            We'd love to hear from you
          </h1>
          <p style={{ fontSize: '17px', color: '#64748B', lineHeight: '1.7' }}>
            Have a question, feedback, or just want to say hello? Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '48px', alignItems: 'start' }}>
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '28px', color: '#0F172A', marginBottom: '28px' }}>Contact information</h2>
            {[
              { icon: <Mail size={20} />, label: 'Email', value: 'gprasath103@gmail.com', color: '#2563EB', bg: '#EFF6FF' },
              { icon: <Phone size={20} />, label: 'Phone', value: '+91 80724 22183', color: '#10B981', bg: '#F0FDF4' },
              { icon: <MapPin size={20} />, label: 'Location', value: 'Chennai, Tamil Nadu, India', color: '#F97316', bg: '#FFF7ED' },
              { icon: <Clock size={20} />, label: 'Response Time', value: 'Within 24 hours', color: '#7C3AED', bg: '#F5F3FF' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px', padding: '18px', background: item.bg, borderRadius: '14px' }}>
                <div style={{ width: '40px', height: '40px', background: `${item.color}18`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>{item.label}</p>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#0F172A' }}>{item.value}</p>
                </div>
              </div>
            ))}

            {/* FAQ teaser */}
            <div style={{ marginTop: '28px', padding: '20px', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <MessageCircle size={18} color="#2563EB" />
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>Quick answers</h3>
              </div>
              {['How do I publish my first post?', 'Can I edit a published article?', 'Is BlogSpace free to use?'].map((q, i) => (
                <p key={i} style={{ fontSize: '14px', color: '#2563EB', cursor: 'pointer', marginBottom: '8px', paddingLeft: '4px' }}
                  onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.target.style.textDecoration = 'none'}
                >→ {q}</p>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '52px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '26px', color: '#0F172A', marginBottom: '10px' }}>Message sent!</h3>
                <p style={{ fontSize: '15px', color: '#64748B' }}>We'll get back to you within 24 hours. Thanks for reaching out!</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: '#0F172A', marginBottom: '24px' }}>Send us a message</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>Full Name</label>
                      <input className="input-field" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>Email</label>
                      <input className="input-field" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>Subject</label>
                    <input className="input-field" type="text" placeholder="How can we help?" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>Message</label>
                    <textarea
                      className="input-field"
                      placeholder="Tell us more about your question or feedback..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
