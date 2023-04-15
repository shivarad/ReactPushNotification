const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app=express();

//app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(bodyParser.json());

const publicVapidKey='BCq_5OYkg99-NlubT7QVZQyfsRUA9faka7fhK1ICKc61XqZ-7NanRrM12TLlfDOZy1QSgorYIl7VwbxsHiA2USA';
const privateVapidKey='jeHAA63fO3mXMM9HAn4QVzUBrl8LPdVGw3ZhoUuMZSs';
webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);

app.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
  
    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });
  
  const port = process.env.PORT||5000;
  
  app.listen(port, () => console.log(`Server started on port ${port}`));