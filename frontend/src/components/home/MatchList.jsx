import React from "react";
import matchList from "../../utils/matchlist.js";
import "./styles/MatchList.scss";

const MatchList = () => {
  const handleJoin = (id) => {
    alert(`경기 ${id}번에 참여 신청!`);
  };

  const handleLoadMore = () => {
    alert("더 많은 경기를 불러옵니다.");
  };

  // 모집중/완료 경기 수 계산
  const 모집중수 = matchList.filter(m => m.status === "모집중").length;
  const 완료수 = matchList.filter(m => m.status === "마감").length;

  return (
    <section className="matchlist-root">
      {/* 상단 통계 박스 */}
      <div className="matchlist-summary-wrap">
        <div className="matchlist-summary 모집">
          <span className="summary-icon">📈</span>
          <span className="summary-count">{모집중수}</span>
          <span className="summary-desc">모집중인 경기</span>
        </div>
        <div className="matchlist-summary 완료">
          <span className="summary-icon">⏰</span>
          <span className="summary-count">{완료수}</span>
          <span className="summary-desc">오늘 완료</span>
        </div>
      </div>

      <h2>진행 예정 경기</h2>
      <p>원하는 경기를 선택하고 함께할 팀원들을 만나보세요</p>

      <div className="matchlist-tags">
        <span className="tag hot">🔥 인기 경기</span>
        <span className="tag soon">⚡ 마감 임박</span>
        <span className="tag beginner">🆓 초급자 환영</span>
        <span className="tag cheap">🥇 저렴한 가격</span>
      </div>

      <div className="matchlist-cards">
        {matchList.map((match) => (
          <div className="match-card" key={match.id}>
            {/* 이하 기존 코드 생략... */}
            {/* ... */}
            <div className={`match-status ${match.status === "모집중" ? "open" : "closed"}`}>
              {match.status}
            </div>
            <div className="match-title">{match.title}</div>
            {/* ... */}
            {match.status === "모집중" ? (
              <button className="btn-join" onClick={() => handleJoin(match.id)}>
                참여하기
              </button>
            ) : (
              <button className="btn-closed" disabled>
                마감됨
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="matchlist-more-wrap">
        <button className="matchlist-more-btn" onClick={handleLoadMore}>
          더 많은 경기 보기
        </button>
      </div>
    </section>
  );
};

export default MatchList;
