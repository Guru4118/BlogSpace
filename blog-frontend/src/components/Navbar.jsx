import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, PenLine, ChevronDown, Sparkles, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/blogs', label: 'Explore' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
            
            {/* Logo */}
            <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={18} color="white" />
              </div>
              <span style={{
                fontFamily: 'DM Serif Display, serif',
                fontSize: '22px',
                color: '#0F172A',
                fontWeight: '400',
                letterSpacing: '-0.02em',
              }}>BlogSpace</span>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '500',
                    color: isActive(link.to) ? '#2563EB' : '#475569',
                    background: isActive(link.to) ? '#EFF6FF' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!isActive(link.to)) { e.target.style.background = '#F8FAFC'; e.target.style.color = '#0F172A'; }}}
                  onMouseLeave={e => { if (!isActive(link.to)) { e.target.style.background = 'transparent'; e.target.style.color = '#475569'; }}}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="hidden md:flex">
              {token ? (
                <>
                  <Link
                    to="/blogs/create"
                    className="btn-primary"
                    style={{ padding: '9px 18px', fontSize: '14px', borderRadius: '10px' }}
                  >
                    <PenLine size={15} />
                    Write
                  </Link>
                  
                  <div ref={dropdownRef} style={{ position: 'relative' }}>
                    <button
                      onClick={() => setUserDropdown(!userDropdown)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 14px',
                        border: '1.5px solid #E2E8F0',
                        borderRadius: '10px',
                        background: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#0F172A',
                      }}
                    >
                      <div style={{
                        width: '28px', height: '28px',
                        background: 'linear-gradient(135deg, #2563EB, #0EA5E9)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '12px', fontWeight: '700',
                      }}>
                        {user?.username?.[0]?.toUpperCase() || 'U'}
                      </div>
                      {user?.username || 'Account'}
                      <ChevronDown size={14} color="#64748B" />
                    </button>
                    
                    {userDropdown && (
                      <div style={{
                        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                        background: 'white',
                        border: '1px solid #E2E8F0',
                        borderRadius: '14px',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
                        minWidth: '200px',
                        overflow: 'hidden',
                        zIndex: 100,
                        animation: 'scaleIn 0.15s ease',
                      }}>
                        <div style={{ padding: '14px 16px', borderBottom: '1px solid #F1F5F9' }}>
                          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '2px' }}>Signed in as</p>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>{user?.username}</p>
                        </div>
                        <div style={{ padding: '8px' }}>
                          <Link
                            to="/profile"
                            onClick={() => setUserDropdown(false)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              fontSize: '14px', color: '#334155',
                              textDecoration: 'none',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <User size={15} color="#64748B" />
                            My Profile
                          </Link>
                          <Link
                            to="/blogs/create"
                            onClick={() => setUserDropdown(false)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              fontSize: '14px', color: '#334155',
                              textDecoration: 'none',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <PenLine size={15} color="#64748B" />
                            New Post
                          </Link>
                          <div style={{ height: '1px', background: '#F1F5F9', margin: '6px 0' }} />
                          <button
                            onClick={handleLogout}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              fontSize: '14px', color: '#EF4444',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              width: '100%',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#FFF5F5'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <LogOut size={15} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link to="/" className="btn-secondary" style={{ padding: '9px 18px', fontSize: '14px', borderRadius: '10px' }}>
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary" style={{ padding: '9px 18px', fontSize: '14px', borderRadius: '10px' }}>
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '8px', color: '#0F172A' }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed', top: '68px', left: 0, right: 0, bottom: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 999,
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderBottom: '1px solid #E2E8F0',
              animation: 'fadeInUp 0.2s ease',
            }}
            onClick={e => e.stopPropagation()}
          >
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: isActive(link.to) ? '#2563EB' : '#334155',
                  background: isActive(link.to) ? '#EFF6FF' : 'transparent',
                  textDecoration: 'none',
                  marginBottom: '4px',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ height: '1px', background: '#F1F5F9', margin: '12px 0' }} />
            {token ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '14px 16px', borderRadius: '10px', fontSize: '16px', fontWeight: '500', color: '#334155', textDecoration: 'none', marginBottom: '4px' }}>Profile</Link>
                <Link to="/blogs/create" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '14px 16px', borderRadius: '10px', fontSize: '16px', fontWeight: '500', color: '#334155', textDecoration: 'none', marginBottom: '4px' }}>Write Post</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ display: 'block', padding: '14px 16px', borderRadius: '10px', fontSize: '16px', fontWeight: '500', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>Sign Out</button>
              </>
            ) : (
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <Link to="/" onClick={() => setMenuOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Sign In</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: '68px' }} />
    </>
  );
}
