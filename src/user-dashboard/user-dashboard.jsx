import React from 'react';

export function UserDashboard() {
  return (
    <main className="flex flex-col items-center pt-16 min-h-[calc(100vh-8.25rem)]">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-24">User Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <section className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6 m-4">
                    <h3>Payment History</h3>
                    <ul className="space-y-3">
                        <li className="p-3 bg-gray-50 border border-gray-200 rounded-md">July $440 &#9745;</li>
                        <li className="p-3 bg-gray-50 border border-gray-200 rounded-md">Aug $440 &#9745;</li>
                        <li className="p-3 bg-gray-50 border border-gray-200 rounded-md">Sep $440 &#9744;</li>
                    </ul>
                    <button className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-sm">
                        Pay Rent</button>
                </section>
                <div className="flex flex-col justify-between p-6 bg-white border border-gray-200 rounded shadow-sm md:col-span-2 p-6">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Apt. 102 <br></br> $440/mo</h2>
                    
                    <div className="flex flex-col gap-2 mt-4">
                        <button className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded shadow-sm text-center">
                            Submit Maintenance Request</button>
                        <button className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded shadow-sm text-center">
                            Sell Contract</button>
                        <button className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded shadow-sm text-center">
                            View Contract</button>
                    </div>
                </div>
            </div>  
        </main>
  );
}