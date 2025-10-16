// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(); // named export

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); // 🔹 추가
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            try {
                const payload = JSON.parse(atob(savedToken.split(".")[1]));
                setUser(payload);
                setToken(savedToken); // 🔹 token 상태도 세팅
                setIsLoggedIn(true);
            } catch {
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
                setIsLoggedIn(false);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null); // 🔹 token도 초기화
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
