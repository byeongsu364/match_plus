// src/routes/RequireAuth.jsx
import { useEffect, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../lib/api';

export default function RequireAuth({ Component, requiredRole }) {
    const { isLoggedIn, user } = useContext(AuthContext);
    const [ok, setOk] = useState(null);
    const location = useLocation();

    useEffect(() => {
        let alive = true;

        const verifyToken = async () => {
            if (!isLoggedIn) {
                console.log("RequireAuth: Not logged in");
                setOk(false);
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                console.log("RequireAuth: No token in localStorage");
                setOk(false);
                return;
            }

            console.log("RequireAuth check - token:", token);
            console.log("RequireAuth check - api baseURL:", api.defaults.baseURL);

            try {
                // 서버 검증 요청
                const res = await api.post('/api/auth/verify-token', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("RequireAuth token verification response:", res.data);

                if (alive) setOk(true);
            } catch (err) {
                console.error("RequireAuth token verification failed:", err);
                if (alive) setOk(false);
            }
        };

        verifyToken();

        return () => { alive = false; };
    }, [isLoggedIn]);

    if (ok === null) return <div>Loading...</div>; // 로딩 표시

    // 역할 체크
    if (ok && requiredRole && user?.role !== requiredRole) {
        console.log(`RequireAuth: User role "${user?.role}" is not allowed, redirecting`);
        return <Navigate to="/" replace />;
    }

    return ok
        ? <Component />
        : <Navigate to="/login" replace state={{ from: location }} />;
}
