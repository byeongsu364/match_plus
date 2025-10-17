import React from "react";
// import "./UserInfo.scss";

const ReservationCard = ({ reservation }) => {
    const { stadium, time, status } = reservation;

    return (
        <div className={`reservation-card card ${status === "canceled" ? "canceled" : ""}`}>
            <h4>{stadium?.name || "구장 정보 없음"}</h4>
            <p>예약 시간: {time}</p>
            <p>상태: {status}</p>
        </div>
    );
};

export default ReservationCard;
