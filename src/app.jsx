import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import './output-r1.css';
import './app.css';
import { FindApartment } from './find-apartment/find-apartment';
import { Login } from './login/login';
import { RegisterUser } from './register-user/register-user';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { AccountManager } from './login/AccountManager';

const ACCOUNTS_GLOB = {
        "admin_0": {id: "0", email: "admin@email.com", password: "admin", role: "Admin"},
        "user_1": {id: "1", email: "user@email.com", password: "user", role: "User"},
    }

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

function AppContent() {
  const [accounts, setAccounts] = useState(ACCOUNTS_GLOB)
  const navigate = useNavigate()
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

  function handleLoginSuccess(user) {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }
  
  function handleRegisterSuccess(newUser) {
    setAccounts(prevAccounts => ({
        ...prevAccounts,
        [`user_${newUser.id}`]: newUser,
    }))
    handleLoginSuccess(newUser) //auto login on successful registration
}

  function handleLogout() {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    navigate('/')
  }
  

  return (
    <div className="body bg-dark text-light">
        <header className="flex items-center px-8 py-4">
            <Link to="/" className="block shrink-0">
            <img src="/free-house-icon.png" alt="Logo" className="h-auto max-h-[50px] w-auto object-contain"></img>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                RentItBest</h1>
            <nav className="ml-auto">
                <menu className="flex justify-end items-center gap-4">
                    {currentUser ? (
                    <>
                    <li><div className="font-bold">{currentUser.email.split('@')[0]}</div></li>
                    <li><button onClick={handleLogout} className="nav-button">Logout</button></li>
                    </>
                    ) : (
                    <>
                    <li><NavLink to="/">Login</NavLink></li>
                    <li><NavLink to="/find-apartment">Find an Apartment</NavLink></li>
                    </>
                    )}
                </menu>
            </nav>
        </header>

        <Routes>
            <Route path='/' 
            element={<Login 
            accounts={accounts}
            onLoginSuccess={handleLoginSuccess}/>} 
            />
            <Route path='/find-apartment' element={<FindApartment />} />
            <Route path='/register-user' 
            element={<RegisterUser 
            onRegisterSuccess={handleRegisterSuccess}/>} 
            />
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/user-dashboard' element={<UserDashboard />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <hr />
            <span>© 2026 [Dylan Steenhoek]. This website was created strictly for educational purposes as a school project. All external media, fonts, and images are used under Fair Use for academic evaluation.</span>
            <br />
            <a href="https://github.com/dylanexists/startup">GitHub</a>
        </footer>
    </div>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center h-screen flex items-center justify-center">404: Return to sender. Address unknown.</main>;
}