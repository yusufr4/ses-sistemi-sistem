import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Bu fonksiyon, App.jsx'ten gelecek.
// Orada kullanıcının giriş yapıp yapmadığını tutan bir state olacak.
function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Yönlendirme yapmak için kullanılır

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şifreyi burada kontrol ediyoruz.
    // GERÇEK PROJEDE ŞİFREYİ KODUN İÇİNE YAZMAK GÜVENLİ DEĞİLDİR!
    // Ama bizim basit senaryomuz için şimdilik yeterli.
    // Bu şifreyi daha sonra Vercel Ortam Değişkenlerinden alacağız.
    if (password === 'tkasygtbs') {
      onLogin(); // App.jsx'e "giriş yapıldı" bilgisini gönder
      navigate('/admin'); // Başarılı giriş sonrası /admin sayfasına yönlendir
    } else {
      setError('Hatalı şifre! Lütfen tekrar deneyin.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Admin Girişi</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default LoginPage;