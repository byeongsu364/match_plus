const filterOptions = [
  {
    icon: "📍",
    label: "지역",
    placeholder: "지역 선택",
    type: "select",
    key: "region",
    options: ["강남구", "서초구", "송파구"] // 예시 데이터
  },
  {
    icon: "⚽",
    label: "종목",
    placeholder: "종목 선택",
    type: "select",
    key: "category",
    options: ["축구", "야구", "농구"]
  },
  {
    icon: "📅",
    label: "날짜",
    placeholder: "날짜 선택",
    type: "date",
    key: "date"
  },
  {
    icon: "👤",
    label: "레벨",
    placeholder: "레벨 선택",
    type: "select",
    key: "level",
    options: ["초보", "중수", "고수"]
  },
  {
    icon: "$",
    label: "가격대",
    placeholder: "가격대 선택",
    type: "select",
    key: "price",
    options: ["0~1만원", "1~2만원", "2만원 이상"]
  }
];

export default filterOptions;
