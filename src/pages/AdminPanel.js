import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pannel.css';

const AdminPanel = () => {
    const [coupons, setCoupons] = useState([]);
    const [newCode, setNewCode] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const fetchCoupons = async () => {
        try {
            const res = await axios.get('https://gopi-nath.vercel.app/coupons', { headers });
            setCoupons(res.data);
        } catch (err) {
            console.error('Error fetching coupons:', err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const addCoupon = async () => {
        try {
            await axios.post('http://localhost:5000/api/admin/add', { code: newCode }, { headers });
            setNewCode('');
            fetchCoupons();
        } catch (err) {
            console.error('Error adding coupon:', err.response?.data || err.message);
        }
    };

    const toggleCoupon = async (id) => {
        try {
            await axios.put(`https://gopi-nath.vercel.app/admin/toggle/${id}`, {}, { headers });
            fetchCoupons();
        } catch (err) {
            console.error('Error toggling coupon:', JSON.stringify(err.response?.data || err.message));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2 className="admin-heading">⚙️ Admin Panel</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="form-section">
                <input
                    className="coupon-input"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    placeholder="Enter New Coupon Code"
                />
                <button className="add-btn" onClick={addCoupon}>Add Coupon</button>
            </div>

            <ul className="coupon-list">
                {coupons.map(c => (
                    <li key={c._id} className="coupon-item">
                        <div className="coupon-details">
                            <span><strong>Code:</strong> {c.code}</span>
                            <span><strong>Claimed:</strong> {c.claimed ? 'Yes' : 'No'}</span>
                            <span><strong>Active:</strong> {c.isActive ? 'Yes' : 'No'}</span>
                        </div>
                        <button className="toggle-btn" onClick={() => toggleCoupon(c._id)}>Toggle</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
