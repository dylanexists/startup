import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getMonthName = (monthNumber) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1] || "Unknown";
};

export function UserDashboard( { onPaymentUpdate, onRequestMaintenance } ) {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser')
    return saved ? JSON.parse(saved) : null
  })

  const [apartment, setApartment] = useState(() => {
    const saved = localStorage.getItem('userApartment')
    return saved ? JSON.parse(saved) : null
  })

  const [userPayments, setUserPayments] = useState(() => {
    const saved = localStorage.getItem('userPayments')
    return saved ? JSON.parse(saved) : []
  })

  function handlePayRent() {
    if (userPayments.length === 0) return

    const lastPaymentIndex = userPayments.length - 1;
    const lastPayment = userPayments[lastPaymentIndex]

    const updatedPayment = {
        ...lastPayment,
        paidInFull: true
    }

    const updatedPaymentHistory = userPayments.map((p, index) =>
        index === lastPaymentIndex ? updatedPayment : p
    )
    setUserPayments(updatedPaymentHistory)
    if(onPaymentUpdate) {onPaymentUpdate(updatedPayment)}
  }

  function handleRequestMaintenance() {
    const updatedApartment = {
        ...apartment,
        maintenanceRequested:true
    }
    setApartment(updatedApartment)
    if(onRequestMaintenance) {onRequestMaintenance(updatedApartment)}
  }
  

  useEffect(() => {
    if (!user || !apartment) {
        navigate('/')
        return
    }
  }, [user, apartment, navigate])

  if (!user || !apartment) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-300">Loading your dashboard details...</p>
      </main>
    );
  }


  return (
    <main className="flex flex-col items-center pt-16 min-h-[calc(100vh-8.25rem)]">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-24">User Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <section className="p-6 bg-white border w-full border-gray-300 rounded-lg shadow-sm space-y-6 m-4">
                    <h3>Payment History</h3>
                    <ul className="space-y-3">
                    {userPayments.length === 0 ? (
                        <>
                        <p className="text-gray-500 italic text-sm">No payment history found.</p>
                        <p className="text-gray-500 italic text-sm">Your landlord has yet to send out rent charges!</p>
                        </>
                    ) : (
                        userPayments.map((payment) => (
                            <li key={payment.id} className="p-3 bg-gray-50 border border-gray-200 rounded-md flex justify-between items-center">
                                <span>{getMonthName(payment.month)}: ${payment.amount}</span>
                                <span className={payment.paidInFull ? "text-green-600" : "text-amber-600 font-bold"}>
                                    {payment.paidInFull ? ' Paid ☑ ' : ' Unpaid ☐ '}
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                    <button 
                    disabled={userPayments.length === 0 || userPayments[userPayments.length - 1].paidInFull}
                    className={`font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-sm ${
                        userPayments.length > 0 && userPayments[userPayments.length - 1].paidInFull
                            ? "bg-gray-300 text-gray-500 cursor-default"
                            : "bg-[#0f417a] hover:bg-[#0a2f58] text-white cursor-pointer"
                    }`}
                    onClick={
                        userPayments.length > 0 && !userPayments[userPayments.length - 1].paidInFull 
                        ? handlePayRent 
                        : undefined
                    }>
                        {userPayments.length > 0 && userPayments[userPayments.length - 1].paidInFull 
                            ? "Rent Paid" 
                            : "Pay Rent"}
                        </button>
                </section>
                {apartment && 
                <div className="flex flex-col justify-between p-6 bg-white border border-gray-200 rounded shadow-sm md:col-span-2 p-6">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{apartment.title} <br></br> ${apartment.price}/mo</h2>
                    
                    <div className="flex flex-col gap-2 mt-4">
                        <p>{apartment.description}</p>
                        {apartment.features.map((feature, index) => (
                            <p key={index}>- {feature}</p>
                            ))}
                        {apartment.maintenanceRequested ? (
                            <>
                            {apartment.technicianSent ? <p className="text-yellow-500">Management has sent you a Technician!</p> : <div></div>}
                            <button 
                                disabled={true}
                                onClick={undefined}
                                className="bg-gray-300 text-white font-semibold py-2 px-6 rounded shadow-sm text-center cursor-default"
                            >
                                Maintenance Has Been Requested</button>
                            </>
                            ) : (
                            <>
                            <div></div>
                            <button 
                                disabled={false}
                                onClick={handleRequestMaintenance}
                                className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded shadow-sm text-center cursor-pointer"
                            >
                            Request Maintenance</button>
                            </>
                        )}
                        
                    </div>
                </div>
                }
            </div>  
        </main>
  );
}