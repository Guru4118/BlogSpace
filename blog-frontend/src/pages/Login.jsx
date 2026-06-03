import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Sparkles, ArrowRight, Lock, Mail, CheckCircle } from "lucide-react";

const PERKS = [
  'Publish to an audience of 50,000+ readers',
  'Access powerful writing tools and analytics',
  'Build your personal brand and following',
  'Connect with a global community of thinkers',
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'white' }}>
      {/* Left Panel — Brand */}
      <div style={{
        background: 'linear-gradient(160deg, #1E3A8A 0%, #1D4ED8 60%, #0284C7 100%)',
        padding: '48px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }}
        className="hidden lg:flex"
      >
        {/* Decorative bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)' }} />
        
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '64px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Sparkles size={20} color="white" />
            </div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', color: 'white' }}>BlogSpace</span>
          </div>

          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '40px', color: 'white', lineHeight: '1.2', marginBottom: '24px' }}>
            Your ideas deserve<br />to be heard
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '40px', maxWidth: '360px' }}>
            Join thousands of professionals who use BlogSpace to publish their expertise and build their audience.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {PERKS.map((perk, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-16px)', transition: `all 0.5s ease ${0.3 + i * 0.1}s` }}>
                <CheckCircle size={18} color="#34D399" />
                <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div style={{ position: 'relative', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.15)'  ,marginTop: '24px' }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '16px' }}>
            "BlogSpace is the only platform that feels built for serious writers. The community is incredible."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #10B981, #34D399)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>R</div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Riya Patel</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>UX Researcher · 12K followers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 40px', background: 'white' }}>
        <div style={{
          width: '100%', maxWidth: '400px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.6s ease 0.2s',
        }}>
          {/* Mobile logo */}
          <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '36px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #2563EB, #0EA5E9)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="white" />
            </div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: '#0F172A' }}>BlogSpace</span>
          </div>

          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', color: '#0F172A', marginBottom: '6px' }}>Welcome back</h1>
          <p style={{ fontSize: '15px', color: '#64748B', marginBottom: '36px' }}>Sign in to your account to continue writing.</p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '7px' }}>Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{ paddingLeft: '42px' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Password</label>
                <a href="#" style={{ fontSize: '13px', color: '#2563EB', textDecoration: 'none', fontWeight: '500' }}>Forgot password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ paddingLeft: '42px', paddingRight: '42px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px 14px', background: '#FFF5F5', border: '1px solid #FEE2E2', borderRadius: '10px', fontSize: '14px', color: '#DC2626' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Signing in...' : <><span>Sign In</span> <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ marginTop: '28px', padding: '20px', background: '#F8FAFC', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              New to BlogSpace?{' '}
              <Link to="/register" style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'none' }}>
                Create a free account →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
