import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import "./styles/StadiumCreateForm.scss";

const StadiumCreateForm = () => {
    const { token } = useContext(AuthContext);

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
            alert("⚠️ 관리자 로그인이 필요합니다.");
            return;
        }

        try {
            const payload = {
                name: form.name,
                latitude: parseFloat(form.latitude),
                longitude: parseFloat(form.longitude),
                capacity: parseInt(form.capacity),
                available_times: form.available_times
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t !== ""),
            };

            console.log("📦 [전송 데이터]", payload);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/stadiums`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("✅ [구장 등록 성공]", res.data);
            alert("✅ 구장이 성공적으로 등록되었습니다!");

            // 폼 초기화
            setForm({
                name: "",
                latitude: "",
                longitude: "",
                capacity: "",
                available_times: "",
            });
        } catch (err) {
            console.error("❌ [구장 등록 실패]", err.response?.data || err);
            alert(err.response?.data?.message || "등록 실패");
        }
    };

    return (
        <div className="stadium-create">
            <h2>⚽ 구장 등록</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="구장 이름"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="latitude"
                    placeholder="위도 (예: 37.595704)"
                    value={form.latitude}
                    onChange={handleChange}
                    required
                />
                <input
                    name="longitude"
                    placeholder="경도 (예: 127.105399)"
                    value={form.longitude}
                    onChange={handleChange}
                    required
                />
                <input
                    name="capacity"
                    type="number"
                    placeholder="수용 인원"
                    value={form.capacity}
                    onChange={handleChange}
                    required
                />
                <input
                    name="available_times"
                    placeholder="가능 시간 (쉼표로 구분)"
                    value={form.available_times}
                    onChange={handleChange}
                    required
                />
                <button type="submit">등록하기</button>
            </form>
        </div>
    );
};

export default StadiumCreateForm;
