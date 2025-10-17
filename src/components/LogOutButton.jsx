import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../redux/authSlice";
import { logout } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(); // 🔹 Firebase’den çıkış yap
            dispatch(logoutAction()); // 🔹 Redux state sıfırla
            toast.success("Çıkış yapıldı");
            navigate("/login"); // 🔹 Giriş sayfasına yönlendir
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Çıkış yapılamadı");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
            Çıkış Yap
        </button>
    );
};

export default LogoutButton;
