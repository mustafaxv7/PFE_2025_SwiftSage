import { useState } from "react";
import AuthInput from "./AuthInput";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const SignupForm = () => {
    const navigate = useNavigate();
    const [isOrganization, setIsOrganization] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        type: "public",
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
            const response = await fetch("http://localhost:5030/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Signup successful:", data);
                navigate("/login");
            } else {
                console.error("Signup failed:", data.message);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                {/* Centered Logo linking to homepage */}
                <Link to="/" className="flex justify-center">
                    <div className="flex items-center space-x-3">
                        <img 
                            src={Logo} 
                            alt="Swift Sage Logo" 
                            className="w-12 h-12 object-contain"
                        />
                        <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                            Swift Sage
                        </span>
                    </div>
                </Link>
                
                {/* Centered Title and subtitle */}
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Join our platform to manage crises effectively
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-lg rounded-xl sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AuthInput 
                            label={isOrganization ? "Organization Name" : "Full Name"} 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange} 
                            required 
                            placeholder={isOrganization ? "Acme Inc." : "John Doe"}
                        />
                        <AuthInput 
                            label={isOrganization ? "Organization Email" : "Email Address"} 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange} 
                            required 
                            placeholder={isOrganization ? "contact@organization.com" : "you@example.com"}
                        />
                        <AuthInput 
                            label="Phone Number" 
                            type="tel" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange} 
                            required 
                            placeholder="+1 (555) 123-4567"
                        />

                        {isOrganization && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Organization Type
                                </label>
                                <div className="flex space-x-6">
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value="public" 
                                            checked={formData.type === "public"}
                                            onChange={handleChange} 
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300" 
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Public</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            name="type" 
                                            value="private" 
                                            checked={formData.type === "private"}
                                            onChange={handleChange} 
                                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300" 
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Private</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        <AuthInput 
                            label="Password" 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange} 
                            required 
                            placeholder="••••••••"
                        />

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isOrganization}
                                onChange={() => setIsOrganization(!isOrganization)}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Are you registering as an organization?
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the <a href="#" className="text-red-600 hover:underline">Terms</a> and <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="font-medium text-red-600 hover:text-red-500 hover:underline"
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;