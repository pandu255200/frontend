import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('https://gopi-nath-a4tk.vercel.app/', { username, password });
            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin/panel');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const navigateToCoupons = () => {
        navigate('/');
    };

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="button-group">
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
                <button type="button" className="coupon-btn" onClick={navigateToCoupons}>
                    Coupons
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AdminLogin;
