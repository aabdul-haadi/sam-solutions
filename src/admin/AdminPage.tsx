import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const AdminPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => sessionStorage.getItem('isAuthenticated') === 'true');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated && location.pathname !== '/admin/login') {
            navigate('/admin/login');
        }
    }, [isAuthenticated, location.pathname, navigate]);

    const handleLogin = (password: string) => {
        // Validation already performed by LoginPage component via backend call
        sessionStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        navigate('/admin/login');
    };

    return (
        <Routes>
            <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="dashboard" element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : null} />
        </Routes>
    );
};

export default AdminPage;
