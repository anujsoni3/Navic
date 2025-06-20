const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const RentalProvider = require("./model/RentalProvider");
dotenv.config();



// Import route files
const authRoutes = require('./route/auth');
const metroRoutes = require('./route/metro');
const busRoutes = require('./route/bus')

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["POST", "GET"],         
    credentials: true                 
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


app.use(express.json());

app.use('/api/auth', authRoutes);   // → /api/auth/login, /api/auth/signup
app.use('/api/metro', metroRoutes); // → /api/metro/search, /api/metro/upload-metro
app.use('/api/bus', busRoutes);     // → /api/bus/search, /api/bus/upload-bus

app.get('/', (req, res) => {
    res.send('hey there');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API to get all rental providers
app.get("/rentals", async (req, res) => {
  try {
    const rentals = await RentalProvider.find();
    console.log("Fetched Rentals Data:", JSON.stringify(rentals, null, 2)); // Debugging
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//API to get all chair rental providers
const chairRoutes = require('./route/chair'); // Add this line
app.use('/', chairRoutes); // Mount it



// Rental form submission route
app.post("/api/rental/submit", async (req, res) => {
  try {
    const { name, email, phone, dealerEmail, carModel, license } = req.body;

    if (!dealerEmail) {
      return res.status(400).json({ error: "Dealer email is required" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: dealerEmail,
      subject: "New Rental Request",
      html: `
        <h2>New Rental Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Car Model:</strong> ${carModel}</p>
        <p><strong>License:</strong> <a href="${license}" target="_blank">View License</a></p>
        <hr>
        <p>Please contact the customer for further details.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent to dealer successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
