import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddMember() {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    year: '',
    degree: '',
    role: '',
    email: '',
    project: '',
    hobbies: '',
    certificate: '',
    internship: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.role || !formData.email || !image) {
      setError('Name, role, email, and image are required');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('roll', formData.roll);
      submitData.append('year', formData.year);
      submitData.append('degree', formData.degree);
      submitData.append('role', formData.role);
      submitData.append('email', formData.email);
      submitData.append('project', formData.project);
      submitData.append('hobbies', formData.hobbies);
      submitData.append('certificate', formData.certificate);
      submitData.append('internship', formData.internship);
      submitData.append('image', image);

      await axios.post('http://localhost:5000/api/members', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Member added successfully!');
      navigate('/members');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Error adding member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)', fontSize: '2.5rem' }}>ADD MEMBER</h2>
      <div className="glass-panel" style={{
        padding: '3rem',
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap'
      }}>
        {/* Left Side: Image Upload */}
        <div style={{ flex: '1', minWidth: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '200px', height: '200px', borderRadius: '50%', border: '4px dashed var(--glass-border)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: '1.5rem',
            background: 'rgba(0, 0, 0, 0.2)'
          }}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ color: 'var(--text-secondary)' }}>No Image</span>
            )}
          </div>
          <label className="btn btn-secondary" style={{ width: '100%', cursor: 'pointer', textAlign: 'center' }}>
            Choose Photo
            <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        {/* Right Side: Form Fields */}
        <div style={{ flex: '2', minWidth: '300px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Roll Number</label>
                <input type="text" name="roll" value={formData.roll} onChange={handleChange} placeholder="e.g. CS2024" />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Year</label>
                <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="e.g. 3rd Year" />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Degree</label>
                <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="e.g. B.Tech" />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Role</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Frontend Developer" />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
              </div>
              <div className="form-group" style={{ marginBottom: '0', gridColumn: 'span 2' }}>
                <label>About Project</label>
                <textarea 
                  name="project" value={formData.project} onChange={handleChange} placeholder="Describe the project..."
                  style={{
                    minHeight: '100px', resize: 'vertical'
                  }} 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '0', gridColumn: 'span 2' }}>
                <label>Hobbies (comma separated)</label>
                <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="Coding, Reading, Music" />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Certificate</label>
                <input type="text" name="certificate" value={formData.certificate} onChange={handleChange} placeholder="e.g. AWS Certified" />
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Internship</label>
                <input type="text" name="internship" value={formData.internship} onChange={handleChange} placeholder="e.g. Google Intern" />
              </div>
            </div>
            
            {error && <span className="error-msg" style={{ display: 'block', marginTop: '1.5rem' }}>{error}</span>}
            
            <button type="submit" className="btn" style={{ width: '100%', marginTop: '2rem' }} disabled={loading}>
              {loading ? 'Adding...' : 'Add Member'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMember;
