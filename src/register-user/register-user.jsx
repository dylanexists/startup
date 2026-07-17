import React from 'react';
import { Link } from 'react-router-dom';

export function RegisterUser({ onRegisterSuccess }) {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">Register User</h1>
            <section className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6 m-4">
                <p className="text-2xl font-bold tracking-tight text-gray-900 text-wrap text-center">You are creating an account and purchasing the contract <br></br> for Apt. 102 with rent of $440/mo!</p>

                <form method="get" className="space-y-4">
                    <h4 className="text-center text-xl font-bold">Register</h4>
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
                    <Link to="/user-dashboard" className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-sm">
                        Create Account and Buy Contract</Link>
                </form>
            </section>
        </main>
  );
}