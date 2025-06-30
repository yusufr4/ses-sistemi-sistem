import React from 'react';
import UrunListesi from '../components/UrunListesi'; // Dikkat: '../' ile bir üst klasöre çıkıyoruz

// Bu sayfa, App.jsx'ten gelen ürünleri ve yüklenme durumunu alacak
function HomePage({ urunler, loading }) {
  return (
    <div>
      <h1>Ses Sistemleri Dünyasına Hoş Geldiniz!</h1>
      <UrunListesi urunler={urunler} loading={loading} />
    </div>
  );
}

export default HomePage;