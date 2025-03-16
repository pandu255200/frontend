import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pannel.css';

const ClaimCoupon = () => {
  const [message, setMessage] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClaim = async () => {
    try {
      setLoading(true);
      setMessage('');
      setCoupon(null);
      const res = await axios.post('https://gopi-nath-a4tk.vercel.app/', {}, { withCredentials: true });


      // ✅ Make sure coupon object is received and set
      setCoupon(res.data.coupon);
      setMessage('✅ Coupon claimed successfully!');
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || 'Error claiming coupon'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎁 Claim a Coupon</h2>

      <button onClick={handleClaim} style={styles.button} disabled={loading}>
        {loading ? 'Claiming...' : 'Claim Now'}
      </button>

      {message && <p style={styles.message}>{message}</p>}

      {/* ✅ Safely access coupon code */}
      {coupon?.code && (
        <p style={styles.coupon}>
          🎉 Coupon Code: <strong>{coupon.code}</strong>
        </p>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <button onClick={() => navigate('/admin/login')} style={styles.adminButton}>
        🔐 Admin Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '2rem',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    background: '#fafafa',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  adminButton: {
    backgroundColor: '#333',
    padding: '10px 20px',
    fontSize: '15px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  },
  coupon: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#0a8a0a',
  },
};

export default ClaimCoupon;
