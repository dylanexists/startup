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

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AppContent />
        </BrowserRouter>
    )
}

function AppContent() {
  const navigate = useNavigate()
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

  async function handlePaymentUpdate(updatedPayment) {
    try {
        const response = await fetch(`/api/payments/id/${updatedPayment.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({paidInFull: true}),
        });

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || `Request failed with status ${response.status}`);
        }
    } catch (error) {
        return null
    }
    
    const savedUserPayments = localStorage.getItem('userPayments')
    if (savedUserPayments) {
        const parsedUserPayments = JSON.parse(savedUserPayments)
        const newPaymentList = parsedUserPayments.map(p =>
            p.id === updatedPayment.id ? updatedPayment : p
        )
        localStorage.setItem('userPayments', JSON.stringify(newPaymentList))
    }
  }

  async function handleRequestMaintenance(updatedApartmentId) {
    try {
        const response = await fetch(`/api/apartments/id/${updatedApartmentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({maintenanceRequested: true}),
        });

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || `Request failed with status ${response.status}`);
        }
    } catch (error) {
        return null
    }
  }

  async function handleSendTechnician(updatedApartmentId) {
    try {
        const response = await fetch(`/api/apartments/id/${updatedApartmentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({technicianSent: true}),
        });

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || `Request failed with status ${response.status}`);
        }
    } catch (error) {
        return null
    }
  }

  async function handleLoginSuccess(user) {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
    if (user.role === 'Admin') {
            navigate('/admin-dashboard')
        } else {
            const userApartment = await getUserApartment(user.id)
            if (userApartment) {
                localStorage.setItem('userApartment', JSON.stringify(userApartment))
                const userPayments = await getUserPaymentsFromApt(userApartment.id)
                localStorage.setItem('userPayments', JSON.stringify(userPayments))
                navigate('/user-dashboard')
            } else {
                return
            }
        }
  }
  
  async function handleRegisterSuccess(newUser, purchasedApt) {
    const userId = newUser.id

    await updateUserApartment(userId, purchasedApt)

    await handleLoginSuccess(newUser) //auto login on successful registration
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

  async function updateUserApartment(userId, apartment) {
    try {
        const response = await fetch(`/api/apartments/id/${apartment.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({linkedUserId: userId}),
        });

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || `Request failed with status ${response.status}`);
        }
    } catch (error) {
        return null
    }
  }

  async function getUserPaymentsFromApt(apartmentId) {
    try {
        const response = await fetch(`/api/payments/id/${apartmentId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const usersPayments = await response.json();
        return usersPayments
    } catch (error) {
        console.error('Failed to fetch user payments:', error);
        return null;
    }
  }

  async function getUserApartment(userId) {
    try {
        const response = await fetch(`/api/apartments/user/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const apt = await response.json();
        return apt;
    } catch (error) {
        console.error('Failed to fetch user apartment:', error);
        return null;
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
            onLoginSuccess={handleLoginSuccess}
            onAutoLogout={handleLogout}/>} 
            />
            <Route path='/find-apartment' 
            element={<FindApartment />} 
            />
            <Route path='/register-user' 
            element={<RegisterUser 
            onRegisterSuccess={handleRegisterSuccess}/>} 
            />
            <Route path='/admin-dashboard' 
            element={<AdminDashboard 
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