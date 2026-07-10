import React from 'react';
import './output-r1.css';
import './app.css';

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
                    <li><a href="index.html">Login</a></li>
                    <li><a href="find-apartment.html">Find an Apartment</a></li>
                </menu>
            </nav>
        </header>

        <main>App will display here</main>

        <footer>
            <hr />
            <span>© 2026 [Dylan Steenhoek]. This website was created strictly for educational purposes as a school project. All external media, fonts, and images are used under Fair Use for academic evaluation.</span>
            <br />
            <a href="https://github.com/dylanexists/startup">GitHub</a>
        </footer>
    </div>
  );
}