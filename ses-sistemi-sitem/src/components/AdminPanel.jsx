import React, { useState } from 'react';

// Artık Firebase importlarına burada gerek yok!
// function AdminPanel(props) olarak da yazılabilir, { onUrunEkle } daha modern bir kullanım.
function AdminPanel({ onUrunEkle }) {
  const [urunAdi, setUrunAdi] = useState('');
  const [fiyat, setFiyat] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [resimUrl, setResimUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!urunAdi || !fiyat) {
      alert('Lütfen Ürün Adı ve Fiyat alanlarını doldurun.');
      return;
    }
    
    // App.jsx'den gelen fonksiyonu çağırıyoruz ve form verilerini ona gönderiyoruz.
    const basariliMi = await onUrunEkle({
      ad: urunAdi,
      fiyat: Number(fiyat),
      aciklama: aciklama,
      resimUrl: resimUrl,
    });
    
    // Eğer App.jsx'deki işlem başarılıysa formu temizle
    if (basariliMi) {
      alert('Ürün başarıyla eklendi!');
      setUrunAdi('');
      setFiyat('');
      setAciklama('');
      setResimUrl('');
    } else {
      alert('Ürün eklenirken bir hata oluştu! Lütfen tekrar deneyin.');
    }
  };

  // Geri kalan JSX (HTML) kısmı aynı kalıyor.
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Admin Paneli - Yeni Ürün Ekle</h2>
      <form onSubmit={handleSubmit}>
        {/* Input alanları burada aynı şekilde duruyor... */}
        <div style={{ marginBottom: '15px' }}>
          <label>Ürün Adı:</label><br />
          <input type="text" value={urunAdi} onChange={(e) => setUrunAdi(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Fiyat (₺):</label><br />
          <input type="number" value={fiyat} onChange={(e) => setFiyat(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Açıklama:</label><br />
          <textarea value={aciklama} onChange={(e) => setAciklama(e.target.value)} style={{ width: '100%', padding: '8px', minHeight: '100px' }}></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Resim URL'i:</label><br />
          <input type="text" value={resimUrl} onChange={(e) => setResimUrl(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
          Ürünü Kaydet
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;