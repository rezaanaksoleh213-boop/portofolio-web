import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import { User, LogOut, Code2 } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

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

  return (
    <nav className="navbar glass-panel">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <Code2 className="text-neon" size={28} />
          <span className="brand-text">P O R T F O L I O</span>
        </Link>
        <div className="navbar-links">
          {session ? (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-icon">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-neon">
              <span className="flex-center">
                <User size={18} style={{ marginRight: '8px' }} />
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
