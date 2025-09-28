import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UserLogin.scss";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("token", "dummytoken123");
      navigate("/userinfo");
    } else {
      setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="bg-shape bg-1" />
      <div className="bg-shape bg-2" />

      <div className="login-card">
        <div className="brand">
          <div className="logo">⚽</div>
          <div className="title-group">
            <h1 className="brand-title">
              Match <span>Plus</span>
            </h1>
            <p className="brand-sub">스포츠 매칭 플랫폼</p>
          </div>
        </div>

        <h2 className="card-title">로그인</h2>
        <p className="card-sub">계정 정보를 입력하고 매칭을 시작하세요</p>

        {errorMsg && <div className="form-alert">{errorMsg}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-field">
            <label htmlFor="email">이메일</label>
            <div className="input-wrap">
              <span className="icon">📧</span>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrap">
              <span className="icon">🔒</span>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            로그인
          </button>

          <p className="foot">
            아직 계정이 없으신가요?{" "}
            <button
              type="button"
              className="link"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
