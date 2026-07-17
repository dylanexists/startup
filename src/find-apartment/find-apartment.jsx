import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function FindApartment({ availableApartments }) {
  const [selectedApt, setSelectedApt] = useState(null)

  return (
    <main className="flex flex-col items-center pt-16 min-h-[calc(100vh-8.25rem)]">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-24">
            Find an Apartment</h1>
        
        <div className="text-center">
            
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Available Listings:</h2>

            <p>Note: The average housing cost in Provo is: [API CALL]</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-2 border-gray-300 rounded p-4">
                
                    {availableApartments.map((apt) => (
                    <div 
                        className={`card ${selectedApt === apt ? 'card-selected' : ''}`}
                        key={apt.id} 
                        >
                        <h4 className="card-title">{apt.title}</h4>
                        
                        <div className="card-footer">
                            <p>{apt.description}</p>
                            
                            {apt.features.map((feature, index) => (
                            <p key={index}>- {feature}</p>
                            ))}
                            
                            <span className="card-price">${apt.price}/mo</span>
                            <button className="card-button"
                            onClick={() => setSelectedApt(apt)}>
                            View</button>
                        </div>
                    </div>
                    ))}
            
                </div>
        {selectedApt && 
            <aside className="bg-[#ffffff] p-6 rounded shadow-sm border-gray-300 border top-24 lg:col-span-1">
                <button 
                    onClick={() => setSelectedApt(null)}
                    className="text-gray-900 hover:text-[#9e9e9e] font-bold text-right w-full">
                    ✕ Close
                </button>
                <div className="flex w-full bg-[#f1f4f7] rounded mb-4 items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800" alt="Fancy Apartment" width="50%" className="m-[10px]"></img>
                </div> 
                    <h2 className="card-title">Become a Tenant</h2>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedApt.title}</h3>
                    <span className="card-price">${selectedApt.price}/mo</span>
                    <div className="card-footer">
                        <Link to="/register-user" className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-sm">
                            Register Account and Buy Contract</Link>
                        <p>By registering an account, you will be purchasing this contract.</p>
                    </div>
            </aside>
            }
        </div>
    </main>
  );
}