// src/components/home/Footer.jsx
import React from "react";
import {
  FaGithub, FaTwitter, FaInstagram, FaFacebook,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";          // ✅ 추가
import "./styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          {/* ✅ 로고/브랜드 전체를 홈으로 이동 */}
          <Link to="/" className="footer-logo" aria-label="홈으로 이동">
            <span className="logo-icon">⚽</span>
            <span className="logo-text">
              Match <span className="highlight">Plus</span>
            </span>
          </Link>

          <p className="footer-desc">
            함께 뛸 팀원을 찾는 가장 쉽고 빠른 방법. 언제 어디서나 원하는
            스포츠를 즐기고 새로운 사람들과 만나보세요.
          </p>

          <div className="footer-contact">
            <p><FaEnvelope /> support@matchplus.kr</p>
            <p><FaPhone /> 1588-0000</p>
            <p><FaMapMarkerAlt /> 서울특별시 강남구 테헤란로</p>
          </div>

          <div className="footer-socials">
            {/* ✅ 아이콘들도 홈으로 이동시키기 */}
            <Link to="/" aria-label="홈으로 이동 (Facebook)">
              <FaFacebook />
            </Link>
            <Link to="/" aria-label="홈으로 이동 (Instagram)">
              <FaInstagram />
            </Link>
            <Link to="/" aria-label="홈으로 이동 (Twitter)">
              <FaTwitter />
            </Link>
            <Link to="/" aria-label="홈으로 이동 (GitHub)">
              <FaGithub />
            </Link>
          </div>
        </div>

        {/* 오른쪽 링크들은 그대로 */}
        <div className="footer-links">
          <h4>서비스</h4>
          <ul>
            <li><FaArrowRight /> 경기 찾기</li>
            <li><FaArrowRight /> 경기 만들기</li>
            <li><FaArrowRight /> 팀 매칭</li>
            <li><FaArrowRight /> 경기장 예약</li>
            <li><FaArrowRight /> 커뮤니티</li>
          </ul>
        </div>


        <div className="footer-links">
          <h4>법적 고지</h4>
          <ul>
            <li><FaArrowRight /> 이용약관</li>
            <li><FaArrowRight /> 개인정보처리방침</li>
            <li><FaArrowRight /> 환불정책</li>
            <li><FaArrowRight /> 사업자정보</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Match Plus. All rights reserved.</p>
        <p>사업자등록번호: 123-45-67890 | 통신판매업신고: 제2025-서울강남-0000호</p>
      </div>
    </footer>
  );
};

export default Footer;
