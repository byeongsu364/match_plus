// src/App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import Home from "./pages/Home";
import AdminPost from "./pages/AdminPost";
import UserInfo from "./pages/UserInfo";
import Notfound from "./pages/Notfound";
import LoginForm from './pages/LoginForm';
import RequireAuth from './routes/RequireAuth';
import "./styles/main.scss";
import "./styles/_themes.scss";
import './styles/common.scss';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Header from './components/home/Header';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Header key={isLoggedIn ? "loggedIn" : "loggedOut"} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />

        {/* 로그인 필요 페이지 */}
        <Route path="/userinfo" element={<RequireAuth Component={UserInfo} />} />
        <Route
          path="/admin/post"
          element={<RequireAuth Component={AdminPost} requiredRole="admin" />}
        />

        {/* 없는 페이지 */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
