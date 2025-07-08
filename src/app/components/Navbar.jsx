'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import {
  Home,
  ClipboardList,
  User
} from 'lucide-react';

import { useEffect, useState } from 'react';

const menuItems = [
  { label: 'Home', href: '/', icon: <Home size={24} /> },
  { label: 'Login', href: '/login', icon: <User size={24} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize(); // check on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.desktopNavbar} ${isMobile ? styles.hide : ''}`}>
        <div className={styles.logo}>
          <Image src="/images/sarastyaLogo.png" alt="" width={80} height={80} />
        </div>
        <div className={styles.menu}>
          {menuItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.menuItem} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={`${styles.mobileNavbar} ${isMobile ? styles.show : ''}`}>
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.mobileItem} ${pathname === item.href ? styles.active : ''}`}
          >
            {item.icon}
            <span className={styles.mobileLabel}>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
