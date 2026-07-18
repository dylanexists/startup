import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getMonthName = (monthNumber) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1] || "Unknown";
};

export function AdminDashboard({ allApartments, allAccounts, allPayments }) {
  const apartmentsArray = Object.values(allApartments || {})
  const [selectedAptId, setSelectedAptId] = useState(null)
  const selectedApartment = selectedAptId ? allApartments[selectedAptId] : null
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
      const saved = localStorage.getItem('currentUser')
      return saved ? JSON.parse(saved) : null
    })

  useEffect(() => {
    if (!user || user.role !== "Admin") {
        navigate('/')
        return
    }
    }, [user, navigate])

  function getAptTenant(userId) {
    const account = allAccounts[userId];

    return account ? account.email : 'Placeholder Tenant';
  }

  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-4rem)]">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-2 border-gray-300 rounded p-4">
        <div className="lg:col-span-2 p-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Rental Properties</h2>

            <div className="gap-6 p-6">

                <div className="grid-container">
                    {apartmentsArray.map((apt) => {
                        const isSelected = apt.id === selectedAptId
                        const isVacant = !apt.linkedUserId
                        return (
                            <div className={`card ${isSelected ? 'card-selected' : 'border-gray-200'}`}
                                key={apt.id}>   
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="card-title">{apt.title}</h4>     
                                    {isVacant && (
                                        <span className="text-red-600 text-xl font-bold">
                                            &#9888;
                                        </span>
                                    )} 
                                </div>              
                                    <button
                                    onClick={() => setSelectedAptId(apt.id)}
                                    className="card-button">
                                        View</button>
                            </div>
                        )}
                    )}
                </div>
            </div>
            </div>
        <aside className="bg-[#ffffff] p-6 rounded shadow-sm border-gray-300 border top-24 lg:col-span-1">
            {selectedApartment ? (
            <>
            <div className="flex w-full bg-[#f1f4f7] rounded mb-4 items-center justify-center">
                <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800" alt="Fancy Apartment" width="50%" className="m-[10px]"></img>
            </div>
                <div className="flex justify-between items-center"> 
                <span className="card-title">{selectedApartment.title}</span>
                <span className="text-xl font-bold text-[#0f417a] mb-2">${selectedApartment.price}/mo</span>
                </div>
            {selectedApartment.linkedUserId ? (
                <>
                <span className="flex text-xl font-bold justify-center mb-8">
                    {getAptTenant(selectedApartment.linkedUserId)}
                </span>
                <div className="card-footer">
                    <section className="p-6 bg-white border w-full border-gray-300 rounded-lg shadow-sm space-y-6 m-4">
                        {Object.values(allPayments).filter(p => p.linkedApartmentId === selectedApartment.id).length === 0 ? (
                            <p className="text-gray-500 italic text-sm">No payment history found for this tenant.</p>
                        ) : (
                            <ul className="space-y-2">
                                {Object.values(allPayments).filter(p => p.linkedApartmentId === selectedApartment.id)
                                    .map((payment) => (
                                        <li key={payment.id} className="p-2 bg-gray-50 border border-gray-200 rounded-md flex justify-between items-center text-sm">
                                            <span>{getMonthName(payment.month)}: ${payment.amount}</span>
                                            <span className={payment.paidInFull ? "text-green-600 font-medium" : "text-amber-600 font-bold"}>
                                                {payment.paidInFull ? ' Paid ☑ ' : ' Unpaid ☐ '}
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>
                        )}
                        <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                            {selectedApartment.maintenanceRequested ? (
                                <>
                                    <span className="text-red-600 font-semibold text-sm">&#9888; Maintenance Requested!</span>
                                    <button 
                                        //onClick={() => handleSendTechnician(selectedApartment.id)}
                                        className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-3 rounded-md shadow-sm m-2 cursor-pointer"
                                    >
                                        Send Technician
                                    </button>
                                </>
                            ) : (
                                <span className="text-gray-500 text-sm italic">No Maintenance Requests &#x1F44D;</span>
                            )}
                        </div>
                    </section>
                </div>
                </>
            ) : (
                <>
                <div className="justify-center mb-8">
                    <span className="flex text-xl font-bold text-red-600 justify-center mb-8">Vacant &#9888;</span>
                    <div className="card-footer align-center">
                        <p>This apartment is listed in Find Apartments.</p>
                        <p>Let's hope someone purchases it soon!</p>
                    </div>
                </div>
                </>
            )}
            </>
            ) : ( <div className="flex w-full bg-[#f1f4f7] rounded mb-4 items-center justify-center">
                    <p className="font-medium text-center">You are not viewing any property. Select a property to view its details.</p>
                </div>
            )}
        </aside>
    </div>
        </main>
  );
}