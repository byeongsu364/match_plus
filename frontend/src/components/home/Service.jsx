import React from "react";
import matchInfo from "../../utils/matchInfo.js";
import "./styles/Service.scss";

const Service = () => {
  return (
    <section className="matchinfo-root">
      <div className="matchinfo-left">
        <h2>신뢰할 수 있는 스포츠 매칭 서비스!</h2>
        <ul>
          {matchInfo.map(({ icon, title, value, desc, highlight }) => (
            <li key={title} className="matchinfo-item">
              <span className="matchinfo-icon">{icon}</span>
              <span className="matchinfo-title">{title}</span>
              <span className={highlight ? "matchinfo-value highlight" : "matchinfo-value"}>
                {value}
              </span>
              <div className="matchinfo-desc">{desc}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="matchinfo-right">
        <div className="matchinfo-img-card">
          <img src="/img/sample.jpg" alt="스포츠 매칭" className="matchinfo-img" />
          <div className="matchinfo-overlay">
            <span className="matchinfo-badge">
              24<br /><span>오늘 진행</span>
            </span>
            <span className="matchinfo-bottom-badge">
              156<br /><span>이번 주 매칭</span>
            </span>
            <div className="matchinfo-desc-txt">함께하는 스포츠의 즐거움</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
