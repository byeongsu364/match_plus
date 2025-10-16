import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import "./../styles/AdminStadium.scss";

const AdminStadium = () => {
    const { token } = useContext(AuthContext);
    const [stadiums, setStadiums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        capacity: "",
        location: { type: "Point", coordinates: [0, 0] },
        available_times: [],
    });
    const [newTime, setNewTime] = useState("");

    useEffect(() => {
        if (!token) return;

        const fetchStadiums = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/stadiums", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStadiums(data);
                setLoading(false);
            } catch (err) {
                console.error("Stadium fetch error:", err);
                setLoading(false);
            }
        };

        fetchStadiums();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "lat") {
            setForm((prev) => ({ ...prev, location: { ...prev.location, coordinates: [parseFloat(value), prev.location.coordinates[1]] } }));
        } else if (name === "lng") {
            setForm((prev) => ({ ...prev, location: { ...prev.location, coordinates: [prev.location.coordinates[0], parseFloat(value)] } }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddTime = () => {
        if (newTime.trim() === "") return;
        setForm((prev) => ({ ...prev, available_times: [...prev.available_times, newTime] }));
        setNewTime("");
    };

    const handleCreate = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/api/stadiums",
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setStadiums((prev) => [...prev, data]);
            setForm({
                name: "",
                capacity: "",
                location: { type: "Point", coordinates: [0, 0] },
                available_times: [],
            });
        } catch (err) {
            console.error("Create stadium error:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/stadiums/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStadiums((prev) => prev.filter((s) => s._id !== id));
        } catch (err) {
            console.error("Delete stadium error:", err);
        }
    };

    if (loading) return <p>로딩 중...</p>;

    return (
        <div className="admin-stadium-page">
            <h2>관리자 구장 관리</h2>

            <div className="stadium-form">
                <h3>새 구장 등록</h3>
                <input type="text" name="name" placeholder="구장 이름" value={form.name} onChange={handleChange} />
                <input type="number" name="capacity" placeholder="수용 인원" value={form.capacity} onChange={handleChange} />
                <input type="number" name="lat" placeholder="위도" value={form.location.coordinates[0]} onChange={handleChange} />
                <input type="number" name="lng" placeholder="경도" value={form.location.coordinates[1]} onChange={handleChange} />

                <div className="available-times">
                    <input type="text" placeholder="10:00-12:00" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
                    <button type="button" onClick={handleAddTime}>추가</button>
                    <div className="time-list">
                        {form.available_times.map((t, idx) => (
                            <span key={idx}>{t}</span>
                        ))}
                    </div>
                </div>

                <button type="button" onClick={handleCreate}>구장 등록</button>
            </div>

            <h3>등록된 구장 목록</h3>
            <table className="stadium-table">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>위치 (lat, lng)</th>
                        <th>수용 인원</th>
                        <th>예약 가능 시간</th>
                        <th>액션</th>
                    </tr>
                </thead>
                <tbody>
                    {stadiums.map((s) => (
                        <tr key={s._id}>
                            <td>{s.name}</td>
                            <td>{s.location.coordinates.join(", ")}</td>
                            <td>{s.capacity}</td>
                            <td>{s.available_times.join(", ")}</td>
                            <td>
                                <button onClick={() => handleDelete(s._id)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminStadium;
