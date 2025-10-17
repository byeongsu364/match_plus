import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserDetails from "./info/UserDetails";
import ReservationCard from "./info/ReservationCard";
import RecentMatchCard from "./info/RecentMatchCard";
import { AuthContext } from "../context/AuthContext";
import "./styles/UserInfo.scss";

const UserInfo = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🟢 [UserInfo] useEffect 실행됨 — token:", token);
    if (!token) {
      console.warn("⚠️ token이 없습니다. 로그인 확인 필요!");
      return;
    }

    const fetchData = async () => {
      try {
        // ✅ 사용자 정보 가져오기
        console.log("📡 [1] 사용자 정보 요청 중...");
        const { data: userData } = await axios.get(
          "http://localhost:3000/api/auth/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("✅ [1] 사용자 데이터:", userData);
        setUser(userData);

        // ✅ 내 예약 목록 가져오기
        console.log("📡 [2] 내 예약 목록 요청 중...");
        const { data: myReservations } = await axios.get(
          "http://localhost:3000/api/reservations/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("✅ [2] 내 예약 목록 응답:", myReservations);
        setReservations(myReservations);

        // ✅ 최근 5개 예약 가져오기
        console.log("📡 [3] 최근 예약 요청 중...");
        const { data: recentData } = await axios.get(
          "http://localhost:3000/api/reservations/my?recent=true",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("✅ [3] 최근 예약 응답:", recentData);
        setRecentMatches(recentData);

        setLoading(false);
      } catch (err) {
        console.error("❌ fetchData 에러:", err);
        if (err.response) {
          console.error("❌ 서버 응답:", err.response.status, err.response.data);
        } else {
          console.error("❌ 네트워크 오류:", err.message);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>로딩 중...</p>;
  if (!user) return <p>사용자 정보를 가져올 수 없습니다.</p>;

  return (
    <div className="userinfo-page">
      <h2>내 정보</h2>
      <UserDetails user={user} />

      {/* ✅ 내 예약 현황 */}
      <section className="userinfo-section">
        <h3>내 예약 현황</h3>
        {reservations.length === 0 ? (
          <p>예약 내역이 없습니다.</p>
        ) : (
          <div className="reservation-list">
            {reservations.map((res) => (
              <ReservationCard key={res._id} reservation={res} />
            ))}
          </div>
        )}
      </section>

      {/* ✅ 최근 참여 경기 */}
      <section className="userinfo-section">
        <h3>최근 참여 경기</h3>
        {recentMatches.length === 0 ? (
          <p>최근 참여 경기 내역이 없습니다.</p>
        ) : (
          <div className="recent-match-list">
            {recentMatches.map((match) => (
              <RecentMatchCard key={match._id} match={match} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserInfo;
