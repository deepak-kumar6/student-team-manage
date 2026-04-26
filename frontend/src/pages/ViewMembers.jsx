import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/members');
        setMembers(response.data);
      } catch (err) {
        setError('Failed to fetch members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <div className="loading">Loading members...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Team Members</h2>
        <Link to="/add" className="btn">Add Member</Link>
      </div>

      {members.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          No members found. Add some members to see them here!
        </div>
      ) : (
        <div className="members-grid">
          {members.map((member) => (
            <div key={member._id} className="member-card glass-panel">
              <img 
                src={`http://localhost:5000/uploads/${member.image}`} 
                alt={member.name} 
                className="member-img"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <Link to={`/members/${member._id}`} className="btn btn-secondary">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMembers;
