import React from 'react'
import { useNavigate } from "react-router-dom"

function getAuthStatus() {
  return Boolean(localStorage.getItem("token"))
}

const Nav = () => {
  const navigate = useNavigate()

  const handleUserClick = () => {
    if (getAuthStatus()) {
      navigate("/userinfo")
    } else {
      navigate("/login")
    }
  }

  return (
    <nav>
      {/* 메뉴랑 아이콘 전부 제거 → 필요할 때만 추가 */}
    </nav>
  )
}

export default Nav
