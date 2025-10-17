// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { sendEmailVerification } from "firebase/auth";
import {
    getAuth,
    createUserWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔥 Oturumu tarayıcıda kalıcı hale getiriyoruz:
setPersistence(auth, browserLocalPersistence);

// ✅ E-posta doğrulama gönderme fonksiyonu
export const sendVerificationEmail = async (user) => {
    if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        console.log("✅ Doğrulama e-postası gönderildi:", user.email);
    }
};

export const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
};

export const setUserData = async (uid, data) => {
   await setDoc(doc(db, "users", uid), data, { merge: true });

};

