import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">rifqi.dev</span>
        </Link>
        <div className="navbar-links">
          {isHome && (
            <>
              <a href="#home" className="nav-link active">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#projects" className="nav-link">Portfolio</a>
              <a href="mailto:contact@example.com" className="nav-link">Contact</a>
            </>
          )}
          {session ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="btn-icon">
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
