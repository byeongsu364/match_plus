import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./styles/Header.scss";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup
  }, []);

  return (
    <header className={`mp-header ${scrolled ? "is-scrolled" : ""}`}>
      <Nav/>
    </header>
  );
};

export default Header;
