// src/pages/MainPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Hoş Geldin 👋</h1>
            <p className="text-gray-600 mb-8">Lütfen giriş yap veya kayıt ol.</p>

            <div className="space-x-4">
                <button
                    onClick={() => navigate("/login")}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Giriş Yap
                </button>
                <button
                    onClick={() => navigate("/register")}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                    Kayıt Ol
                </button>
            </div>
        </div>
    );
}

export default MainPage;
