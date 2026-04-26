import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(response.data);
      } catch (err) {
        setError('Failed to fetch member details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!member) return <div className="error">Member not found</div>;

  return (
    <div className="details-container glass-panel">
      <img 
        src={`http://localhost:5000/uploads/${member.image}`} 
        alt={member.name} 
        className="details-img"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
        }}
      />
      <div className="details-info" style={{ textAlign: 'left', marginTop: '1rem' }}>
        <h2 style={{ textAlign: 'center' }}>{member.name}</h2>
        <div className="role" style={{ textAlign: 'center' }}>{member.role}</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
          <div><strong style={{color: 'var(--text-secondary)'}}>Roll Number:</strong> <br/>{member.roll || 'N/A'}</div>
          <div><strong style={{color: 'var(--text-secondary)'}}>Year:</strong> <br/>{member.year || 'N/A'}</div>
          <div><strong style={{color: 'var(--text-secondary)'}}>Degree:</strong> <br/>{member.degree || 'N/A'}</div>
          <div><strong style={{color: 'var(--text-secondary)'}}>Email:</strong> <br/>{member.email}</div>
          <div><strong style={{color: 'var(--text-secondary)'}}>Certificate:</strong> <br/>{member.certificate || 'N/A'}</div>
          <div><strong style={{color: 'var(--text-secondary)'}}>Internship:</strong> <br/>{member.internship || 'N/A'}</div>
          <div style={{ gridColumn: 'span 2' }}>
            <strong style={{color: 'var(--text-secondary)'}}>Hobbies:</strong> <br/>{member.hobbies || 'N/A'}
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <strong style={{color: 'var(--text-secondary)'}}>About Project:</strong> <br/>
            <p className="glass-panel" style={{ marginTop: '0.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)' }}>
              {member.project || 'No project description provided.'}
            </p>
          </div>
        </div>
      </div>
      <Link to="/members" className="back-link">
        &larr; Back to Members
      </Link>
    </div>
  );
}

export default MemberDetails;
