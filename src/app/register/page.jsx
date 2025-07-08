'use client';

import { useState } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';
import Link from 'next/link';


export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    major: '',
    phone: '',
    address: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/auth/register', formData);
      setSuccess('Registrasi berhasil. Silakan login.');
      setError('');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Registrasi gagal. Coba lagi.';
      setError(message);
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputRow}>
            <div className={styles.formLeft}>
              <input type="text" name="fullName" placeholder="Nama Lengkap" value={formData.fullName} onChange={handleChange} required className={styles.input} />
              <input type="text" name="institution" placeholder="Institusi" value={formData.institution} onChange={handleChange} required className={styles.input} />
                            <input type="text" name="major" placeholder="Jurusan" value={formData.major} onChange={handleChange} required className={styles.input} />
            </div>
            <div className={styles.formRight}>
              <input type="text" name="phone" placeholder="No. HP" value={formData.phone} onChange={handleChange} required className={styles.input} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={styles.input} />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className={styles.input} />
            </div>
          </div>
                      <input type="text" name="address" placeholder="Alamat" value={formData.address} onChange={handleChange} required className={styles.input} />

          <button type="submit" className={styles.button}>Register</button>
        </form>
        <p className={styles.loginPrompt}>
          Sudah punya akun?
          <Link href="/login" className={styles.loginLink}> Login</Link>
        </p>
      </div>
    </div>
  );
}
