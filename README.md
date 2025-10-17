# 🔐 React Firebase Auth App

Modern React (Vite) + Firebase Authentication örneği.  
Kullanıcı kayıt, giriş, profil güncelleme ve korumalı (Protected) sayfa geçişleri içerir.

---

## 🚀 Özellikler
- 🔑 Firebase Authentication (Email + Password)
- 🔒 ProtectedRoute (korunan sayfalar)
- 🧠 Redux ile kullanıcı durumu yönetimi
- 🏠 Ana giriş sayfası (MainPage)
- 👤 Profil güncelleme (UpdateProfile)
- 💅 TailwindCSS tasarımı

---

## 🛠️ Kurulum

### 1️⃣ Depoyu klonla
```bash
git clone https://github.com/kullaniciadi/proje-adi.git
cd proje-adi


2️⃣ Bağımlılıkları yükle

npm install


3️⃣ Firebase yapılandırmasını ekle

src/firebase/firebaseConfig.js dosyasını oluştur ve Firebase konsolundaki bilgilerini gir:

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API_KEYİN",
  authDomain: "PROJEN.firebaseapp.com",
  projectId: "PROJE_ID",
  storageBucket: "PROJE.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

▶️ Çalıştırma
npm run dev# login-firebase
