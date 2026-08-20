import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link: '',
    github_url: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      link: '',
      github_url: ''
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description || '',
      image_url: project.image_url || '',
      link: project.link || '',
      github_url: project.github_url || ''
    });
    setEditingId(project.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProjects();
    } catch (error) {
      alert('Error deleting project: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingId);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([formData]);
          
        if (error) throw error;
      }
      
      fetchProjects();
      resetForm();
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
  };

  return (
    <div className="dashboard-page container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Project Management</h1>
          <p className="dashboard-subtitle">Manage your portfolio projects</p>
        </div>
        {!isFormOpen && (
          <button className="btn-neon flex-center" onClick={() => setIsFormOpen(true)}>
            <Plus size={18} style={{ marginRight: '8px' }} />
            New Project
          </button>
        )}
      </header>

      {isFormOpen && (
        <div className="dashboard-form-container glass-panel animate-fade-in">
          <div className="form-header">
            <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <button className="btn-icon" onClick={resetForm}>
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="dashboard-form">
            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  className="form-input"
                  value={formData.image_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-input form-textarea"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label">Live Link URL</label>
                <input
                  type="url"
                  name="link"
                  className="form-input"
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">GitHub URL</label>
                <input
                  type="url"
                  name="github_url"
                  className="form-input"
                  value={formData.github_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-primary" onClick={resetForm}>Cancel</button>
              <button type="submit" className="btn-neon flex-center">
                <Check size={18} style={{ marginRight: '8px' }} />
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="projects-table-container glass-panel">
        {loading ? (
          <div className="p-4 text-center text-neon">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-4 text-center text-muted">No projects found. Add one above!</div>
        ) : (
          <table className="projects-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Links</th>
                <th>Date Added</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="font-semibold">{project.title}</td>
                  <td>
                    <div className="table-links">
                      {project.link && <a href={project.link} target="_blank" rel="noreferrer" className="text-neon-hover">Live</a>}
                      {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="text-neon-hover">GitHub</a>}
                    </div>
                  </td>
                  <td className="text-muted">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon edit-btn" onClick={() => handleEdit(project)}>
                        <Edit2 size={18} />
                      </button>
                      <button className="btn-icon delete-btn" onClick={() => handleDelete(project.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
