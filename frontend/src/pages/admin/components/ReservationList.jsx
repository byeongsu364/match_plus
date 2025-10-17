// src/pages/admin/components/ReservationList.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import './styles/ReservationList.scss'

const ReservationList = () => {
    const { token, user } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // 토큰 또는 사용자 정보 없으면 중단
        if (!token || !user) return;

        // admin 권한이 아닌 경우 차단
        if (user.role !== "admin") {
            setError("관리자 권한이 필요합니다.");
            setLoading(false);
            return;
        }

        const fetchReservations = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/reservations", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReservations(res.data);
            } catch (err) {
                console.error("예약 목록 불러오기 실패:", err);
                setError("예약 데이터를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [token, user]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="admin-reservation">
            <h2>📋 사용자 예약 현황</h2>

            {reservations.length === 0 ? (
                <p>예약 내역이 없습니다.</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>유저명</th>
                            <th>이메일</th>
                            <th>구장명</th>
                            <th>예약 시간</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((r) => (
                            <tr key={r._id}>
                                <td>{r.user?.name || "탈퇴한 사용자"}</td>
                                <td>{r.user?.email || "-"}</td>
                                <td>{r.stadium?.name || "삭제된 구장"}</td>
                                <td>{r.time}</td>
                                <td>{r.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReservationList;
