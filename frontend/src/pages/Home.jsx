import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to the Team</h2>
      <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)', textAlign: 'center' }}>
        KANEESH G ( RA2311056010101 )
      </h3>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Manage your student team members effectively.
      </p>
      <div className="nav-buttons">
        <Link to="/add" className="btn">Add Member</Link>
        <Link to="/members" className="btn btn-secondary">View Members</Link>
      </div>
    </div>
  );
}

export default Home;
