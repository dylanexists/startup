import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HUD_TOKEN = import.meta.env.VITE_HUD_API_TOKEN


export function FindApartment({ availableApartments }) {
  const [selectedApt, setSelectedApt] = useState(null)
  const [rentalData, setRentalData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const UTAH_COUNTY_ID = "4904999999"

  useEffect(() => {
    const controller = new AbortController() //AI suggests using an AbortController in case a user leaves mid-APIcall

    async function fetchRentalData() {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch(`https://www.huduser.gov/hudapi/public/fmr/data/${UTAH_COUNTY_ID}`, {
            headers: {
                'Authorization': `Bearer ${HUD_TOKEN}`,
                'Content-Type': 'application/json'
                },
                signal: controller.signal
            });

            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const rentalDataREST = await response.json()

            if(rentalDataREST?.data?.basicdata){
                const oneBedroomData = rentalDataREST.data.basicdata["One-Bedroom"]
                setRentalData(oneBedroomData)
            } else {
                throw new Error("Unexpected data structure fetched from API")
            }

        } catch (error) {
            if (error.name !== "AbortError") {
                console.error("Fetch error:", error)
                setError("Error loading HUD.gov housing data!")
            }
        } finally {
            setLoading(false)
        }
    }

    fetchRentalData()

    return () => controller.abort()
  }, [])
  

  return (
    <main className="flex flex-col items-center pt-16 min-h-[calc(100vh-8.25rem)]">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-24">
            Find an Apartment</h1>
        
        <div className="text-center">
            
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Available Listings:</h2>
            
            {loading ? (
                <h3 className="text-xl font-normal tracking-tight text-gray-900">Loading HUD.gov housing data...</h3>
            ) : error ? (
                <>
                <h3 className="text-xl font-normal tracking-tight text-red-600">{error}</h3>
                <p>Sorry about that! Just know that RentItBest has great deals, choose an apartment below!</p>
                </>
            ) : (
                <>
                <h3 className="text-xl font-bold tracking-tight text-gray-900">Average One-Bedroom in Utah County: ${rentalData}/mo</h3>
                <p>(According to the US Government's Department of Housing and Development)</p>
                <p>Look below to see the better deals RentItBest has to offer!</p>
                </>
            )}

            

            {availableApartments.length === 0 ? (
              // Display this clean placeholder if everything is taken
              <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">
                      All apartments are currently occupied!
                  </p>
              </div>
          ) : (
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
          )}
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
                        <Link to="/register-user"
                        onClick={() => {localStorage.setItem('pendingApartment', JSON.stringify(selectedApt))}}
                        className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-sm">
                            Register Account and Buy Contract</Link>
                        <p>By registering an account, you will be purchasing this contract.</p>
                    </div>
            </aside>
            }
        </div>
    </main>
  );
}