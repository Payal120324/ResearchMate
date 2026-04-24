import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const initials = user?.email ? user.email.charAt(0).toUpperCase() : '?';

  const goToFeature = (feature) => {
    navigate(`/upload?feature=${feature}`);
  };

  return (
    <div className="w-full bg-deepnavy/90 backdrop-blur-xl border-b border-babyblue/10 px-10 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      {/* LOGO */}
      <h1 className="text-xl font-bold cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => navigate('/')}>
        Research<span className="bg-gradient-to-r from-sapphire to-cornflower bg-clip-text text-transparent">Mate</span>
      </h1>

      {/* MENU */}
      <div className="flex gap-8 text-periwinkle/60 font-medium">
        <Link to="/" className="relative pb-1 hover:text-babyblue transition-colors duration-300 group">
          <span className="text-babyblue border-b-2 border-sapphire pb-1">Home</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sapphire transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <button onClick={() => goToFeature('ask')} className="hover:text-babyblue hover-lift transition-all duration-300">
          Ask Anything
        </button>
        <button onClick={() => goToFeature('summary')} className="hover:text-babyblue hover-lift transition-all duration-300">
          Summarizer
        </button>
        <button onClick={() => goToFeature('recommend')} className="hover:text-babyblue hover-lift transition-all duration-300">
          Recommendations
        </button>
        <button onClick={() => goToFeature('ideas')} className="hover:text-babyblue hover-lift transition-all duration-300">
          Ideas
        </button>
        <button className="hover:text-babyblue hover-lift transition-all duration-300">
          Help
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 bg-gradient-to-br from-sapphire to-cornflower text-white rounded-full flex items-center justify-center text-sm font-semibold hover:scale-110 hover:ring-4 ring-babyblue/30 transition-all duration-300 shadow-lg"
              title="User menu"
            >
              {initials}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-52 bg-deepnavy-light backdrop-blur-xl border border-babyblue/20 rounded-2xl shadow-xl py-2 z-50 animate-fade-in-up">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-sm text-babyblue hover:bg-babyblue/10 hover-lift rounded-xl mx-2 transition-all duration-200"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-900/30 hover-lift rounded-xl mx-2 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="btn shadow-lg"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

