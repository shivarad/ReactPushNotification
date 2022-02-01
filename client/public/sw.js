// push notification listener
self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
      body: "Notification is here!",
      icon: ""
    });
  });
  