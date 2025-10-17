// src/pages/admin/AdminReservation.jsx
import React, { useState } from "react";
import ReservationList from "./components/ReservationList.jsx";
import StadiumList from "./components/StadiumList";
import StadiumCreateForm from "./components/StadiumCreateForm.jsx";
// import "./AdminReservation.scss";

const AdminReservation = () => {
    const [activeTab, setActiveTab] = useState("reservations");

    return (
        <div className="admin-reservation-container">
            <h1>관리자 예약 관리</h1>

            {/* 탭 버튼 */}
            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === "reservations" ? "active" : ""}`}
                    onClick={() => setActiveTab("reservations")}
                >
                    사용자 예약 현황
                </button>
                <button
                    className={`tab-btn ${activeTab === "stadiums" ? "active" : ""}`}
                    onClick={() => setActiveTab("stadiums")}
                >
                    구장 관리
                </button>
                <button
                    className={`tab-btn ${activeTab === "create" ? "active" : ""}`}
                    onClick={() => setActiveTab("create")}
                >
                    구장 생성
                </button>
            </div>

            {/* 탭 내용 */}
            <div className="admin-tab-content">
                {activeTab === "reservations" && <ReservationList />}
                {activeTab === "stadiums" && <StadiumList />}
                {activeTab === "create" && <StadiumCreateForm />}
            </div>
        </div>
    );
};

export default AdminReservation;
