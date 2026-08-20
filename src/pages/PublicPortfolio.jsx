import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProjectCard from '../components/ProjectCard';
import './PublicPortfolio.css';
import { Sparkles, Terminal, User, FileText, Star, Code, Award, ArrowUpRight } from 'lucide-react';

export default function PublicPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('projects');

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
        { id: 'dummy-1', title: 'Project Portofolio', description: 'Portofolio adalah kumpulan dokumen, karya proyek, atau pencapaian terbaik seseorang yang disusun...', image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', link: '#', github_url: '#' },
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
      {/* Hero Section - Brutalist ID Card (Muncul Duluan) */}
      <section className="hero-section container">
        <div className="hero-grid-brutalist">
          <div 
            className="hero-content"
            style={{ 
              transform: `translateY(${scrollY * 0.15}px)`, 
              opacity: 1 - scrollY / 600 
            }}
          >
            <div className="status-badge">
              <span className="pulse-dot"></span> AVAILABLE FOR WORK
            </div>
            <h1 className="hero-title">
              Frontend<br />
              <span className="outline-text">Developer</span>
            </h1>
            <p className="hero-subtitle">Junior P</p>
            <p className="hero-desc" style={{ maxWidth: '600px' }}>
              Menciptakan website modern dengan tampilan clean, responsif, dan elegan. Mengubah ide dan desain menjadi pengalaman digital yang menarik dan mudah digunakan.
            </p>
            <div className="tech-stack">
              <span className="tech-pill">TypeScript</span>
              <span className="tech-pill">React.js</span>
              <span className="tech-pill">Tailwind</span>
            </div>
            <ul className="hero-bullets">
              <li>✓ Explore my work below</li>
              <li>✓ Open to Full-time & Freelance opportunities</li>
            </ul>
          </div>
          
          <div className="hero-visual">
            <div 
              className="id-card-wrapper"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            >
              <div className="lanyard">
                 <div className="lanyard-text">rifqi.dev • rifqi.dev • rifqi.dev</div>
              </div>
              <div className="id-card">
                <div className="id-card-hole"></div>
                <div className="id-card-inner">
                  <div className="id-photo-placeholder">
                    <img src="/profile.jpg" alt="Reza Nurhakim" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Name and Circle Photo */}
      <section id="about" className="about-section container" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '5rem', marginTop: '5rem' }}>
        <div className="hero-top-wrapper">
          <div className="hero-content">
            <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', textTransform: 'none' }}>
              Reza<br />
              Nurhakim
            </h1>
            <p className="hero-desc" style={{ maxWidth: '550px' }}>
              From (Sekolah/Universitas), saya seorang web developer dengan passion di bidang frontend development dan UI modern. Berfokus pada pembuatan website clean, responsif, dan visual yang kuat untuk menghadirkan pengalaman digital yang optimal.
            </p>
            <p className="hero-quote">
              "Turning ideas into clean, modern, and meaningful digital experiences."
            </p>
            <div className="hero-actions">
              <button className="btn-solid">
                <FileText size={18} /> Download CV
              </button>
              <button className="btn-outline">
                <Star size={18} /> View Projects
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="profile-circle">
              <div className="profile-image-container">
                <img src="/profile.jpg" alt="Reza Nurhakim" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <Code size={20} className="stat-icon" />
              <span className="stat-number">1</span>
            </div>
            <div className="stat-label">
              PROJECTS <ArrowUpRight size={14} className="arrow-icon" />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <Award size={20} className="stat-icon" />
              <span className="stat-number">1</span>
            </div>
            <div className="stat-label">
              CERTIFICATES <ArrowUpRight size={14} className="arrow-icon" />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-header">
              <FileText size={20} className="stat-icon" />
              <span className="stat-number">2</span>
            </div>
            <div className="stat-label">
              COMPLETED WORKS <ArrowUpRight size={14} className="arrow-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section id="projects" className="showcase-section container">
        <div className="showcase-header">
          <h2 className="showcase-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'none' }}>Portfolio Showcase</h2>
          <p className="showcase-subtitle">Explore my journey through projects, certifications, and technical expertise</p>
          
          <div className="showcase-tabs">
            <button 
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button 
              className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
              onClick={() => setActiveTab('certificates')}
            >
              Certificates
            </button>
            <button 
              className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
              onClick={() => setActiveTab('tech')}
            >
              Tech Stack
            </button>
          </div>
        </div>
        
        <div className="showcase-content">
          {activeTab === 'projects' && (
            loading ? (
              <div className="loading-state text-muted">Loading projects...</div>
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
            )
          )}
          
          {activeTab === 'certificates' && (
            <div className="empty-state glass-panel">
              <p>No certificates added yet.</p>
            </div>
          )}
          
          {activeTab === 'tech' && (
            <div className="empty-state glass-panel">
              <p>Tech stack details coming soon.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}
