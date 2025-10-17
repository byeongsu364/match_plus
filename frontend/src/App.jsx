// src/App.jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import Notfound from "./pages/Notfound";
import LoginForm from './pages/LoginForm';
import RequireAuth from './routes/RequireAuth';
import AdminStadium from './pages/admin/AdminStadium';
import AdminReservation from './pages/admin/AdminReservation';
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
        {/* 홈 & 로그인 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm role="user" redirectPath="/" />} />


        {/* 로그인 필요 페이지 */}
        <Route path="/userinfo" element={<RequireAuth Component={UserInfo} />} />

        {/* 관리자 전용 페이지 */}
        <Route
          path="/admin/stadium"
          element={<RequireAuth Component={AdminStadium} requiredRole="admin" />}
        />
        <Route
          path="/admin/reservation"
          element={<RequireAuth Component={AdminReservation} requiredRole="admin" />}
        />

        {/* 없는 페이지 */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
