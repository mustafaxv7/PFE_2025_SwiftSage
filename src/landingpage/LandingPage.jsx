import Navbar from "../layout/Navbar.jsx";

const LandingPage = () => {
    return (
        <div className="bg-neutral min-h-screen bg-gray-900 text-white">
            <Navbar />


            <header className="h-screen flex flex-col justify-center items-center text-center px-6 ">
                <h1 className="text-5xl font-bold  mb-4">
                    Welcome to <span className="text-primary">Swift Sage</span>
                </h1>
                <p className=" max-w-2xl">
                    Your platform for crisis management, crowdsourcing solutions, and data-driven decision-making.
                </p>
                <a href="#features" className="mt-6 px-6 py-3 bg-primary bg-red-700 text-white rounded-lg transition-transform duration-300 hover:bg-red-800 hover:scale-105">
                    Learn More
                </a>
            </header>


            <section id="about" className="py-20 px-6 text-center ">
                <h2 className="text-3xl font-bold text-primary mb-4">About Us</h2>
                <p className=" max-w-3xl mx-auto">
                    Swift Sage is a platform dedicated to managing crises through a crowdsourcing approach.
                    Our mission is to provide real-time insights and data-driven decisions.
                </p>
            </section>


            <section id="features" className="py-20 px-6 text-center ">
                <h2 className="text-3xl font-bold text-primary mb-4">Features</h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Real-Time Crisis Tracking</h3>
                        <p className="text-gray-300">Monitor and report crises as they happen.</p>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Crowdsourced Data</h3>
                        <p className="text-gray-300">Collect and analyze user-reported data.</p>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Interactive Map</h3>
                        <p className="text-gray-300">Visualize crisis reports on an interactive map.</p>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">Data-Driven Decisions</h3>
                        <p className="text-gray-300">Leverage AI to make smart decisions.</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 text-center ">
                <h2 className="text-3xl font-bold text-primary mb-4">Contact Us</h2>
                <p className=" max-w-3xl mx-auto">
                    Have questions? Reach out to us at <span className="font-semibold">contact@swiftsage.com</span>
                </p>
            </section>
        </div>
    );
};

export default LandingPage;
