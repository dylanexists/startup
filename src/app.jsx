import React from 'react';
import './output-r1.css';
import './app.css';
import { FindApartment } from './find-apartment/find-apartment';
import { Login } from './login/login';
import { RegisterUser } from './register-user/register-user';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

export default function App() {
  return (
    
    <div className="body bg-dark text-light">
        <header class="flex items-center px-8 py-4">
            <a href="index.html" class="block shrink-0">
            <img src="/free-house-icon.png" alt="Logo" class="h-auto max-h-[50px] w-auto object-contain"></img>
            </a>
            <h1 class="text-4xl font-bold tracking-tight text-gray-900">
                RentItBest</h1>
            <nav class="ml-auto">
                <menu class="flex justify-end items-center gap-4">
                    <li><NavLink to="">Login</NavLink></li>
                    <li><NavLink to="find-apartment">Find an Apartment</NavLink></li>
                </menu>
            </nav>
        </header>

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/find-apartment' element={<FindApartment />} />
            <Route path='/register-user' element={<RegisterUser />} />
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/user-dashboard' element={<UserDashboard />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
            <hr />
            <span>© 2026 [Dylan Steenhoek]. This website was created strictly for educational purposes as a school project. All external media, fonts, and images are used under Fair Use for academic evaluation.</span>
            <br />
            <a href="https://github.com/dylanexists/startup">GitHub</a>
        </footer>
    </div>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}