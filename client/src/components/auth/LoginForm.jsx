import { useState } from "react";
import AuthInput from "./AuthInput";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5030/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            data.token = undefined;

            if (response.ok) {
                console.log("Login successful:", data);

                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                console.error("Login failed:", data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };


    return (
        <div className="max-w-sm mx-auto p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <AuthInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <AuthInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600 cursor-pointer hover:underline">
                        Forgot password?
                    </span>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                    Log In
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-red-600 hover:underline"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
