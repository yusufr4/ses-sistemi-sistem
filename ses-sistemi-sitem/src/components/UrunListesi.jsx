import React from 'react';

// Bu bileşen, ürün listesini ve yüklenme durumunu App.jsx'ten "props" olarak alır.
function UrunListesi({ urunler, loading }) {

  // Veriler hala yükleniyorsa, ekranda bir mesaj gösterir.
  if (loading) {
    return <h2>Ürünler Yükleniyor...</h2>;
  }

  // Ürünler yüklendikten sonra listeyi gösterir.
  return (
    <div>
      {/* Bu başlık artık HomePage.jsx içinde olduğu için isteğe bağlı olarak kaldırılabilir */}
      {/* <h1>Tüm Ürünlerimiz</h1> */} 
      <div style={styles.productListContainer}>
        {urunler.length === 0 ? (
          <p>Gösterilecek ürün bulunamadı.</p>
        ) : (
          // urunler dizisindeki her bir ürün için bir kart oluşturur.
          urunler.map(urun => (
            // Her kartın kendine özgü bir "key" prop'u olmalı. Bu, React için önemlidir.
            <div key={urun.id} style={styles.productCard}>
              <img 
                src={urun.resimUrl || 'https://via.placeholder.com/300x200.png?text=Resim+Yok'} 
                alt={urun.ad} 
                style={styles.productImage}
              />
              <div style={styles.productInfo}>
                <h3 style={styles.productName}>{urun.ad}</h3>
                <p style={styles.productDescription}>{urun.aciklama}</p>
                <h4 style={styles.productPrice}>{urun.fiyat} ₺</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Stil (CSS) kodlarını JavaScript objeleri olarak tanımlıyoruz.
const styles = {
  productListContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem', // Kartlar arası boşluk
    justifyContent: 'center',
    padding: '1rem 0' // Üstten ve alttan biraz boşluk
  },
  productCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    width: '320px',
    overflow: 'hidden', // Resmin kartın köşelerinden taşmasını engeller
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer', // Kartın üzerine gelince imlecin değişmesi
    '&:hover': { // Bu sözde sınıf normal inline style ile çalışmaz, ama fikir vermesi için burada
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
    }
  },
  productImage: {
    width: '100%',
    height: '220px',
    objectFit: 'cover'
  },
  productInfo: {
    padding: '1.25rem', // İç boşluğu biraz artırdık
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  productName: {
    marginTop: '0',
    marginBottom: '0.5rem',
    fontSize: '1.25rem',
    color: '#333'
  },
  productDescription: {
    color: '#666',
    fontSize: '0.9rem',
    flexGrow: '1', // Açıklama alanının esneyerek fiyatı en alta itmesini sağlar
    marginBottom: '1rem'
  },
  productPrice: {
    color: '#007bff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    alignSelf: 'flex-end', // Fiyatı sağa yaslar
    marginTop: 'auto' // Otomatik margin ile kendini en dibe iter
  }
};

export default UrunListesi;