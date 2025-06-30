import React from 'react'; // Virgül kaldırıldı
import AdminPanel from '../components/AdminPanel';

// Bu sayfa, App.jsx'ten tüm ürünleri ve fonksiyonları alacak
function AdminPage({ urunler, onUrunEkle, onUrunSil, onUrunGuncelle }) {

  // Düzenlenecek ürünü takip etmek için bir state
  const [duzenlenecekUrun, setDuzenlenecekUrun] = React.useState(null);

  // "Düzenle" butonuna tıklandığında bu fonksiyon çalışır
  const handleDuzenleClick = (urun) => {
    setDuzenlenecekUrun(urun);
    window.scrollTo(0, 0); 
  };
  
  // "Sil" butonuna tıklandığında bu fonksiyon çalışır
  const handleSilClick = (urunId) => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      onUrunSil(urunId);
    }
  };

  return (
    <div>
      <h1>Yönetim Paneli</h1>
      <p>Bu sayfadan yeni ürün ekleyebilir, mevcut ürünleri düzenleyebilir veya silebilirsiniz.</p>
      
      {/* AdminPanel'e artık setDuzenlenecekUrun prop'u da gönderiliyor */}
      <AdminPanel 
        onUrunEkle={onUrunEkle} 
        mevcutUrun={duzenlenecekUrun}
        onUrunGuncelle={onUrunGuncelle}
        setDuzenlenecekUrun={setDuzenlenecekUrun} // EKLENEN SATIR
      />
      
      <hr style={{ margin: '40px 0' }} />
      
      <h2>Mevcut Ürünler</h2>
      <div style={styles.adminUrunListesi}>
        {urunler.map(urun => (
          <div key={urun.id} style={styles.adminUrunKarti}>
            <span>{urun.ad}</span>
            <div>
              <button onClick={() => handleDuzenleClick(urun)} style={styles.duzenleButon}>
                Düzenle
              </button>
              <button onClick={() => handleSilClick(urun.id)} style={styles.silButon}>
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Stil kodları aynı kalıyor
const styles = {
  adminUrunListesi: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  adminUrunKarti: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  duzenleButon: {
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    marginRight: '10px'
  },
  silButon: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  }
};

export default AdminPage;