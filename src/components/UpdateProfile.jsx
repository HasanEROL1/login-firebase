import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Mevcut kullanıcı bilgilerini getir
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name || user.displayName || "");
          setPhotoURL(data.photoURL || user.photoURL || "");
          setAge(data.age || "");
        } else {
          setName(user.displayName || "");
          setPhotoURL(user.photoURL || "");
        }
      } catch (error) {
        console.error("❌ Kullanıcı verisi alınamadı:", error);
        toast.error("Kullanıcı bilgileri alınamadı");
        setName(user.displayName || "");
        setPhotoURL(user.photoURL || "");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Profil güncelleme
  const handleUpdate = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    try {
      // 🔸 Firebase Authentication profilini güncelle
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      // 🔸 Firestore’a kaydet (merge: true => eski veriler korunur)
      const newData = {
        name,
        photoURL,
        age: Number(age),
        updatedAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, "users", user.uid), newData, { merge: true });
        console.log("📤 Firestore'a kaydedilen veri:", newData);
        toast.success("✅ Profil başarıyla güncellendi!");
        navigate("/home");
      } catch (firestoreError) {
        console.error("❌ Firestore kaydetme hatası:", firestoreError);
        if (
          firestoreError.code === "permission-denied" ||
          firestoreError.message?.includes("Missing or insufficient permissions")
        ) {
          toast.error(
            "Profil yalnızca Auth üzerinde güncellendi. Firestore izinlerini kontrol edin."
          );
          navigate("/home");
        } else {
          toast.error("Profil güncellenirken Firestore hatası oluştu!");
        }
      }
    } catch (error) {
      console.error("❌ Profil güncelleme hatası:", error);
      toast.error("Profil güncellenirken bir hata oluştu!");
    }
  };

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Profil Güncelle
        </h2>

        <input
          type="text"
          placeholder="İsim"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          type="text"
          placeholder="Fotoğraf URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="number"
          placeholder="Yaş"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-all"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
