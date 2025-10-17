import React from "react";
import { FiBell, FiUser, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./styles/Nav.scss";

// 간단한 로그인 상태 판별 함수 (로컬스토리지 토큰 기반)
function getAuthStatus() {
  return Boolean(localStorage.getItem("token"));
}

const Nav = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // 유저 버튼 클릭 → 로그인 여부 확인 후 이동
  const handleUserClick = () => {
    if (getAuthStatus()) {
      navigate("/userinfo");
    } else {
      navigate("/login");
    }
  };

  // 알림 버튼 클릭 → 알림 페이지 이동
  const handleBellClick = () => {
    navigate("/notifications");
  };

  // 경기 신청 버튼 클릭 → /reservations 이동
  const handleReservationClick = () => {
    navigate("/reservations");
  };

  return (
    <div className="mp-header__inner">
      {/* 좌측: 로고 + 텍스트 */}
      <a className="mp-brand" href="/" aria-label="Match Plus Home">
        <div className="mp-brand__icon">
          <img src="../../../img/match_plus.png" className="mp-icon" alt="Match Plus 로고" />
        </div>

        <div className="mp-brand__text">
          <div className="mp-brand__row">
            <span className="mp-brand__match">Match</span>
            <span className="mp-brand__plus">Plus</span>
          </div>
          <div className="mp-brand__slogan">스포츠 매칭 플랫폼</div>
        </div>
      </a>

      {/* 우측: 액션 버튼들 */}
      <div className="mp-actions">
        <button
          className="mp-btn mp-btn--primary"
          onClick={handleReservationClick}
        >
          <FiPlus className="mp-icon" />
          경기 신청
        </button>

        <button
          className="mp-iconbtn"
          aria-label="Notifications"
          onClick={handleBellClick}
        >
          <FiBell />
          <span className="mp-badge">3</span>
        </button>

        <button
          className="mp-iconbtn"
          aria-label="User"
          onClick={handleUserClick}
        >
          <FiUser />
        </button>

        {/* 테마 토글 필요 시 */}
        {/* <button className="mp-btn mp-btn--ghost" onClick={toggleTheme}>
            {theme}
          </button> */}
      </div>
    </div>
  );
};

export default Nav;
