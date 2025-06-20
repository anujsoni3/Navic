const nodemailer = require("nodemailer");
//const dealerEmailMap = require("../utils/dealerEmailMap");

const handleRentalForm = async (req, res) => {
  try {
    const { name, carModel,dealerEmail, license } = req.body;
    const email = req.body.email?.trim() || "Not provided";
    const phone = req.body.phone?.trim() || "Not provided";
    //const dealerEmail = dealerEmailMap[carModel];

    if (!dealerEmail) {
      return res.status(404).json({ error: "Dealer email not found for selected car model" });
    }

    // Validate license URL (basic check)
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    };
    const licenseUrl = isValidUrl(license) ? `<a href="${license}" target="_blank">View License</a>` : "Invalid URL";

    console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS ? "Exists" : "Not Set");
    console.log("Dealer Email:", dealerEmail);
    if (!dealerEmail || !dealerEmail.trim()) {
        return res.status(400).json({ error: "Dealer email is required" });
      }
      

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    transporter.verify((error, success) => {
        if (error) {
          console.error("SMTP Connection Error:", error);
        } else {
          console.log("SMTP Ready:", success);
        }
      });
    // Email Content
    const mailOptions = {
      from: `"Car Rentals" <${process.env.EMAIL_USER}>`,
      to: dealerEmail,
      subject: `New Rental Request for ${carModel}`,
      html: `
        <h2>New Rental Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Car Model:</strong> ${carModel}</p>
        <p><strong>License:</strong> ${licenseUrl}</p>
        <hr>
        <p>Please contact the customer for further details.</p>
      `,
    };
    console.log("Sending email to:", dealerEmail);
    // Send Email
    
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to dealer for ${carModel} → ${dealerEmail}`);
    res.status(200).json({ message: "Email sent to dealer successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { handleRentalForm };
