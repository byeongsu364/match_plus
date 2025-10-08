// src/pages/StadiumListPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/StadiumListPage.scss";

const StadiumListPage = () => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/stadiums");
        setStadiums(res.data);
      } catch (err) {
        console.error("경기장 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStadiums();
  }, []);

  if (loading) return <p className="stadium-loading">불러오는 중...</p>;

  return (
    <div className="stadium-page">
      <h2 className="stadium-title">🏟 경기장 리스트</h2>

      {/* ✅ 메인으로 돌아가기 버튼 */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ 메인으로 돌아가기
      </button>

      {stadiums.length === 0 ? (
        <p className="stadium-empty">등록된 경기장이 없습니다.</p>
      ) : (
        <ul className="stadium-list">
          {stadiums.map((stadium) => (
            <li
              key={stadium._id}
              className="stadium-card"
              onClick={() => navigate(`/stadiums/${stadium._id}`)}
            >
              <h3 className="stadium-name">{stadium.name}</h3>
              <p className="stadium-info">👥 최대 인원: {stadium.capacity}명</p>
              <p className="stadium-info">
                ✅ 신청 인원: {stadium.participants ?? 0}명
              </p>
              <p className="stadium-info">
                ⏰ 경기 시간:{" "}
                {stadium.available_times?.length > 0
                  ? stadium.available_times.join(", ")
                  : "없음"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StadiumListPage;
