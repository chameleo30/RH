import { useNavigate } from 'react-router-dom';

import ProfileCard from "../Components/ProfileCard";
import DemandeCongeForm from "../Components/DemandeCongeForm";
import NotificationsList from "../Components/NotificationsList";
import DemandesList from "../Components/DemandesList";
import EmployesList from "../Components/EmployesList";

import "../style/main.css";

export default function DashBoard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleDeconnexion = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <div className="logo">H</div>
          <h1>HR MANAGEMENT DASHBOARD</h1>
        </div>
        <nav className="nav-menu">
          <div className="nav-item"  onClick={handleDeconnexion}>
            <span className="nav-icon">↩️</span>
            <span>Déconnexion</span>
          </div>
        </nav>
      </header>

      <div className="container">
        <ProfileCard />
        {user.role === 'EMPLOYE' ? (
          <>
            <DemandeCongeForm />
            <NotificationsList />
          </>
        ) : (
          <>
            <DemandesList />
            <EmployesList />
          </>
        )}
      </div>
    </>
  );
}