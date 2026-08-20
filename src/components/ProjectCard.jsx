import { ArrowRight, Image as ImageIcon } from 'lucide-react';
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
      className={`project-card ${isVisible ? 'is-visible' : 'is-hidden'}`}
    >
      <div className="card-thumbnail-container">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="card-thumbnail" />
        ) : (
          <div className="card-thumbnail-placeholder">
            <ImageIcon size={32} />
          </div>
        )}
      </div>
      
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        
        <div className="card-footer">
          <span className="card-tag">Web App</span>
          <a href={project.link || '#'} className="btn-details">
            Details <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
