import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landingpage/LandingPage";
import SignupForm from "./components/auth/SignupForm";
import LoginForm from "./components/auth/LoginForm.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm/>} />

            </Routes>
        </Router>
    );
}

export default App;
