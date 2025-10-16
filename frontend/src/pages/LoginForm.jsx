// src/pages/LoginForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {
    const navigate = useNavigate();
    const { setUser, setIsLoggedIn } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                setUser(data.user);
                setIsLoggedIn(true);

                console.log("Login successful, user:", data.user);
                console.log("Token stored:", localStorage.getItem("token"));

                navigate("/", { replace: true });
            } else {
                setErrorMsg(data.message || "로그인 실패");
            }
        } catch (err) {
            console.error(err);
            setErrorMsg("서버 오류, 로그인 실패");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="이메일을 입력하세요"
                    />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>
                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}
