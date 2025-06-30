import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bileşenler ve Sayfalar
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// Firebase importlarına silme (deleteDoc) ve güncelleme (updateDoc) eklendi
import { db } from './firebaseConfig.js';
import { 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  doc,        // Belirli bir dokümanı referans almak için
  deleteDoc,  // Doküman silmek için
  updateDoc   // Doküman güncellemek için
} from 'firebase/firestore';

// CSS Dosyası
import './App.css';

function App() {
  const [urunler, setUrunler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // --- Veri Çekme Fonksiyonu (Değişiklik yok) ---
  const fetchUrunler = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'urunler'), orderBy('eklenmeTarihi', 'desc'));
      const urunlerSnapshot = await getDocs(q);
      const urunListesi = urunlerSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUrunler(urunListesi);
    } catch (error) {
      console.error("Ürünleri çekerken hata: ", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUrunler();
  }, []);

  // --- Ürün Yönetim Fonksiyonları ---

  const handleUrunEkle = async (yeniUrun) => {
    try {
      await addDoc(collection(db, "urunler"), {
        ...yeniUrun,
        eklenmeTarihi: new Date()
      });
      fetchUrunler(); 
      return true;
    } catch (error) {
      console.error("Ürün eklenirken hata: ", error);
      return false;
    }
  };

  // YENİ: Ürün Silme Fonksiyonu
  const handleUrunSil = async (urunId) => {
    try {
      // 'urunler' koleksiyonu içindeki doğru dokümanı ID'sine göre bul
      const urunRef = doc(db, 'urunler', urunId);
      await deleteDoc(urunRef);
      // Listeyi anında güncellemek için ürünleri yeniden çek
      fetchUrunler();
      alert("Ürün başarıyla silindi!");
    } catch (error) {
      console.error("Ürün silinirken hata: ", error);
      alert("Ürün silinirken bir hata oluştu.");
    }
  };

  // YENİ: Ürün Güncelleme Fonksiyonu
  const handleUrunGuncelle = async (urunId, guncelVeri) => {
    try {
      const urunRef = doc(db, 'urunler', urunId);
      await updateDoc(urunRef, guncelVeri);
      // Başarılı güncelleme sonrası listeyi yeniden çek
      fetchUrunler();
      return true; // İşlemin başarılı olduğunu bildir
    } catch (error) {
      console.error("Ürün güncellenirken hata: ", error);
      return false; // İşlemin başarısız olduğunu bildir
    }
  };
  
  // --- Kullanıcı Giriş Fonksiyonu (Değişiklik yok) ---
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Ana Sayfa Rotası */}
          <Route 
            path="/" 
            element={<HomePage urunler={urunler} loading={loading} />} 
          />
          
          {/* Giriş Sayfası Rotası */}
          <Route 
            path="/login" 
            element={<LoginPage onLogin={handleLogin} />} 
          />
          
          {/* Korumalı Admin Rotası (GÜNCELLENDİ) */}
          <Route 
            path="/admin"
            element={
              <ProtectedRoute isAuth={isAuthenticated}>
                <AdminPage 
                  urunler={urunler} // Mevcut ürünleri admin sayfasına gönder
                  onUrunEkle={handleUrunEkle}
                  onUrunSil={handleUrunSil}         // Yeni silme fonksiyonunu prop olarak geç
                  onUrunGuncelle={handleUrunGuncelle} // Yeni güncelleme fonksiyonunu prop olarak geç
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;