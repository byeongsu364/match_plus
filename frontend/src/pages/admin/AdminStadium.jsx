// src/pages/admin/AdminStadium.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AdminStadium = () => {
    const { user } = useContext(AuthContext);
    const [stadiums, setStadiums] = useState([]);
    const [form, setForm] = useState({
        name: "",
        latitude: "",
        longitude: "",
        capacity: "",
        available_times: "",
    });

    useEffect(() => {
        fetchStadiums();
    }, []);

    const fetchStadiums = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/stadiums");
            setStadiums(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:3000/api/stadiums",
                {
                    name: form.name,
                    location: {
                        type: "Point",
                        coordinates: [parseFloat(form.longitude), parseFloat(form.latitude)],
                    },
                    capacity: parseInt(form.capacity),
                    available_times: form.available_times.split(",").map((t) => t.trim()),
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            alert("✅ 경기장이 등록되었습니다!");
            setForm({ name: "", latitude: "", longitude: "", capacity: "", available_times: "" });
            fetchStadiums();
        } catch (err) {
            console.error(err);
            alert("❌ 등록 실패");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/stadiums/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            alert("삭제 완료");
            fetchStadiums();
        } catch (err) {
            console.error(err);
            alert("삭제 실패");
        }
    };

    return (
        <div className="admin-stadium-page">
            <h2>🏟️ 경기장 관리 (Admin)</h2>

            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="경기장 이름" value={form.name} onChange={handleChange} />
                <input name="latitude" placeholder="위도" value={form.latitude} onChange={handleChange} />
                <input name="longitude" placeholder="경도" value={form.longitude} onChange={handleChange} />
                <input name="capacity" placeholder="수용 인원" value={form.capacity} onChange={handleChange} />
                <input
                    name="available_times"
                    placeholder="가능 시간대 (예: 10:00-12:00, 14:00-16:00)"
                    value={form.available_times}
                    onChange={handleChange}
                />
                <button type="submit">등록하기</button>
            </form>

            <h3>등록된 경기장 목록</h3>
            <ul>
                {stadiums.map((s) => (
                    <li key={s._id}>
                        <strong>{s.name}</strong> ({s.capacity}명)
                        <button onClick={() => handleDelete(s._id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminStadium;
