// import React from "react";
// import { createRoot } from "react-dom/client";
// import SurveyComponent from "./SurveyComponent";

// const handleSubmit = async (formData) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/rentals/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       alert("Form Submitted! Check your email.");
//     } else {
//       alert("Submission Failed!");
//     }
//   } catch (error) {
//     console.error("Error submitting form:", error);
//   }
// };

// const root = createRoot(document.getElementById("surveyElement"));
// root.render(<SurveyComponent handleSubmit={handleSubmit} />);
