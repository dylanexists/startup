import React from 'react';

export function Login() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                Welcome to RentItBest</h1>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                The Best Rental Solution for Tenants and Landlords Alike</h2>
            <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800" alt="Fancy Apartment" className="max-w-xs m-[10px]"></img>
            <section className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">
                <form method="get" className="space-y-4">
                    <h4 className="text-center text-xl font-bold">Login</h4>
                    <div>
                        <span className="text-left">Email</span>
                        <input className="w-full border border-gray-300 rounded px-3 py-2"
                        type="text" placeholder="your@email.com" required/>
                    </div>
                    <div>
                        <span className="text-left">Password</span>
                        <input className="w-full border border-gray-300 rounded px-3 py-2"
                        type="password" placeholder="password" required/>
                    </div>
                    <div  className="text-center">
                    <button type="submit" formaction="user-dashboard.html" className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md shadow-sm m-2">
                        Login as User</button>
                    <button type="submit" formaction="admin-dashboard.html" className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md shadow-sm m-2">
                        Login as Admin</button>
                    </div>
                </form>
                <div className="text-center">
                    <h4 className="m-4">Don't have an account/apartment?</h4>
                    <a href="find-apartment.html" className="bg-[#f2f5f8] hover:bg-[#f5f5f8] font-semibold py-2 px-6 rounded-md shadow-sm"
                            >Come find an apartment!</a>
                </div>
                <br></br>
            </section>
        </main>
  );
}