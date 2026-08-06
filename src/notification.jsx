import React, { useState, useEffect, useRef } from 'react';
import { DashEvent, DashNotifier } from './dashNotifier';
import './app.css';

export function Notification() {

  const [event, setEvent] = React.useState()
  const [animationKey, setAnimationKey] = useState(1)
  const timerRef = useRef(null)

  React.useEffect(() => {
    DashNotifier.addHandler(handleDashEvent);

    return () => {
      DashNotifier.removeHandler(handleDashEvent)
      if (timerRef.current) clearTimeout(timerRef.current)
    };
  }, []);

  function handleDashEvent(event) {
    if (event.type !== DashEvent.UserNoti) return;

    console.log("Successful event:", event)
    setEvent(event);

    setAnimationKey((prev) => prev + 1)

    // Set notifications to only last 10 seconds
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setEvent(undefined);
    }, 10000);
  }

  if (!event) return null
  return (
    <div id="notification-container">
        <div className="notification-content">
            <div className="flex justify-between items-center w-full">
                <h3 className="font-bold">Notification</h3>
            </div>
            <p>{event.value}</p>
        </div>
        <div className="w-full bg-gray-200 h-1">
            <div key={animationKey} className="progress-bar" />
        </div>
    </div>
  )
}