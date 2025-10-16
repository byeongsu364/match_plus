import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import "./../styles/AdminReservation.scss";

const AdminReservation = () => {
    const { token } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchReservations = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/reservations", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReservations(data);
                setLoading(false);
            } catch (err) {
                console.error("Reservations fetch error:", err);
                setLoading(false);
            }
        };

        fetchReservations();
    }, [token]);

    const handleStatusChange = async (id, status) => {
        try {
            const { data } = await axios.patch(
                `http://localhost:3000/api/reservations/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setReservations((prev) =>
                prev.map((r) => (r._id === id ? data.reservation : r))
            );
        } catch (err) {
            console.error("Reservation status update error:", err);
        }
    };

    if (loading) return <p>로딩 중...</p>;

    return (
        <div className="admin-reservation-page">
            <h2>관리자 예약 관리</h2>

            {reservations.length === 0 ? (
                <p>예약 내역이 없습니다.</p>
            ) : (
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>사용자</th>
                            <th>구장</th>
                            <th>시간</th>
                            <th>상태</th>
                            <th>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((r) => (
                            <tr key={r._id}>
                                <td>{r.user?.name} ({r.user?.email})</td>
                                <td>{r.stadium?.name}</td>
                                <td>{r.time}</td>
                                <td>{r.status}</td>
                                <td>
                                    {r.status !== "canceled" && (
                                        <button onClick={() => handleStatusChange(r._id, "canceled")}>
                                            취소
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminReservation;
