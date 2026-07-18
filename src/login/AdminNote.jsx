import React, { useState } from 'react';
import '../app.css';

export default function AdminNote() {
  const [isNoteVisible, setIsNoteVisible] = useState(() => {
    const savedState = localStorage.getItem('isAdminNoteClosed')
    return savedState !== 'true';
  });

  const handleCloseNote = () => {
    setIsNoteVisible(false)
    localStorage.setItem('isAdminNoteClosed', 'true')
  };

  if (!isNoteVisible) return null

  return (
    <div id="notification-container">
        <div className="notification-content">
            <div className="flex justify-between items-center w-full">
                <h3 className="font-bold">Admin Note</h3>
                <button 
                    onClick={handleCloseNote}
                    className="text-gray-900 hover:text-[#9e9e9e] font-bold text-right">
                    ✕ Close
                </button>
            </div>
            <h4>You can register an account, but new accounts will never be admin. If you wish to test pre-existing accounts:</h4>
            <p>Pre-existing User: user@email.com | Password: user</p>
            <p>Pre-existing Admin: admin@email.com | Password: admin</p>
        </div>
    </div>
  )
}