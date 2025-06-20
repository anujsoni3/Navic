import './App.css';
import { Routes, Route } from 'react-router-dom';
import Rentals from "./pages/Rentals";
import SurveyComponent from "./pages/form/SurveyComponent";
import HomePage from "./components/HomePage";
import Check_Rentals from "./components/Check_Rentals";
import Login from "./components/Login";
import Regsitration from './components/Registartion';
import Chairs from './pages/Chairs';
function App() {
  return (
    <div style={{ backgroundColor: '#2cc295' }} className="min-h-screen w-full">
      
     

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Check_Rentals" element={<Check_Rentals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regsitration />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/form" element={<SurveyComponent />} />
        <Route path="/chairs" element={<Chairs />} />

      
      
      </Routes>
    </div>
  );
}

export default App;
