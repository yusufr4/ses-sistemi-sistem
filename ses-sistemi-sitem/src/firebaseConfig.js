// DOSYANIN İÇİNDEKİ HER ŞEYİ SİLİP BUNU YAPIŞTIR

// 1. Gerekli fonksiyonları Firebase kütüphanesinden import et
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 2. Senin projenin Firebase konfigürasyon bilgileri
// BU KISMIN SANA AİT BİLGİLERLE DOLU OLDUĞUNDAN EMİN OL
const firebaseConfig = {
  apiKey: "AIzaSyC0RjGTAhXbOY4YgycD1AnsNxBEHObsmtg",
  authDomain: "seslendirme-sistemi-sistem.firebaseapp.com",
  projectId: "seslendirme-sistemi-sistem",
  storageBucket: "seslendirme-sistemi-sistem.firebasestorage.app",
  messagingSenderId: "491828937166",
  appId: "1:491828937166:web:1fceed6617d1bfdba6eb9f"
};

// 3. Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// 4. Firestore veritabanını başlat ve başka dosyalarda kullanmak için dışa aktar (export)
export const db = getFirestore(app);