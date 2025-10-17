// src/pages/admin/components/StadiumCreateForm.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext"; // 경로 확인

const StadiumCreateForm = () => {
    const { token } = useContext(AuthContext); // 🔹 토큰 가져오기
    const [form, setForm] = useState({
        name: "",
        latitude: "",
        longitude: "",
        capacity: "",
        available_times: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await axios.post(
                "/api/stadiums",
                {
                    name: form.name,
                    location: {
                        type: "Point",
                        coordinates: [parseFloat(form.longitude), parseFloat(form.latitude)] // [경도, 위도]
                    },
                    capacity: parseInt(form.capacity),
                    available_times: form.available_times.split(",").map((t) => t.trim()),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert("구장이 등록되었습니다!");
            setForm({
                name: "",
                latitude: "",
                longitude: "",
                capacity: "",
                available_times: "",
            });
        } catch (err) {
            console.error(err.response || err);
            alert("등록 실패");
        }
    };

    return (
        <div>
            <h2>구장 생성</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input name="name" placeholder="구장 이름" value={form.name} onChange={handleChange} required />
                <input name="latitude" placeholder="위도" value={form.latitude} onChange={handleChange} required />
                <input name="longitude" placeholder="경도" value={form.longitude} onChange={handleChange} required />
                <input name="capacity" type="number" placeholder="수용 인원" value={form.capacity} onChange={handleChange} required />
                <input name="available_times" placeholder="가능 시간 (쉼표로 구분)" value={form.available_times} onChange={handleChange} required />
                <button type="submit">등록하기</button>
            </form>
        </div>
    );
};

export default StadiumCreateForm;

