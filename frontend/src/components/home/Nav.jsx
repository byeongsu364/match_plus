import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiUser, FiPlus } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./styles/Nav.scss";

const Nav = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, setIsLoggedIn } = useContext(AuthContext);
  const { theme } = useTheme();

  // 유저 버튼 클릭
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/userinfo"); // 로그인 상태면 유저 정보 페이지
    } else {
      navigate("/login"); // 로그인 상태가 아니면 로그인 페이지
    }
  };

  // 로그아웃 버튼 클릭
  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    setIsLoggedIn(false); // 상태 업데이트
    navigate("/"); // 메인페이지로 이동
  };

  // 경기 신청 버튼 클릭
  const handleReservationClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // 로그인 안 되어 있으면 로그인 페이지
      return;
    }

    // admin이면 관리자 예약 페이지
    if (user?.role === "admin") {
      navigate("/admin/reservation");
    } else {
      // 일반 유저는 기존 경기 신청 페이지
      navigate("/reservations");
    }
  };

  return (
    <div className={`mp-header__inner ${theme}`}>
      <a className="mp-brand" href="/" aria-label="Match Plus Home">
        <div className="mp-brand__icon">
          <span className="mp-brand__ball">⚽</span>
          <span className="mp-brand__badge">+</span>
        </div>
        <div className="mp-brand__text">
          <div className="mp-brand__row">
            <span className="mp-brand__match">Match</span>
            <span className="mp-brand__plus">Plus</span>
          </div>
          <div className="mp-brand__slogan">스포츠 매칭 플랫폼</div>
        </div>
      </a>

      <div className="mp-actions">
        {/* 권한에 따라 이동 경로 변경 */}
        <button className="mp-btn mp-btn--primary" onClick={handleReservationClick}>
          <FiPlus className="mp-icon" /> 경기 신청
        </button>

        <button
          className="mp-iconbtn"
          aria-label="Notifications"
          onClick={() => navigate("/notifications")}
        >
          <FiBell />
          <span className="mp-badge">3</span>
        </button>

        {/* 기존 유저 버튼 항상 유지 */}
        <button className="mp-iconbtn" aria-label="User" onClick={handleUserClick}>
          <FiUser />
        </button>

        {/* 로그인 상태일 때만 로그아웃 버튼 */}
        {isLoggedIn && (
          <button className="mp-logout-btn" onClick={handleLogout}>
            로그아웃
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
