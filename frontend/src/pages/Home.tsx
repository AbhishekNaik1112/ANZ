import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2 className="page-title">Welcome to ANZ Auth System</h2>
      <p>You are successfully authenticated!</p>
      <div className="button-group">
        <button className="primary" onClick={() => navigate('/admin')}>Go to admin page</button>
        <button className="danger" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
