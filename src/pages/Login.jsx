import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            dispatch(
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                })
            );

            toast.success("Giriş başarılı!");
            navigate("/home");
        } catch (err) {
            toast.error("Giriş hatası: " + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-lg rounded-2xl p-8 w-80 flex flex-col gap-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700">Giriş Yap</h2>

                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Giriş Yap
                </button>

                <p className="text-center text-sm text-gray-500">
                    Hesabın yok mu?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Kayıt ol
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
