import React from 'react';
import { Link } from 'react-router-dom';

// children: Layout'un sarmaladığı sayfa içeriği (HomePage, AdminPage vs.)
function Layout({ children }) {
  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <Link to="/" style={styles.logo}>
          Ses Dünyası
        </Link>
        <nav>
          <Link to="/" style={styles.navLink}>Ana Sayfa</Link>
          <Link to="/admin" style={styles.navLink}>Admin</Link>
        </nav>
      </header>

      <main style={styles.mainContent}>
        {children}
      </main>

      <footer style={styles.footer}>
        <h3>İletişim Bilgileri</h3>
        <p>Adres: Yenişehir Mah. Hastane Cad. No:17, bingöl</p>
        <p>Telefon: 0(552) 213 27 71</p>
        <p>Email: bilgi@sesdunyasi.com</p>
        <p>© {new Date().getFullYear()} Ses Dünyası. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

// Stil (CSS) kodlarını doğrudan JavaScript içinde obje olarak tanımlıyoruz.
// Bu yönteme "inline styles" denir ve küçük projeler için çok pratiktir.
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Sayfanın en az ekran boyu kadar olmasını sağlar
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#282c34',
    padding: '1rem 2rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '1.1rem'
  },
  mainContent: {
    flex: '1', // Header ve Footer dışındaki tüm alanı kaplamasını sağlar
    padding: '2rem'
  },
  footer: {
    backgroundColor: '#20232a',
    color: 'white',
    textAlign: 'center',
    padding: '2rem'
  }
};

export default Layout;