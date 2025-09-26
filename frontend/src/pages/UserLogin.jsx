import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("token", "dummytoken123"); // 임시 토큰 저장
      navigate("/userinfo"); // 로그인 성공 후 회원정보 페이지 이동
    } else {
      setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <h2>사용자 로그인</h2>
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
        {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default UserLogin;
