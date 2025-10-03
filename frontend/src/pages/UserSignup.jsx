// src/pages/UserSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/UserSignup.scss";

export default function UserSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    // TODO: 실제 회원가입 API 연동
    alert("회원가입 완료! 로그인 페이지로 이동합니다.");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="bg-shape bg-1" />
      <div className="bg-shape bg-2" />

      <div className="signup-card">
        <div className="brand">
          <div className="logo">⚽</div>
          <div className="title-group">
            <h1 className="brand-title">
              Match <span>Plus</span>
            </h1>
            <p className="brand-sub">스포츠 매칭 플랫폼</p>
          </div>
        </div>

        <h2 className="card-title">회원가입</h2>
        <p className="card-sub">간단한 정보 입력 후 바로 시작하세요</p>

        {error && <div className="form-alert">{error}</div>}

        <form className="signup-form" onSubmit={onSubmit}>
          <div className="form-field">
            <label htmlFor="name">이름</label>
            <div className="input-wrap">
              <span className="icon">👤</span>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="홍길동"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email">이메일</label>
            <div className="input-wrap">
              <span className="icon">📧</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
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
                name="password"
                type="password"
                placeholder="8자 이상"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="confirm">비밀번호 확인</label>
            <div className="input-wrap">
              <span className="icon">✅</span>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="비밀번호 재입력"
                value={form.confirm}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">회원가입</button>

          <p className="foot">
            이미 계정이 있으신가요?{" "}
            <button type="button" className="link" onClick={() => navigate("/login")}>
              로그인
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
