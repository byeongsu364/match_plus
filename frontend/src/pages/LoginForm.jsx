// LoginForm.jsx (로직 동일, className만 추가)
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./styles/LoginForm.scss";

export default function LoginForm({ role, redirectPath }) {
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

        if (role === "admin" && data.user.role === "admin") {
          navigate("/admin/post");
        } else {
          navigate(redirectPath);
        }
      } else {
        setErrorMsg(data.message || "로그인 실패");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("서버 오류, 로그인 실패");
    }
  };

  return (
    <div className={`login ${role === "admin" ? "login--admin" : ""}`}>
      <div className="login__card">
        <div className="login__header">
          <span className="login__badge">{role === "admin" ? "ADMIN" : "USER"}</span>
          <h2 className="login__title">{role === "admin" ? "관리자 로그인" : "로그인"}</h2>
          <p className="login__subtitle">
            {role === "admin" ? "관리자 전용 페이지입니다." : "이메일과 비밀번호를 입력해 주세요."}
          </p>
        </div>

        <form className="login__form" onSubmit={handleLogin}>
          <div className="login__field">
            <label className="login__label">이메일</label>
            <input
              className="login__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="login__field">
            <label className="login__label">비밀번호</label>
            <input
              className="login__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {errorMsg && <p className="login__error">{errorMsg}</p>}

          <button className="login__button" type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}
