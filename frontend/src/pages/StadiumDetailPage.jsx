// src/pages/StadiumDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/StadiumDetailPage.scss";

const StadiumDetailPage = () => {
<<<<<<< HEAD
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
=======
    const { id } = useParams();
    const navigate = useNavigate();
    const [stadium, setStadium] = useState(null);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState("");

    useEffect(() => {
        const fetchStadium = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/stadiums/${id}`);
                console.log("✅ 불러온 stadium:", res.data);
                setStadium(res.data);
            } catch (err) {
                console.error("구장 상세 불러오기 실패:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStadium();
    }, [id]);

    // ✅ 지도 + 주소 표시(JS SDK)
    useEffect(() => {
        if (!stadium?.location?.coordinates?.length) return;
        const [lon, lat] = stadium.location.coordinates;

        const loadKakaoMap = () => {
            const container = document.getElementById("map");
            if (!container) return;

            const center = new window.kakao.maps.LatLng(lat, lon);
            const map = new window.kakao.maps.Map(container, { center, level: 3 });
            new window.kakao.maps.Marker({ position: center, map });

            // 주소 변환
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(lon, lat, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const addr = result[0]?.address?.address_name;
                    if (addr) setAddress(addr);
                }
            });
        };

        if (window.kakao && window.kakao.maps) {
            loadKakaoMap();
        } else {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false&libraries=services`;
            script.async = true;
            document.head.appendChild(script);
            script.onload = () => window.kakao.maps.load(loadKakaoMap);
        }

        return () => {
            const mapContainer = document.getElementById("map");
            if (mapContainer) mapContainer.innerHTML = "";
        };
    }, [stadium]);

    if (loading) return <p className="stadium-loading">불러오는 중...</p>;
    if (!stadium) return <p className="stadium-empty">구장을 찾을 수 없습니다.</p>;

    const [lon, lat] = stadium.location?.coordinates || [];

    // ✅ 경기 신청 로직
    const handleApply = async () => {
        try {
            const res = await axios.patch(`http://localhost:3000/api/stadiums/${stadium._id}/apply`);
            setStadium({ ...stadium, participants: res.data.participants });
            alert("✅ 경기 신청이 완료되었습니다!");
            navigate("/");
        } catch (err) {
            if (err.response?.data?.message) {
                alert(`⚠️ ${err.response.data.message}`);
            } else {
                alert("신청 중 오류가 발생했습니다.");
            }
            console.error("❌ 경기 신청 실패:", err);
        }
    };



    return (
        <div className="stadium-detail">
            <h2 className="stadium-detail__title">{stadium.name}</h2>

            <p className="stadium-detail__info">
                📍 위치:{" "}
                {address
                    ? address
                    : lat && lon
                        ? `위도: ${lat}, 경도: ${lon}`
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

            {/* 🗺️ Kakao Map 표시 */}
            <div id="map" style={{ width: "100%", height: "300px", marginTop: "20px" }} />

            {/* 🚗 Kakao 길찾기 */}
            {lat && lon && (
                <a
                    href={`https://map.kakao.com/link/to/${stadium.name},${lat},${lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stadium-map-link"
                >
                    📍 카카오맵 길찾기
                </a>
            )}

            {/* 🏟️ 경기 신청 버튼 */}
            <button className="stadium-apply-btn" onClick={handleApply}>
                경기 신청하기
            </button>
        </div>
    );
>>>>>>> bs
};

export default StadiumDetailPage;
