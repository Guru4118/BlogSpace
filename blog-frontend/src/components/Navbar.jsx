import { Link, useNavigate } from 'react-router-dom';
import { Menu, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = () => {
    if (token) {
      navigate('/profile');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-2xl bg-gradient-to-br from-pink-100 to-pink-300 p-4 flex justify-between items-center rounded-3xl px-6">
        <Link to="/" className="text-xl font-bold text-pink-600">BlogSpace</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-pink-800 font-medium">
          <Link to="/Home">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/blogs/create">Create</Link>
          <button
            onClick={handleProfileClick}
            className="bg-pink-400 px-4 py-2 rounded-full text-white"
          >
            Profile
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-pink-600" onClick={() => setMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/4 h-full bg-gradient-to-br from-white via-white to-pink-300 rounded-l-4xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Icon */}
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-pink-600">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-6 p-6 text-lg text-pink-700 font-medium">
          <Link to="/Home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link to="/blogs/create" onClick={() => setMenuOpen(false)}>Create</Link>
          <button
            onClick={() => {
              handleProfileClick();
              setMenuOpen(false);
            }}
            className="bg-pink-400 px-4 py-2 rounded-full text-white w-full text-left"
          >
            Profile
          </button>
        </div>
      </div>
    </>
  );
}
