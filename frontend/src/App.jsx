import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import ViewMembers from './pages/ViewMembers';
import MemberDetails from './pages/MemberDetails';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Student Team Members Management</h1>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddMember />} />
            <Route path="/members" element={<ViewMembers />} />
            <Route path="/members/:id" element={<MemberDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
