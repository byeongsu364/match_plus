import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserDetails from "./info/UserDetails";
import ReservationCard from "./info/ReservationCard";
import RecentMatchCard from "./info/RecentMatchCard";
import { AuthContext } from "../context/AuthContext";
import "./styles/UserInfo.scss";

const UserInfo = () => {
  const { token } = useContext(AuthContext); // 로그인 토큰
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("UserInfo useEffect 실행, token:", token); // 🔍 여기 먼저
    if (!token) return;

    const fetchData = async () => {
      try {
        console.log("Fetching user info...");
        const { data: userData } = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("userData:", userData);
        setUser(userData);

        console.log("Fetching reservations...");
        const { data: reservationsData } = await axios.get(
          `http://localhost:3000/api/reservations/user/${userData._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("reservationsData:", reservationsData);
        setReservations(reservationsData);

        console.log("Fetching recent matches...");
        const { data: recentData } = await axios.get(
          `http://localhost:3000/api/reservations/user/${userData._id}?recent=true`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("recentData:", recentData);
        setRecentMatches(recentData);

        setLoading(false);
        console.log("fetchData 완료, loading false");
      } catch (err) {
        console.error("fetchData error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);




  if (loading) return <p>로딩 중...</p>;
  if (!user || Object.keys(user).length === 0) return <p>사용자 정보를 가져올 수 없습니다.</p>;

  return (
    <div className="userinfo-page">
      <h2>내 정보</h2>
      {/* ✅ 회원 정보 */}
      <UserDetails user={user} />

      <h3>내 예약 현황</h3>
      {/* ✅ 예약 현황 */}
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        <div className="reservation-list">
          {reservations.map((res) => (
            <ReservationCard key={res._id} reservation={res} />
          ))}
        </div>
      )}

      <h3>최근 참여 경기</h3>
      {/* ✅ 최근 참여 경기 */}
      {recentMatches.length === 0 ? (
        <p>최근 참여 경기 내역이 없습니다.</p>
      ) : (
        <div className="recent-match-list">
          {recentMatches.map((match) => (
            <RecentMatchCard key={match._id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
