import React from 'react'
import useSmoothScroll from '../../hook/useSmoothScroll'
import { FiBell, FiUser } from "react-icons/fi" 
import { useNavigate } from "react-router-dom"

// 간단한 로그인 상태 판별 함수(로컬스토리지 토큰 기반, 필요시 수정)
function getAuthStatus() {
  return Boolean(localStorage.getItem("token"))
}

const Nav = () => {
  const navLink = ['Hero', 'Aboutme', 'Work', 'Contact']
  const scrollTo = useSmoothScroll()
  const navigate = useNavigate()

  // 아이콘 클릭핸들러
  const handleUserClick = () => {
    if (getAuthStatus()) {
      navigate("/userinfo")
    } else {
      navigate("/UserLogin")
    }
  }

  return (
    <nav>
      <ul>
        {navLink.map((nav, i) => (
          <li key={i}>
            <a
              onClick={(e) => {
                e.preventDefault()
                scrollTo(nav)
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
  )
}

export default Nav
