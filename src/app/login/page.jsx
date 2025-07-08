'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import api from '@/lib/axios';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', formData);
      const { token } = res.data;
      localStorage.setItem('token', token);
      router.push('/');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login gagal. Cek email atau password.';
      setError(message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.logo}></div>
        <div className={styles.typingText}>
          <h1>Wellcome To <br />Sarastya Code Playground</h1>
        </div>
      </div>

      {/* Login Form Section */}
      <div className={styles.formSection}>
        <div className={styles.card}>
          <h2 className={styles.title}>Login</h2>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'password' : 'text'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>

          <p className={styles.registerPrompt}>
            Belum punya akun? <button onClick={() => router.push('/register')}>Daftar</button>
          </p>
        </div>
      </div>
    </div>
  );
}
