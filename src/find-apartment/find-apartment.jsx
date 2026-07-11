import React from 'react';

export function FindApartment() {
  return (
    <main className="flex flex-col items-center pt-16 min-h-[calc(100vh-8.25rem)]">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-24">
                Find an Apartment</h1>
            
            <div className="text-center">
                
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Available Listings:</h2>

                <p>Note: The average housing cost in Provo is: [API CALL]</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-2 border-gray-300 rounded p-4">
                    <div className="card">
                        <h4 className="card-title">Apt. 101</h4>
                        <div className="card-footer">
                            <p>Some information about the apartment</p>
                            <p>- 3 roommates </p>
                            <p>- In-unit washer/dryer </p>
                            <p>- Dope apartment </p>
                            <p> That's all</p>
                        <span className="card-price">$440/mo</span>
                        <button className="card-button">View</button>
                        </div>
                    </div>
                    <div className="card" style={{backgroundColor: '#f2f5f8', borderColor: '#626364' }}>
                        <h4 className="card-title">Apt. 102</h4>
                        <div className="card-footer">
                            <p>Stuff about THIS apartment</p>
                            <p>- 2 roommates </p>
                            <p>- Free donkey </p>
                            <p>- Also dope </p>
                        <span className="card-price">$440/mo</span>
                        <button className="card-button">View</button>
                        </div>
                    </div>
                </div>
            
            <aside className="bg-[#ffffff] p-6 rounded shadow-sm border-gray-300 border top-24 lg:col-span-1">
                <div className="flex w-full bg-[#f1f4f7] rounded mb-4 items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800" alt="Fancy Apartment" width="50%" className="m-[10px]"></img>
                </div>
                    <h2 className="card-title">Become a Tenant</h2>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Apt. 102</h3>
                    <span className="card-price">$440/mo</span>
                    <div className="card-footer">
                        <a href="register-user.html" className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-sm"
                            style={{color:'#ffffff'}}>
                            Register Account and Buy Contract</a>
                        <p>By registering an account, you will be purchasing this contract.</p>
                    </div>
            </aside>
        </div>
        </main>
  );
}