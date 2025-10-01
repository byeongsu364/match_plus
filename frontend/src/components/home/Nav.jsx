import React, { useContext } from 'react';
import useSmoothScroll from '../../hook/useSmoothScroll';
import { FiBell, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // 경로 확인

const Nav = () => {
  const navLink = ['Hero', 'Aboutme', 'Work', 'Contact'];
  const scrollTo = useSmoothScroll();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleUserClick = () => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/post");
      } else {
        navigate("/userinfo");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <nav>
      <ul>
        {navLink.map((nav, i) => (
          <li key={i}>
            <a
              onClick={(e) => {
                e.preventDefault();
                scrollTo(nav);
              }}
              href={`#${nav}`}
            >
              {nav}
            </a>
          </li>
        ))}
      </ul>
      <div className="icons">
        <FiBell className="icon bell" />
        <FiUser
          className="icon user"
          onClick={handleUserClick}
          style={{ cursor: "pointer" }}
          title="로그인/회원정보"
        />
      </div>
    </nav>
  );
};

export default Nav;
