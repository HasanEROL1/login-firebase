import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          setUserData({
            name: user.displayName || "Bilinmiyor",
            photoURL: user.photoURL || "https://i.pravatar.cc/150?img=64",
            age: "—",
          });
        }
      } catch (error) {
        console.error("❌ Kullanıcı bilgisi alınamadı:", error);
        toast.error("Kullanıcı bilgisi yüklenemedi!");
        setUserData({
          name: auth.currentUser?.displayName || "Bilinmiyor",
          photoURL: auth.currentUser?.photoURL || "https://i.pravatar.cc/150?img=64",
          age: "—",
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("👋 Çıkış yapıldı");
      navigate("/login");
    } catch (error) {
      console.error("Çıkış hatası:", error);
      toast.error("Çıkış yapılırken hata oluştu!");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Kullanıcı bilgileri yükleniyor...</p>;

  if (!userData)
    return <p className="text-center mt-10">Kullanıcı bilgileri alınamadı.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center w-full max-w-md">
        <img
          src={userData.photoURL}
          alt="Profil"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-300"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {userData.name}
        </h2>
        <p className="text-gray-600 mb-2">Yaş: {userData.age || "—"}</p>

        <button
          onClick={() => navigate("/update")}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
        >
          Profili Güncelle
        </button>

        <button
          onClick={handleLogout}
          className="mt-4 ml-3 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Home;
