import LoginForm from "./LoginForm";

export default function UserLogin() {
  // role: "user"로 지정, 로그인 성공 시 "/userinfo"로 이동
  return <LoginForm role="user" redirectPath="/userinfo" />;
}
