// src/pages/admin/components/StadiumList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const StadiumList = () => {
    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        axios.get("/api/stadiums")
            .then(res => setStadiums(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>등록된 구장 목록</h2>
            {stadiums.length === 0 ? (
                <p>등록된 구장이 없습니다.</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>좌표(위도, 경도)</th>
                            <th>수용 인원</th>
                            <th>가능 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stadiums.map((s) => (
                            <tr key={s._id}>
                                <td>{s.name}</td>
                                <td>
                                    {s.location?.coordinates
                                        ? `${s.location.coordinates[1]}, ${s.location.coordinates[0]}`
                                        : "위치 정보 없음"}
                                </td>
                                <td>{s.capacity}</td>
                                <td>{s.available_times?.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StadiumList;
