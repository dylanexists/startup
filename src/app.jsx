import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import './output-r1.css';
import './app.css';
import { FindApartment } from './find-apartment/find-apartment';
import { Login } from './login/login';
import { RegisterUser } from './register-user/register-user';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { UserDashboard } from './user-dashboard/user-dashboard';
import ScrollToTop from './ScrollToTop'

const ACCOUNTS_GLOB = {
        "admin_0": {id: "0", email: "admin@email.com", password: "admin", role: "Admin"},
        "user_1": {id: "1", email: "user@email.com", password: "user", role: "User"},
    }

const APARTMENTS_GLOB = {
    "1": {
    id: "1",
    title: "Apt. 101",
    description: "Some information about the apartment",
    features: ["3 roommates", "In-unit washer/dryer", "Dope apartment", "That's all"],
    price: 440,
    linkedUserId: null,
  },
  "2": {
    id: "2",
    title: "Apt. 102",
    description: "Stuff about THIS apartment",
    features: ["2 roommates", "Free donkey", "Also dope"],
    price: 500,
    linkedUserId: null,
  },
  "3": {
    id: "3",
    title: "Apt. 103",
    description: "Taken apartment",
    features: ["d1", "d2", "d3"],
    price: 440,
    linkedUserId: "user_1",
  },
  "4": {
    id: "4",
    title: "Apt. 104",
    price: 440,
    linkedUserId: "user_2",
  },
  "5": {
    id: "5",
    title: "Apt. 201",
    price: 460,
    linkedUserId: "user_3",
  },
  "6": {
    id: "6",
    title: "Apt. 202",
    price: 460,
    linkedUserId: "user_4",
  },
  "7": {
    id: "7",
    title: "Apt. 203",
    description: "A third apartment, just as good",
    features: ["2 roommates", "Widescreen TV", "Lots of storage"],
    price: 480,
    linkedUserId: null,
  },
  "8": {
    id: "8",
    title: "Apt. 204",
    price: 480,
    linkedUserId: "user_5",
  },
  "9": {
    id: "9",
    title: "Apt. 301",
    price: 500,
    linkedUserId: "user_6",
  },
  "10": {
    id: "10",
    title: "Apt. 302",
    price: 500,
    linkedUserId: "user_10",
  },
  "11": {
    id: "11",
    title: "Apt. 303",
    price: 520,
    linkedUserId: "user_7",
  },
  "12": {
    id: "12",
    title: "Apt. 304",
    price: 520,
    linkedUserId: "user_8",
  },
}

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AppContent />
        </BrowserRouter>
    )
}

function AppContent() {
  const  [allApartments, setAllApartments] = useState(APARTMENTS_GLOB)
  const availableApartments = Object.values(allApartments).filter(apt => !apt.linkedUserId);

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
  
  function handleRegisterSuccess(newUser, pruchasedApt) {
    const accountID = `user_${newUser.id}`
    setAccounts(prevAccounts => ({
        ...prevAccounts,
        [accountID]: newUser,
    }))

    if (pruchasedApt && pruchasedApt.id) {
        setAllApartments(prevApartments => ({
            ...prevApartments,
            [pruchasedApt.id]: {
                ...prevApartments[pruchasedApt.id],
                linkedUserId: accountID
            }
        }))
    }
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
            onLoginSuccess={handleLoginSuccess}
            onAutoLogout={handleLogout}/>} 
            />
            <Route path='/find-apartment' 
            element={<FindApartment 
            availableApartments={availableApartments}/>} 
            />
            <Route path='/register-user' 
            element={<RegisterUser 
            accounts={accounts}
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