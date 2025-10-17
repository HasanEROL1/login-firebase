import { useState } from "react";
import { register, setUserData, auth, sendVerificationEmail } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await register(email, password);
            const user = userCredential.user;

            // Firestore’a kullanıcı bilgilerini kaydet
            await setUserData(user.uid, {
                name,
                email,
                age,
                photoURL: `https://i.pravatar.cc/150?u=${email}`,
                createdAt: new Date().toISOString(),
            });

            // ✅ Doğrulama e-postası gönder
            await sendVerificationEmail(user);
            toast.info("📧 E-posta doğrulama bağlantısı gönderildi. Lütfen e-postanı kontrol et!");

            // Kullanıcıyı login sayfasına yönlendir
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Register hatası:", error.code);
            if (error.code === "auth/email-already-in-use")
                toast.error("Bu e-posta zaten kayıtlı!");
            else toast.error("Kayıt başarısız. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-2xl shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Kayıt Ol</h2>

                <input
                    type="text"
                    placeholder="İsim"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <input
                    type="number"
                    placeholder="Yaş"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    Kayıt Ol
                </button>
            </form>
        </div>
    );
}

export default Register;
