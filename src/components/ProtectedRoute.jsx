// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("👤 onAuthStateChanged:", currentUser);
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    if (user === undefined) {
        console.log("ProtectedRoute: kontrol ediliyor...");
        return <div className="text-center mt-10">Yükleniyor...</div>;
    }

    if (!user) {
        console.log("ProtectedRoute: kullanıcı yok → /login");
        return <Navigate to="/login" replace />;
    }

    console.log("ProtectedRoute: kullanıcı bulundu → erişim veriliyor");
    return children;
};

export default ProtectedRoute;
