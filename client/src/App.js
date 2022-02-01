import React, { useEffect } from "react";
import "./App.css";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function App() {
  const publicVapidKey =
    "BCq_5OYkg99-NlubT7QVZQyfsRUA9faka7fhK1ICKc61XqZ-7NanRrM12TLlfDOZy1QSgorYIl7VwbxsHiA2USA";

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      send().catch((err) => console.error(err));
    }
    console.log(navigator.serviceWorker.register());
    // Register SW, Register Push, Send Push
    async function send() {
      // Register Service Worker

      console.log("Registering service worker...");
      const register = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      console.log("Service Worker Registered...");

      // Register Push
      console.log("Registering Push...");
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
      console.log("Push Registered...");

      // Send Push Notification
      console.log("Sending Push...");
      await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log("Push Sent...");
    }
  }, []);

  
  return (
    <div className="App">
      <h1>Push Notification</h1>
    </div>
  );
}

export default App;
