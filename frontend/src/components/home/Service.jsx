// components/home/Service.jsx
import React from "react";
import matchInfo from "../../utils/matchInfo.js";
import "./styles/Service.scss";

const Service = () => {
  return (
    <section className="service-root">
      <div className="service-left">
        <h2>신뢰할 수 있는 스포츠 매칭 서비스</h2>
        <ul>
          {matchInfo.map(({ icon, title, value, desc, highlight }) => (
            <li key={title}>
              <span className="icon">{icon}</span>
              <span className="title">{title}</span>
              <span className={`value${highlight ? " highlight" : ""}`}>{value}</span>
              <div className="desc">{desc}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="service-right">
        <div className="image-card">
          {/* ✅ kr2.png 이미지 적용 */}
          <img src="/img/kr2.png" alt="스포츠 매칭" />
          
          {/* 배지: 오늘 경기 */}
          <span className="badge top-right-badge">
            24<br /><span>오늘 진행</span>
          </span>

          {/* 배지: 이번 주 매칭 */}
          <span className="badge bottom-left-badge">
            156<br /><span>이번 주 매칭</span>
          </span>

          {/* 오버레이 텍스트 */}
          <div className="overlay-text">함께하는 스포츠의 즐거움</div>
        </div>
      </div>
    </section>
  );
};

export default Service;
