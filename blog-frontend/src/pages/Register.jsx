import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Sparkles, ArrowRight, User, Mail, Lock, CheckCircle2, Circle } from "lucide-react";

function PasswordStrength({ password }) {
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'Contains a number', ok: /\d/.test(password) },
    { label: 'Contains uppercase', ok: /[A-Z]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const colors = ['#EF4444', '#F97316', '#10B981'];
  const labels = ['Weak', 'Fair', 'Strong'];
  return (
    <div style={{ marginTop: '8px' }}>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i < score ? colors[score - 1] : '#E2E8F0', transition: 'background 0.3s' }} />
        ))}
      </div>
      {password.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {checks.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: c.ok ? '#10B981' : '#94A3B8' }}>
              {c.ok ? <CheckCircle2 size={12} /> : <Circle size={12} />}
              {c.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", { username, email, password });
      setSuccess(response.data.message || "Account created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{
        width: '100%', maxWidth: '940px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        border: '1px solid #E2E8F0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.97)',
        transition: 'all 0.5s ease',
      }}>
        {/* Left — Form */}
        <div style={{ padding: '48px 44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="white" />
            </div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: '#0F172A' }}>BlogSpace</span>
          </div>

          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '30px', color: '#0F172A', marginBottom: '6px' }}>Create your account</h1>
          <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '32px' }}>Start publishing your ideas to the world today.</p>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" className="input-field" value={username} onChange={e => setUsername(e.target.value)} placeholder="Choose a username" required style={{ paddingLeft: '42px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={{ paddingLeft: '42px' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && <PasswordStrength password={password} />}
            </div>

            {error && <div style={{ padding: '12px 14px', background: '#FFF5F5', border: '1px solid #FEE2E2', borderRadius: '10px', fontSize: '14px', color: '#DC2626' }}>{error}</div>}
            {success && <div style={{ padding: '12px 14px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', fontSize: '14px', color: '#16A34A' }}>✓ {success}</div>}

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1, marginTop: '4px' }}>
              {loading ? 'Creating account...' : <><span>Create Free Account</span> <ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ fontSize: '14px', color: '#64748B', textAlign: 'center', marginTop: '24px' }}>
            Already have an account?{' '}
            <Link to="/" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>Sign in →</Link>
          </p>
          <p style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center', marginTop: '16px' }}>
            By registering you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Right — Visual */}
        <div style={{
          background: 'linear-gradient(160deg, #1E3A8A 0%, #1D4ED8 60%, #0EA5E9 100%)',
          padding: '48px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 50%)' }} />
          <div style={{ position: 'relative' }}>
            <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: 'white', lineHeight: '1.3', marginBottom: '24px' }}>
              Start your writing journey today
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '40px' }}>
              Join a thriving community of curious minds. Publish your first article, gain readers, and watch your ideas spark conversations around the world.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { num: '50K+', label: 'Writers' },
                { num: '200K+', label: 'Articles' },
                { num: '180+', label: 'Countries' },
                { num: 'Free', label: 'Forever' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: 'white' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
