import { useState } from "react";
import AuthInput from "./AuthInput";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

const SignupForm = () => {
    const navigate = useNavigate();
    const [isOrganization, setIsOrganization] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        type: "public",
        community: "",
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
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
            const response = await fetch("http://localhost:5030/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
                // Show success message before redirect
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setStatus({
                    loading: false,
                    success: false,
                    error: data.message || "Registration failed. Please try again."
                });
            }
        } catch (error) {
            setStatus({
                loading: false,
                success: false,
                error: "Network error. Please check your connection."
            });
            console.error("Error signing up:", error);
        }
    };

    // Placeholder text based on account type
    const getPlaceholder = (field) => {
        const placeholders = {
            name: isOrganization ? "Acme Inc." : "John Doe",
            email: isOrganization ? "contact@organization.com" : "you@example.com",
            phone: "+1 (555) 123-4567",
            password: "••••••••"
        };
        return placeholders[field];
    };
    const getLabel = (field) => {
        const labels = {
            name: isOrganization ? "Organization Name" : "Full Name",
            email: isOrganization ? "Organization Email" : "Email Address",
            phone: "Phone Number",
            password: "Password"
        };
        return labels[field];
    };

    const inputFields = [
        { name: "name", type: "text" },
        { name: "email", type: "email" },
        { name: "phone", type: "tel" },
        { name: "password", type: "password" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
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
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Join our platform to manage crises effectively
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-lg rounded-xl sm:px-10 relative">
                    {status.success && (
                        <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center rounded-xl z-10 p-6">
                            <FiCheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                            <p className="text-gray-600 mb-6">You're being redirected to login page</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    )}
                    {status.error && (
                        <div className="rounded-md bg-red-50 p-4 mb-6">
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {inputFields.map((field) => (
                            <AuthInput
                                key={field.name}
                                label={getLabel(field.name)}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                                placeholder={getPlaceholder(field.name)}
                                disabled={status.loading}
                            />
                        ))}
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Community
                            </label>
                            <select
                                name="community"
                                value={formData.community}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-gray-300"
                                required
                                disabled={status.loading}
                            >
                                <option value="">Select your community</option>
                                <option value="Chlef Chlef">Chlef Chlef</option>
                                <option value="Ténès">Ténès</option>
                                <option value="Beni Haoua">Beni Haoua</option>
                                <option value="Ouled Fares">Ouled Fares</option>
                                <option value="Boukadir">Boukadir</option>
                                <option value="Zeboudja">Zeboudja</option>
                                <option value="Abou El Hassan">Abou El Hassan</option>
                                <option value="El Karimia">El Karimia</option>
                                <option value="Taougrite">Taougrite</option>
                                <option value="Beni Rached">Beni Rached</option>
                            </select>
                        </div>
                        {isOrganization && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Organization Type
                                </label>
                                <div className="flex space-x-6">
                                    {["public", "private"].map((type) => (
                                        <label key={type} className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="type"
                                                value={type}
                                                checked={formData.type === type}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                                disabled={status.loading}
                                            />
                                            <span className="ml-2 text-sm text-gray-700 capitalize">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isOrganization"
                                checked={isOrganization}
                                onChange={() => setIsOrganization(!isOrganization)}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                disabled={status.loading}
                            />
                            <label htmlFor="isOrganization" className="ml-2 block text-sm text-gray-700">
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
                                disabled={status.loading}
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the <a href="#" className="text-red-600 hover:underline">Terms</a> and <a
                                href="#" className="text-red-600 hover:underline">Privacy Policy</a>
                            </label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${
                                    status.loading
                                        ? 'bg-gray-400 cursor-not-allowed focus:ring-gray-400'
                                        : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 focus:ring-red-500'
                                }`}
                                disabled={status.loading}
                            >
                                {status.loading ? (
                                    <>
                                        <FiLoader className="animate-spin h-5 w-5 mr-2" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className={`font-medium text-red-600 hover:text-red-500 hover:underline ${
                                    status.loading ? 'pointer-events-none opacity-50' : ''
                                }`}
                                disabled={status.loading}
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