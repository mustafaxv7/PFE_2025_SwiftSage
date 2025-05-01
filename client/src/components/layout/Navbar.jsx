import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-2" : "bg-white/90 backdrop-blur-sm py-4"} ${isOpen ? "bg-white" : ""}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <img src={Logo} alt="Logo" className="w-12 h-12 object-contain" />
                            <span
                                className="text-2xl font-bold bg-gradient-to-r from-red-700 to-red-500 bg-clip-text text-transparent">
                                Swift Sage
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex space-x-8">
                            <button
                                onClick={() => scrollToSection('about')}
                                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group"
                            >
                                {t('navbar.about')}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection('features')}
                                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group"
                            >
                                {t('navbar.features')}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group"
                            >
                                {t('navbar.contact')}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                            <LanguageSwitcher />
                        </div>
                        <Link
                            to="/login"
                            className="ml-8 px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-sm transition-all duration-300 hover:from-red-500 hover:to-red-400 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {t('navbar.login')}
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none transition duration-150 ease-in-out"
                        >
                            {isOpen ? (
                                <FiX className="h-6 w-6" />
                            ) : (
                                <FiMenu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"}`}
            >
                <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-300"
                    >
                        {t('navbar.about')}
                    </button>
                    <button
                        onClick={() => scrollToSection('features')}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-300"
                    >
                        {t('navbar.features')}
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-300"
                    >
                        {t('navbar.contact')}
                    </button>
                    <div className="px-3 py-2">
                        <LanguageSwitcher mobile />
                    </div>
                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-sm transition-colors duration-300 hover:from-red-500 hover:to-red-400"
                    >
                        {t('navbar.login')}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;