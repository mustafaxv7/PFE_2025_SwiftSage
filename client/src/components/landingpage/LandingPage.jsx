import Navbar from "../layout/Navbar.jsx";
import {FiArrowRight, FiMap, FiAlertTriangle, FiUsers, FiBarChart2} from 'react-icons/fi';

const LandingPage = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col overflow-hidden">
            <Navbar/>
            <header
                className="relative h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div
                        className="absolute top-20 left-10 w-40 h-40 bg-red-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
                    <div
                        className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
                </div>
                <div className="max-w-4xl w-full relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight animate-fadeIn">
                        Transforming Crisis Management with <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Swift Sage</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
                        Harnessing collective intelligence and AI-driven insights for real-time crisis response and
                        decision-making.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                        <a href="#features"
                           className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:from-red-500 hover:to-red-400 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center">
                            Explore Features <FiArrowRight className="ml-2"/>
                        </a>
                        <a href="#contact"
                           className="px-8 py-4 border-2 border-red-500 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-red-500/10 hover:shadow-lg flex items-center justify-center">
                            Contact Us
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-2 bg-gray-400 rounded-full mt-2"></div>
                    </div>
                </div>
            </header>
            <section id="about" className="py-24 px-6 bg-gray-900 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8">
                                <span
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Our Mission</span>
                            </h2>
                            <p className="text-xl text-gray-300 leading-relaxed mb-6">
                                At Swift Sage, we're revolutionizing crisis management through innovative technology and
                                community collaboration.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                Our platform integrates real-time data collection, AI-powered analytics, and
                                crowdsourced intelligence to provide actionable insights during critical situations.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-red-500">
                                    <h3 className="font-bold text-lg mb-2">100K+</h3>
                                    <p className="text-gray-400">Reports Processed</p>
                                </div>
                                <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="font-bold text-lg mb-2">24/7</h3>
                                    <p className="text-gray-400">Real-time Monitoring</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative mt-10 lg:mt-0">
                            <div
                                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 shadow-2xl">
                                <div className="bg-gray-900 rounded-xl overflow-hidden">
                                    <div className="h-8 bg-gray-800 flex items-center px-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="p-6">
                                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                            <div className="flex items-center mb-2">
                                                <div
                                                    className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                                                    <FiAlertTriangle className="text-red-500"/>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">Crisis Alert System</h4>
                                                    <p className="text-sm text-gray-400">Active monitoring dashboard</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gray-800 rounded-lg p-4">
                                                <div
                                                    className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                                                    <FiUsers className="text-blue-500"/>
                                                </div>
                                                <h4 className="font-medium mb-1">Crowdsourcing</h4>
                                                <p className="text-sm text-gray-400">Community-powered data</p>
                                            </div>
                                            <div className="bg-gray-800 rounded-lg p-4">
                                                <div
                                                    className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                                                    <FiBarChart2 className="text-purple-500"/>
                                                </div>
                                                <h4 className="font-medium mb-1">Analytics</h4>
                                                <p className="text-sm text-gray-400">Real-time insights</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="py-24 px-6 bg-gray-800 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Powerful Features</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Designed for efficiency, accuracy, and rapid response in critical situations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Real-Time Crisis Tracking",
                                desc: "Monitor and report crises as they happen with our live alert system.",
                                icon: <FiAlertTriangle className="text-3xl text-red-500"/>,
                                color: "red"
                            },
                            {
                                title: "Crowdsourced Intelligence",
                                desc: "Leverage community reports to build comprehensive situational awareness.",
                                icon: <FiUsers className="text-3xl text-blue-500"/>,
                                color: "blue"
                            },
                            {
                                title: "Interactive Mapping",
                                desc: "Visualize crisis data geographically for better strategic planning.",
                                icon: <FiMap className="text-3xl text-green-500"/>,
                                color: "green"
                            },
                            {
                                title: "AI-Powered Analytics",
                                desc: "Our algorithms process data to predict trends and recommend actions.",
                                icon: <FiBarChart2 className="text-3xl text-purple-500"/>,
                                color: "purple"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`group relative p-8 bg-gray-700/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-${feature.color}-500 overflow-hidden`}
                            >
                                <div
                                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div
                                    className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-500/10 flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-2xl font-bold mb-6">Ready to Transform Your Crisis Response?</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Join organizations worldwide who trust Swift Sage for their critical decision-making needs.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 hover:from-red-500 hover:to-red-400 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center"
                        >
                            Get Started Today
                        </a>
                        <a
                            href="#features"
                            className="px-8 py-4 border-2 border-gray-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-gray-700/30 hover:shadow-lg flex items-center justify-center"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-24 px-6 bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8">
                                <span
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Get In Touch</span>
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Have questions about our platform or interested in a demo? Our team is ready to assist
                                you.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div
                                        className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Email Us</h4>
                                        <p className="text-gray-400">contact@swiftsage.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div
                                        className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Call Us</h4>
                                        <p className="text-gray-400">(+213) 0558720000</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div
                                        className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                                        <p className="text-gray-400">Chlef Center</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <form className="bg-gray-800/50 rounded-xl p-8 shadow-lg border border-gray-700">
                                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-gray-300 mb-2">Email
                                            Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-gray-300 mb-2">Your
                                            Message</label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                            placeholder="Tell us about your needs..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:from-red-500 hover:to-red-400 hover:shadow-xl"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold">
                                <span
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Swift Sage</span>
                            </h3>
                            <p className="text-gray-400 mt-2">Crisis management redefined</p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                          clipRule="evenodd"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                          clipRule="evenodd"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                          clipRule="evenodd"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div
                        className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            © 2025 Swift Sage. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy
                                Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of
                                Service</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;