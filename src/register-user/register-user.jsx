import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function RegisterUser({ accounts, onRegisterSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleRegister(e) {
    e.preventDefault()
    setError('')

    const foundUser = Object.values(accounts).find(
        (acnt) => acnt.email.toLowerCase() === email.toLowerCase()
    )

    if (!foundUser) {
        onRegisterSuccess({id: `user_${Date.now()}`, email: email, password: password, role: "User"})
        navigate('/user-dashboard')
    } else {
        setError('An account already exists with this email. Please try a different email.')
    }
  }



  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">Register User</h1>
            <section className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6 m-4">
                <p className="text-2xl font-bold tracking-tight text-gray-900 text-wrap text-center">You are creating an account and purchasing the contract <br></br> for Apt. 102 with rent of $440/mo!</p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <h4 className="text-center text-xl font-bold">Register</h4>
                    
                    {error && <p className="text-red-600 text-center">{error}</p>}
                    
                    <div>
                        <span className="text-left">Email</span>
                        <input className="w-full border border-gray-300 rounded px-3 py-2"
                        type="email" 
                        placeholder="your@email.com" 
                        onClick={() => setError('')}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                    </div>
                    <div>
                        <span className="text-left">Password</span>
                        <input className="w-full border border-gray-300 rounded px-3 py-2"
                        type="password" 
                        placeholder="password" 
                        onClick={() => setError('')}
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                    </div>
                    <button type="submit" className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out shadow-sm">
                        Create Account and Buy Contract</button>
                </form>
            </section>
        </main>
  );
}