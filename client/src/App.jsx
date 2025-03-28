import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import Dashboard from "./components/dashboard/Dashboard";
import AddReport from "./components/dashboard/AddReport";
import MyReports from "./components/dashboard/MyReports";
import LandingPage from "./components//landingpage/LandingPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path={"/login"} element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="add-report" element={<AddReport />} />
                    <Route path="my-reports" element={<MyReports />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
