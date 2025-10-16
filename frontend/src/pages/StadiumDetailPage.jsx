// src/pages/StadiumDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/StadiumDetailPage.scss";

const StadiumDetailPage = () => {
  const { id } = useParams();
  const [stadium, setStadium] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ 여기서 navigate 사용

  useEffect(() => {
    const fetchStadium = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/stadiums/${id}`);
        setStadium(res.data);
      } catch (err) {
        console.error("구장 상세 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStadium();
  }, [id]);

  if (loading) return <p className="stadium-loading">불러오는 중...</p>;
  if (!stadium) return <p className="stadium-empty">구장을 찾을 수 없습니다.</p>;

  return (
    <div className="stadium-detail">
      {/* ✅ 이전 페이지로 돌아가기 */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ 경기장으로 돌아가기
      </button>

      <h2 className="stadium-detail__title">{stadium.name}</h2>

      <p className="stadium-detail__info">
        📍 위치:{" "}
        {stadium.location?.coordinates?.length === 2
          ? `위도: ${stadium.location.coordinates[1]}, 경도: ${stadium.location.coordinates[0]}`
          : "위치 정보 없음"}
      </p>

      <p className="stadium-detail__info">👥 최대 인원: {stadium.capacity}명</p>
      <p className="stadium-detail__info">
        ✅ 신청 인원: {stadium.participants ?? 0}명
      </p>
      <p className="stadium-detail__info">
        ⏰ 경기 시간:{" "}
        {stadium.available_times?.length > 0
          ? stadium.available_times.join(", ")
          : "없음"}
      </p>
    </div>
  );
};

export default StadiumDetailPage;
