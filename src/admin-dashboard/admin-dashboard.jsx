import React from 'react';

export function AdminDashboard() {
  return (
    <main className="flex flex-col items-center min-h-[calc(100vh-4rem)]">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-2 border-gray-300 rounded p-4">
        <div className="lg:col-span-2 p-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Rental Properties</h2>

            <div className="gap-6 p-6">

                <div className="grid-container">
                    <div className="card">
                        <h4 className="card-title">Apt. 101</h4>                    
                            <button className="card-button">View</button>
                    </div>
                    <div className="card">
                        <h4 className="card-title">Apt. 102</h4>                    
                            <button className="card-button">View</button>
                    </div>
                    <div className="card">
                        <h4 className="card-title">Apt. 103</h4>                    
                            <button className="card-button">View</button>
                    </div>
                    <div className="card">
                        <h4 className="card-title">Apt. 104</h4>                    
                            <button className="card-button">View</button>
                    </div>
                    <div className="card card-selected">
                        <h4 className="card-title">Apt. 201</h4>
                            <button className="card-button">View</button>
                    </div>
                    <div className="card">
                        <h4 className="card-title">Apt. 202</h4>                    
                            <button className="card-button">View</button>
                    </div>
                    <div className="card">
                        <h4 className="card-title">Apt. 203</h4>                    
                            <button className="card-button">View</button>
                    </div>
                    <div className="card">
                        <h4 className="card-title">Apt. 204</h4>                    
                            <button className="card-button">View</button>
                    </div>
                </div>
            </div>
            </div>
        <aside className="bg-[#ffffff] p-6 rounded shadow-sm border-gray-300 border top-24 lg:col-span-1">
            <div className="flex w-full bg-[#f1f4f7] rounded mb-4 items-center justify-center">
                <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800" alt="Fancy Apartment" width="50%" className="m-[10px]"></img>
            </div>
                <div className="flex justify-between items-center"> 
                <span className="card-title">Apt. 201</span>
                <span className="text-xl font-bold text-[#0f417a] mb-2">$440/mo</span>
                </div>
                <span className="flex text-xl font-bold justify-center mb-8">Dylan and Bailey</span>
                <div className="card-footer">
                    <p>Rent paid for July: &#9745;</p>
                    <p>Requests: 0</p>
                    <button className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-sm">
                        View Contract</button>
                </div>
        </aside>
    </div>
        </main>
  );
}