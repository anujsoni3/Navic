
// SurveyComponent.jsx
import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "../../styles/survey-theme.css";

import { themeJson } from "./theme";
import "./index.css";
import { json } from "./json";
import { useLocation } from "react-router-dom";
function SurveyComponent() {
    const location = useLocation();
    const survey = new Model(json);
    survey.applyTheme(themeJson);
    console.log("🚀 location.state:", location.state);
    const handleSubmit = async (surveyData) => {
        console.log("Raw Survey Data:", surveyData);

        const formattedData = {
            name: surveyData["lessee-full-name"] || "",
            email: surveyData["lessee-email"] || "",
            phone: surveyData["lessee-phone"] || "",
            dealerEmail: location.state?.dealerEmail || "", 
            carModel: location.state?.carModel || "", 
            license: surveyData["lessee-driving-license-photo"] || "",
            pickupDate: surveyData["pick-up-date"]?.date || "",
            dropoffDate: surveyData["drop-off-date"]?.date || "",
        };
        console.log("Formatted Data:", formattedData);
        try {
            const response = await fetch("http://localhost:5000/api/rentals/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                alert("Form Submitted! Check your email.");
            } else {
                const errorMessage = await response.text();
                console.error("Server Error:", errorMessage);
                alert("Submission Failed: " + errorMessage);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        }
    };
    survey.onComplete.add((sender) => {
        const formData = sender.data;
        console.log("Survey Data Submitted:", formData);
        handleSubmit(formData);
    });
    return <Survey model={survey} />;
}
export default SurveyComponent;