import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProjectCard from '../components/ProjectCard';
import './PublicPortfolio.css';
import { Sparkles, Terminal, User } from 'lucide-react';

export default function PublicPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    fetchProjects();
    
    // Parallax scroll listener
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Jika kosong, berikan data dummy agar user bisa melihat animasi scroll
      const dummyData = [
        { id: 'dummy-1', title: 'Cyberpunk E-Commerce', description: 'Platform e-commerce modern dengan desain futuristik dan performa tinggi.', image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', link: '#', github_url: '#' },
        { id: 'dummy-2', title: 'Neon Task Manager', description: 'Aplikasi manajemen tugas bergaya dark mode dengan aksen neon.', image_url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80', link: '#', github_url: '#' },
        { id: 'dummy-3', title: 'AI Analytics Dashboard', description: 'Dashboard analitik interaktif untuk memonitor data secara real-time.', image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', link: '#', github_url: '#' }
      ];
      
      setProjects(data && data.length > 0 ? data : dummyData);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div 
          className="hero-content animate-fade-in"
          style={{ 
            transform: `translateY(${scrollY * 0.25}px)`, 
            opacity: 1 - scrollY / 700 
          }}
        >
          <div className="badge-neon">
            <Sparkles size={16} />
            <span>CREATIVE DEVELOPER</span>
          </div>
          <h1 className="hero-title">
            Crafting <span className="text-neon">Digital</span> <br /> Experiences
          </h1>
          <p className="hero-subtitle">
            안녕하세요. I build aesthetic, high-performance web applications with a focus on modern design and scalable architecture.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-neon">View My Work</a>
            <a href="mailto:contact@example.com" className="btn-primary">Contact Me</a>
          </div>
        </div>
        <div className="hero-visual">
          {/* Decorative neon elements with parallax */}
          <div 
            className="neon-circle circle-1"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          ></div>
          <div 
            className="neon-circle circle-2"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          ></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section container">
        <div className="section-header">
          <User className="text-neon" size={32} />
          <h2 className="section-title">About <span className="text-neon">Me</span></h2>
        </div>
        
        <div className="about-content glass-panel">
          <div className="about-text">
            <h3 className="about-name">Reza Nurhakim</h3>
            <p className="about-role">Frontend Web Developer & Designer</p>
            <p className="about-description">
              Saya adalah seorang pengembang website yang bersemangat dalam membangun aplikasi interaktif dengan performa tinggi dan desain estetis. Saya suka bereksperimen dengan desain bergaya modern seperti *dark mode*, *neon accents*, dan *glassmorphism* untuk menciptakan pengalaman digital yang menarik bagi pengguna.
            </p>
            
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value text-neon">Jakarta, Indonesia</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Experience:</span>
                <span className="detail-value text-neon">3+ Years</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value text-neon">halo@rezanurhakim.dev</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tech Stack:</span>
                <span className="detail-value text-neon">React, Supabase, Tailwind, UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section container">
        <div className="section-header">
          <Terminal className="text-neon" size={32} />
          <h2 className="section-title">Selected <span className="text-neon">Projects</span></h2>
        </div>
        
        {loading ? (
          <div className="loading-state text-neon">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="empty-state glass-panel">
            <p>No projects found. Check back later!</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        <p className="footer-sub">Designed with a dark neon aesthetic.</p>
      </footer>
    </div>
  );
}
