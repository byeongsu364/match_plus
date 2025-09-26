import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./styles/Header.scss";
import { useTheme } from "../../context/ThemeContext";
import { FiBell, FiUser, FiPlus } from "react-icons/fi";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup
  }, []);

  return (
    <header className={`mp-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mp-header__inner">
        {/* 좌측: 로고 + 텍스트 */}
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

        {/* 가운데: 네비(있으면) */}
        <nav className="mp-nav" aria-label="Primary">
          <Nav />
        </nav>

        {/* 우측: 액션들 */}
        <div className="mp-actions">
          <button className="mp-btn mp-btn--primary">
            <FiPlus className="mp-icon" />
            경기 등록
          </button>

          <button className="mp-iconbtn" aria-label="Notifications">
            <FiBell />
            <span className="mp-badge">3</span>
          </button>

          <button className="mp-iconbtn" aria-label="User">
            <FiUser />
          </button>

          {/* 필요하면 테마 토글 다시 노출 */}
          {/* <button className="mp-btn mp-btn--ghost" onClick={toggleTheme}>{theme}</button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
