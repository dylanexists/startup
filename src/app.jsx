import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import './output-r1.css';
import './app.css';
import { FindApartment } from './find-apartment/find-apartment';
import { Login } from './login/login';
import { RegisterUser } from './register-user/register-user';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { UserDashboard } from './user-dashboard/user-dashboard';
import ScrollToTop from './ScrollToTop';
import { APP_MONTH } from './constants';

const ACCOUNTS_GLOB = {
        "admin_0": {id: "0", email: "admin@email.com", password: "admin", role: "Admin"},
        "user_1": {id: "user_1", email: "user@email.com", password: "user", role: "User"},
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

const PAYMENTS_GLOB = {
    "1": {
        id: "1",
        linkedApartmentId: "3",
        month: 6,
        amount: 440,
        paidInFull: true,
    }
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

  const [payments, setPayments] = useState(PAYMENTS_GLOB)
  const [accounts, setAccounts] = useState(ACCOUNTS_GLOB)
  const navigate = useNavigate()
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

  React.useEffect(() => {
  console.log("Updated Apartments State:", allApartments);
}, [allApartments]);

  function handleLoginSuccess(user, currentApartments = allApartments) { //have to add currentApartments because React State is weird
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
    if (user.role === 'Admin') {
            navigate('/admin-dashboard')
        } else {
            const userApartment = Object.values(currentApartments).find(
                (apt) => apt.linkedUserId === user.id)
            if (userApartment) {
                localStorage.setItem('userApartment', JSON.stringify(userApartment))
                const userPayments = getPaymentsByUserId(user.id, currentApartments)
                localStorage.setItem('userPayments', JSON.stringify(userPayments))
                navigate('/user-dashboard')
            } else {
                console.log("Error finding user's apartment!")
                return
            }
        }
  }
  
  function handleRegisterSuccess(newUser, purchasedApt) {
    const accountID = newUser.id
    setAccounts(prevAccounts => ({
        ...prevAccounts,
        [accountID]: newUser,
    }))

    const nextApartmentsState = {
        ...allApartments,
        [purchasedApt.id]: {
            ...allApartments[purchasedApt.id],
            linkedUserId: accountID
        }
    }
    setAllApartments(nextApartmentsState)

    handleLoginSuccess(newUser, nextApartmentsState) //auto login on successful registration
}

  function handleLogout() {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userApartment')
    localStorage.removeItem('userPayments')
    navigate('/')
  }

  function getPaymentsByUserId(userId, currentApartments = allApartments) {
    const userApartment = Object.values(currentApartments).find(
        apt => apt.linkedUserId === userId
    )
    if (!userApartment) return []

    const aptPayments = Object.values(payments).filter(
        payment => payment.linkedApartmentId === userApartment.id
    )

    return checkOrAddThisMonthsPayment(aptPayments, userApartment)
  }

  function checkOrAddThisMonthsPayment(payments, apartment) {
    if (payments.some(payment => payment.month === APP_MONTH)) {
        return payments
    } else {
        const nextId = (Object.keys(payments).length + 1).toString();
        const newPayment = {
            id: nextId,
            linkedApartmentId: apartment.id,
            month: APP_MONTH,
            amount: apartment.price,
            paidInFull: false
        }
        payments.push(newPayment) //update the array we are returning
        setPayments(prevPayments => ({ //update local storage
            ...prevPayments,
            [nextId]: newPayment,
        }))
        return payments
    }
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
            <Route path='/admin-dashboard' 
            element={<AdminDashboard 
            allApartments={allApartments}
            allAccounts={accounts}
            allPayments={payments}/>} 
            />
            <Route path='/user-dashboard' 
            element={<UserDashboard />} 
            />
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