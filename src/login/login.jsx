import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Login({ accounts, onLoginSuccess, onAutoLogout }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    onAutoLogout()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const foundUser = Object.values(accounts).find(
        (acnt) => acnt.email.toLowerCase() === email.toLowerCase() && acnt.password === password
    )

    if (foundUser) {
        onLoginSuccess(foundUser)
        if (foundUser.role === 'Admin') {
            navigate('/admin-dashboard')
        } else {
            navigate('/user-dashboard')
        }
    } else {
        setError('Invalid email or password')
    }
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen py-12">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                Welcome to RentItBest</h1>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                The Best Rental Solution for Tenants and Landlords Alike</h2>
            <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800" alt="Fancy Apartment" className="max-w-xs m-[10px]"></img>
            <section className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="text-center text-xl font-bold">Login</h4>

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
                    <div  className="text-center">
                    <button type="submit" className="bg-[#0f417a] hover:bg-[#0a2f58] text-white font-semibold py-2 px-6 rounded-md shadow-sm m-2">
                        Login
                    </button>
                    </div>
                </form>

                <div className="text-center">
                    <h4 className="m-4">Don't have an account/apartment?</h4>
                    <Link to="/find-apartment" className="bg-[#f2f5f8] hover:bg-[#f5f5f8] font-semibold py-2 px-6 rounded-md shadow-sm"
                            >Come find an apartment!</Link>
                </div>
                <br></br>
            </section>
        </main>
  );
}