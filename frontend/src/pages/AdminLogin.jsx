import LoginForm from "./LoginForm";

export default function AdminLogin() {
    return <LoginForm role="admin" redirectPath="/admin/post" />;
}
