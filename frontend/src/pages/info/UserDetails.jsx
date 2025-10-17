import React from "react";
// import "./UserInfo.scss";

const UserDetails = ({ user }) => {
    return (
        <div className="user-details card">
            <table>
                <tbody>
                    <tr>
                        <td>이름</td>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <td>이메일</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td>{user.phone_number}</td>
                    </tr>
                    <tr>
                        <td>등급</td>
                        <td>{user.tier || "없음"}</td>
                    </tr>
                    <tr>
                        <td>역할</td>
                        <td>{user.role}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserDetails;
