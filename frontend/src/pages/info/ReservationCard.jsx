import React from "react";
// import "./ReservationCard.scss"; // 스타일 별도 분리 추천

const ReservationCard = ({ reservation }) => {
    const { stadium, time, status, date } = reservation;

    // ✅ 날짜 포맷팅
    const formattedDate = date
        ? new Date(date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "short",
            day: "numeric",
            weekday: "short",
        })
        : "날짜 미정";

    // ✅ 상태 배지 색상 매핑
    const statusLabel = {
        confirmed: "✅ 확정",
        pending: "⏳ 대기",
        canceled: "❌ 취소",
    }[status] || "정보 없음";

    return (
        <div className={`reservation-card card ${status}`}>
            <div className="card-header">
                <h4 className="stadium-name">{stadium?.name || "구장 정보 없음"}</h4>
                <span className={`status-badge ${status}`}>{statusLabel}</span>
            </div>

            <p className="reservation-info">📅 {formattedDate}</p>
            <p className="reservation-info">⏰ 예약 시간: {time || "시간 미정"}</p>

            {/* ✅ 버튼 추가 (선택사항) */}
            {status !== "canceled" && (
                <button
                    className="cancel-btn"
                    onClick={() => alert(`${stadium?.name} 예약을 취소했습니다.`)}
                >
                    취소하기
                </button>
            )}
        </div>
    );
};

export default ReservationCard;
