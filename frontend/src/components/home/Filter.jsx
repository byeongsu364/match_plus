import React from "react";
import filterOptions from "../../utils/filter.js";
import "./styles/Filter.scss";

const Filter = ({
  applied = ["강남구", "축구", "오늘"],
  onReset = () => {},
}) => {
  return (
    <section className="filter-root">
      <div className="filter-header">
        <span className="filter-main-icon">🟢</span>
        <span className="filter-main-title">경기 필터</span>
        <span className="filter-desc">원하는 조건으로 경기를 찾아보세요</span>
        <button className="filter-reset-btn" onClick={onReset}>전체 초기화</button>
      </div>
      <div className="filter-options">
        {filterOptions.map(opt => (
          <div key={opt.key} className="filter-option">
            <span className="filter-option-icon">{opt.icon}</span>
            <span className="filter-option-label">{opt.label}</span>
            <select className="filter-select" defaultValue="">
              <option value="" disabled hidden>{opt.placeholder}</option>
              {opt.options && opt.options.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="filter-applied">
        <span className="filter-applied-title">적용된 필터</span>
        {applied.map(f => (
          <span className="filter-chip" key={f}>
            {f} <button className="chip-remove">×</button>
          </span>
        ))}
      </div>
    </section>
  );
};

export default Filter;
