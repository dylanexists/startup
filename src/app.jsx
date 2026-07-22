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
import { APP_MONTH, PAYMENTS_GLOB, APARTMENTS_GLOB, ACCOUNTS_GLOB } from './constants';

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

  function handlePaymentUpdate(updatedPayment) {
    setPayments((prevPayments) => ({
        ...prevPayments,
        [updatedPayment.id] : updatedPayment
    }))
    
    const savedUserPayments = localStorage.getItem('userPayments')
    if (savedUserPayments) {
        const parsedUserPayments = JSON.parse(savedUserPayments)
        const newPaymentList = parsedUserPayments.map(p =>
            p.id === updatedPayment.id ? updatedPayment : p
        )
        localStorage.setItem('userPayments', JSON.stringify(newPaymentList))
    }
  }

  function handleRequestMaintenance(updatedApartment) {
    setAllApartments((prevApartments) => ({
        ...prevApartments,
        [updatedApartment.id] : updatedApartment
    }))
    
    const savedUserApartment = localStorage.getItem('userApartment')
    if (savedUserApartment) {
        localStorage.setItem('userApartment', JSON.stringify(updatedApartment))
    }
    console.log(localStorage.getItem('userApartment'))
  }

  function handleSendTechnician(updatedApartment) {
    setAllApartments((prevApartments) => ({
        ...prevApartments,
        [updatedApartment.id] : updatedApartment
    }))
  }

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
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }) .catch(() => {
        // Logout failed. Assuming offline
    })
    .finally(() => {
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
        localStorage.removeItem('userApartment')
        localStorage.removeItem('userPayments')
        navigate('/')
    });
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

  function checkOrAddThisMonthsPayment(aptPayments, apartment) {
    if (aptPayments.some(payment => payment.month === APP_MONTH)) {
        return aptPayments
    } else {
        const nextId = `pay_${Date.now()}`
        const newPayment = {
            id: nextId,
            linkedApartmentId: apartment.id,
            month: APP_MONTH,
            amount: apartment.price,
            paidInFull: false
        }
        setPayments(prevPayments => ({ //update local storage
            ...prevPayments,
            [nextId]: newPayment,
        }))
        return [...aptPayments, newPayment]
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
            element={<FindApartment />} 
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
            allPayments={payments}
            onSendTechnician={handleSendTechnician}/>} 
            />
            <Route path='/user-dashboard' 
            element={<UserDashboard 
            onPaymentUpdate={handlePaymentUpdate}
            onRequestMaintenance={handleRequestMaintenance}/>} 
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