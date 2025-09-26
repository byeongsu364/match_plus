import React from "react";
import filterOptions from "../../utils/filter.js";
import "./styles/Filter.scss";

const Filter = ({
  applied = [],
  onReset = () => {},
  onChange = () => {},
  onRemoveChip = () => {},
}) => {
  return (
    <section className="filter-root" role="region" aria-label="경기 필터">
      {/* Header */}
      <div className="filter-header">
        <div className="filter-header__left">
          <span className="filter-main-icon" aria-hidden>🟢</span>
          <span className="filter-main-title">경기 필터</span>
          <span className="filter-desc">원하는 조건으로 경기를 찾아보세요</span>
        </div>

        {applied.length > 0 && (
          <button
            type="button"
            className="filter-reset-btn"
            onClick={onReset}
            aria-label="모든 필터 초기화"
          >
            전체 초기화
          </button>
        )}
      </div>

      {/* Options */}
      <div className="filter-options">
        {filterOptions.map((opt) => (
          <div key={opt.key} className="filter-option">
            <label className="filter-option-label" htmlFor={`select-${opt.key}`}>
              <span className="filter-option-icon" aria-hidden>
                {opt.icon}
              </span>
              {opt.label}
            </label>

            <select
              id={`select-${opt.key}`}
              className="filter-select"
              defaultValue=""
              onChange={(e) => onChange(opt.key, e.target.value)}
            >
              <option value="" disabled hidden>
                {opt.placeholder}
              </option>
              {opt.options?.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Applied chips */}
      {applied.length > 0 && (
        <div className="filter-applied">
          <span className="filter-applied-title">적용된 필터</span>
          <div className="filter-chips">
            {applied.map((f) => (
              <span className="filter-chip" key={f}>
                {f}
                <button
                  type="button"
                  className="chip-remove"
                  aria-label={`${f} 필터 제거`}
                  onClick={() => onRemoveChip(f)}
                  title="제거"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Filter;
