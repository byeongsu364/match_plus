import React from "react";
import stats from "../../utils/stats.js";
import "./styles/Stats.scss";

const Stats = () => {
  return (
    <section className="stats-root">
      <h2>Match Plus와 함께하는 사람들</h2>
      <p>
        수많은 플레이어들이 Match Plus를 통해 새로운 팀원들을 만나고 스포츠의 즐거움을 경험하고 있습니다
      </p>
      <div className="stats-cards">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-main">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
            <div className={`stat-growth ${stat.growthColor}`}>{stat.growth}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
