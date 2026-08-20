import { ExternalLink, Code } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`project-card glass-panel ${isVisible ? 'is-visible' : 'is-hidden'}`}
    >
      <div className="project-image-container">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="project-image" />
        ) : (
          <div className="project-image-placeholder">
            <span>No Image</span>
          </div>
        )}
        <div className="project-overlay">
          <div className="project-links">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="View Project">
                <ExternalLink size={20} />
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="View Code">
                <Code size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
    </div>
  );
}
