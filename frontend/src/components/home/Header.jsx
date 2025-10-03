// Header.jsx
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./styles/Header.scss";
import { FiPlus, FiUser, FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`mp-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mp-header__inner">
        {/* 좌측: 로고 */}
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

        {/* 가운데: 네비 */}
        <nav className="mp-nav" aria-label="Primary">
          <Nav />
        </nav>

        {/* 우측: 액션 버튼 */}
        <div className="mp-actions">
          {/* 경기 등록 버튼 */}
          <button className="mp-btn mp-btn--primary">
            <FiPlus className="mp-icon" />
            경기 등록
          </button>

          {/* 종 아이콘 (알림) */}
          <button className="mp-iconbtn" aria-label="Notifications">
            <FiBell />
            <span className="mp-badge">3</span>
          </button>

          {/* 프로필 아이콘 (로그인/유저 페이지 이동) */}
          <Link to="/login" className="mp-iconbtn" aria-label="User">
            <FiUser />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
