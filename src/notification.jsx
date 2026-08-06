import React, { useState } from 'react';
import { DashEvent, DashNotifier } from './dashNotifier';
import './app.css';

export function Notification() {

  const [event, setEvent] = React.useState();

  React.useEffect(() => {
    DashNotifier.addHandler(handleDashEvent);

    return () => {
      DashNotifier.removeHandler(handleDashEvent);
    };
  });

  function handleDashEvent(event) {
    console.log("Successful event:", event)
    setEvent(event);
  }

  if (!event) return null
  return (
    <div id="notification-container">
        <div className="notification-content">
            <div className="flex justify-between items-center w-full">
                <h3 className="font-bold">Notification</h3>
                <button 
                    className="text-gray-900 hover:text-[#9e9e9e] font-bold text-right">
                    ✕ Close
                </button>
            </div>
            <h4>Placeholder</h4>
            <p>la la la la la la la laaa</p>
        </div>
    </div>
  )
}