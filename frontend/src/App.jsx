// src/App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import AdminPost from "./pages/AdminPost"
import UserLogin from "./pages/UserLogin"
import UserInfo from "./pages/UserInfo"
import Notfound from "./pages/Notfound"
import StadiumListPage from "./pages/StadiumListPage"
import StadiumDetailPage from "./pages/StadiumDetailPage"
import AuthRedirectRoute from './routes/AuthRedirectRoute'
import RequireAuth from './routes/RequireAuth';
import "./styles/main.scss"
import "./styles/_themes.scss"
import './styles/common.scss'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>  
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/admin/login" element={<AuthRedirectRoute Component={AdminLogin} />} />
          <Route path="/admin/post" element={<RequireAuth Component={AdminPost} />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/userinfo" element={<RequireAuth Component={UserInfo} />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
