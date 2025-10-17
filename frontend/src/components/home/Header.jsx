import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./styles/Header.scss";

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
      <Nav /> {/* Nav는 여기서만 렌더링 */}
    </header>
  );
};

export default Header;
