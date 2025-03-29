import { useState } from "react";
import AuthInput from "./AuthInput";
import { useNavigate } from "react-router-dom";



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
        <div className="max-w-sm mx-auto p-5 bg-white rounded-lg shadow-md mt-10 mb-10">
            <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                {!isOrganization ? (
                    <>
                        <AuthInput label="Full Name" type="text" name="name" value={formData.name}
                                   onChange={handleChange} required />
                        <AuthInput label="Email" type="email" name="email" value={formData.email}
                                   onChange={handleChange} required />
                        <AuthInput label="Phone Number" type="text" name="phone" value={formData.phone}
                                   onChange={handleChange} required />
                    </>
                ) : (
                    <>
                        <AuthInput label="Organization Name" type="text" name="name" value={formData.name}
                                   onChange={handleChange} required />
                        <AuthInput label="Organization Email" type="email" name="email" value={formData.email}
                                   onChange={handleChange} required />
                        <AuthInput label="Phone Number" type="text" name="phone" value={formData.phone}
                                   onChange={handleChange} required />
                        <div className="flex space-x-6">
                            <label className="flex items-center">
                                <input type="radio" name="type" value="public" checked={formData.type === "public"}
                                       onChange={handleChange} className="w-4 h-4 mr-2" />
                                <span className="text-sm text-gray-700">Public</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="type" value="private" checked={formData.type === "private"}
                                       onChange={handleChange} className="w-4 h-4 mr-2" />
                                <span className="text-sm text-gray-700">Private</span>
                            </label>
                        </div>
                    </>
                )}

                <AuthInput label="Password" type="password" name="password" value={formData.password}
                           onChange={handleChange} required />

                <div className="flex items-center">
                    <input type="checkbox" checked={isOrganization} onChange={() => setIsOrganization(!isOrganization)}
                           className="w-4 h-4 mr-2" />
                    <label className="text-sm text-gray-700">Are you an organization?</label>
                </div>

                <button type="submit"
                        className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
                    Sign Up
                </button>
            </form>


            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-red-600 hover:underline"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
