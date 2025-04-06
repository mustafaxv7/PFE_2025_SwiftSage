import { useState } from "react";
import AuthInput from "./AuthInput";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null,
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear errors when user starts typing
        if (status.error) {
            setStatus(prev => ({ ...prev, error: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });
    
        try {
            const response = await fetch("http://localhost:5030/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
                localStorage.setItem("token", data.token);
                localStorage.setItem("userRole", data.userRole); // store the role in localStorage
    
                // Redirect user based on role
                setTimeout(() => {
                    if (data.userRole === "admin") {
                        navigate("/admin/dashboard");
                    } else {
                        navigate("/dashboard/my-reports");
                    }
                }, 1500);  // Delay to ensure localStorage is updated
            } else {
                setStatus({ 
                    loading: false, 
                    success: false, 
                    error: data.message || "Login failed. Please try again." 
                });
            }
        } catch (error) {
            setStatus({ 
                loading: false, 
                success: false, 
                error: "Network error. Please check your connection." 
            });
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg relative">
                {/* Success Message Overlay */}
                {status.success && (
                    <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center rounded-xl z-10 p-6">
                        <FiCheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h3>
                        <p className="text-gray-600 mb-6">You're being redirected to your dashboard</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                )}

                <div className="text-center">
                    <Link to="/" className="flex justify-center mb-6">
                        <div className="flex items-center space-x-3">
                            <img 
                                src={Logo} 
                                alt="Swift Sage Logo" 
                                className="w-12 h-12 object-contain"
                            />
                            <span className="text-2xl font-bold bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent">
                                Swift Sage
                            </span>
                        </div>
                    </Link>
                    
                    <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                        >
                            create a new account
                        </button>
                    </p>
                </div>
                
                {/* Error Message */}
                {status.error && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FiAlertCircle className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    {status.error}
                                </h3>
                            </div>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <AuthInput
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            disabled={status.loading}
                        />

                        <AuthInput
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            disabled={status.loading}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                disabled={status.loading}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                                disabled={status.loading}
                            >
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out ${
                                status.loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                            }`}
                            disabled={status.loading}
                        >
                            {status.loading ? (
                                <>
                                    <FiLoader className="animate-spin h-5 w-5 mr-2" />
                                    Processing...
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
