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
    maintenanceRequested: false,
    technicianSent: false,
  },
  "2": {
    id: "2",
    title: "Apt. 102",
    description: "Stuff about THIS apartment",
    features: ["2 roommates", "Free donkey", "Also dope"],
    price: 500,
    linkedUserId: null,
    maintenanceRequested: false,
    technicianSent: false,
  },
  "3": {
    id: "3",
    title: "Apt. 103",
    description: "Taken apartment",
    features: ["d1", "d2", "d3"],
    price: 445,
    linkedUserId: "user_1",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "4": {
    id: "4",
    title: "Apt. 104",
    price: 440,
    linkedUserId: "user_2",
    maintenanceRequested: true,
    technicianSent: false,
  },
  "5": {
    id: "5",
    title: "Apt. 201",
    price: 460,
    linkedUserId: "user_3",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "6": {
    id: "6",
    title: "Apt. 202",
    price: 460,
    linkedUserId: "user_4",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "7": {
    id: "7",
    title: "Apt. 203",
    description: "A third apartment, just as good",
    features: ["2 roommates", "Widescreen TV", "Lots of storage"],
    price: 480,
    linkedUserId: null,
    maintenanceRequested: false,
    technicianSent: false,
  },
  "8": {
    id: "8",
    title: "Apt. 204",
    price: 485,
    linkedUserId: "user_5",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "9": {
    id: "9",
    title: "Apt. 301",
    price: 515,
    linkedUserId: "user_6",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "10": {
    id: "10",
    title: "Apt. 302",
    price: 500,
    linkedUserId: "user_10",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "11": {
    id: "11",
    title: "Apt. 303",
    price: 525,
    linkedUserId: "user_7",
    maintenanceRequested: false,
    technicianSent: false,
  },
  "12": {
    id: "12",
    title: "Apt. 304",
    price: 520,
    linkedUserId: "user_8",
    maintenanceRequested: false,
    technicianSent: false,
  },
}

const PAYMENTS_GLOB = {
        // Apt. 103 (Price: 440, History: Months 6, 7)
    "pay_1234": {
        id: "pay_1234",
        linkedApartmentId: "3",
        month: 6,
        amount: 445,
        paidInFull: true,
    },
    "pay_5678": {
        id: "pay_5678",
        linkedApartmentId: "3",
        month: 7,
        amount: 445,
        paidInFull: false,
    },
    // Apt. 104 (Price: 440, History: Months 5, 6, 7)
    "pay_0001": {
        id: "pay_0001",
        linkedApartmentId: "4",
        month: 5,
        amount: 440,
        paidInFull: true,
    },
    "pay_0002": {
        id: "pay_0002",
        linkedApartmentId: "4",
        month: 6,
        amount: 440,
        paidInFull: true,
    },
    "pay_0003": {
        id: "pay_0003",
        linkedApartmentId: "4",
        month: 7,
        amount: 440,
        paidInFull: false,
    },

    // Apt. 201 (Price: 460, History: Months 6, 7)
    "pay_0004": {
        id: "pay_0004",
        linkedApartmentId: "5",
        month: 6,
        amount: 460,
        paidInFull: true,
    },
    "pay_0005": {
        id: "pay_0005",
        linkedApartmentId: "5",
        month: 7,
        amount: 460,
        paidInFull: false,
    },

    // Apt. 202 (Price: 460, History: Months 4, 5, 6, 7)
    "pay_0006": {
        id: "pay_0006",
        linkedApartmentId: "6",
        month: 4,
        amount: 460,
        paidInFull: true,
    },
    "pay_0007": {
        id: "pay_0007",
        linkedApartmentId: "6",
        month: 5,
        amount: 460,
        paidInFull: true,
    },
    "pay_0008": {
        id: "pay_0008",
        linkedApartmentId: "6",
        month: 6,
        amount: 460,
        paidInFull: true,
    },
    "pay_0009": {
        id: "pay_0009",
        linkedApartmentId: "6",
        month: 7,
        amount: 460,
        paidInFull: false,
    },

    // Apt. 204 (Price: 485, History: Months 3, 4, 5, 6, 7)
    "pay_0010": {
        id: "pay_0010",
        linkedApartmentId: "8",
        month: 3,
        amount: 485,
        paidInFull: true,
    },
    "pay_0011": {
        id: "pay_0011",
        linkedApartmentId: "8",
        month: 4,
        amount: 485,
        paidInFull: true,
    },
    "pay_0012": {
        id: "pay_0012",
        linkedApartmentId: "8",
        month: 5,
        amount: 485,
        paidInFull: true,
    },
    "pay_0013": {
        id: "pay_0013",
        linkedApartmentId: "8",
        month: 6,
        amount: 485,
        paidInFull: true,
    },
    "pay_0014": {
        id: "pay_0014",
        linkedApartmentId: "8",
        month: 7,
        amount: 485,
        paidInFull: false,
    },

    // Apt. 301 (Price: 515, History: Months 5, 6, 7)
    "pay_0015": {
        id: "pay_0015",
        linkedApartmentId: "9",
        month: 5,
        amount: 515,
        paidInFull: true,
    },
    "pay_0016": {
        id: "pay_0016",
        linkedApartmentId: "9",
        month: 6,
        amount: 515,
        paidInFull: true,
    },
    "pay_0017": {
        id: "pay_0017",
        linkedApartmentId: "9",
        month: 7,
        amount: 515,
        paidInFull: false,
    },

    // Apt. 302 (Price: 500, History: Months 6, 7)
    "pay_0018": {
        id: "pay_0018",
        linkedApartmentId: "10",
        month: 6,
        amount: 500,
        paidInFull: true,
    },
    "pay_0019": {
        id: "pay_0019",
        linkedApartmentId: "10",
        month: 7,
        amount: 500,
        paidInFull: false,
    },

    // Apt. 303 (Price: 525, History: Months 4, 5, 6, 7)
    "pay_0020": {
        id: "pay_0020",
        linkedApartmentId: "11",
        month: 4,
        amount: 525,
        paidInFull: true,
    },
    "pay_0021": {
        id: "pay_0021",
        linkedApartmentId: "11",
        month: 5,
        amount: 525,
        paidInFull: true,
    },
    "pay_0022": {
        id: "pay_0022",
        linkedApartmentId: "11",
        month: 6,
        amount: 525,
        paidInFull: true,
    },
    "pay_0023": {
        id: "pay_0023",
        linkedApartmentId: "11",
        month: 7,
        amount: 525,
        paidInFull: false,
    },

    // Apt. 304 (Price: 520, History: Months 5, 6, 7)
    "pay_0024": {
        id: "pay_0024",
        linkedApartmentId: "12",
        month: 5,
        amount: 520,
        paidInFull: true,
    },
    "pay_0025": {
        id: "pay_0025",
        linkedApartmentId: "12",
        month: 6,
        amount: 520,
        paidInFull: true,
    },
    "pay_0026": {
        id: "pay_0026",
        linkedApartmentId: "12",
        month: 7,
        amount: 520,
        paidInFull: false,
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