import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 w-full z-50">

            <div className="flex items-center space-x-3">
                <img src={Logo} alt="Logo" className="w-12 h-12 object-contain" />
                <span className="text-2xl font-bold text-black">Swift Sage</span>
            </div>


            <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
                <a href="#about" className="hover:text-red-700 transition">About</a>
                <a href="#features" className="hover:text-red-700 transition">Features</a>
                <a href="#contact" className="hover:text-red-700 transition">Contact</a>
            </div>

            <Link to="/signup">
                <button className="px-6 py-2 rounded-lg bg-red-700 text-white font-semibold transition-transform duration-300 hover:bg-red-800 hover:scale-105 pointer">
                    Sign Up
                </button>
            </Link>
        </nav>
    );
};

export default Navbar;
