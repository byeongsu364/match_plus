import React from "react";
// import "./UserInfo.scss";

const RecentMatchCard = ({ match }) => {
    const { stadium, time, status } = match;

    return (
        <div className="recent-match-card card">
            <h4>{stadium?.name || "구장 정보 없음"}</h4>
            <p>시간: {time}</p>
            <p>상태: {status}</p>
        </div>
    );
};

export default RecentMatchCard;
