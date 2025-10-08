import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-purple-700 text-white">
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src="./src/assets/logo.png"
                                alt="Saviya Logo"
                                className="w-12 h-12 rounded-xl shadow-lg"
                            />
                            <h2 className="text-2xl font-bold">SAVIYA</h2>
                        </div>
                        <p className="text-sm text-white">
                            Empowering communities by connecting people who want to give with
                            those in need. Together, we create brighter futures.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className=" space-y-2 text-sm">
                            <li>
                                <a href="#" className=" text-white hover:underline hover:text-gray-200">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white  hover:text-gray-200">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white  hover:text-yellow-300">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white  hover:text-yellow-300">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-white  hover:text-yellow-300">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white  hover:text-yellow-300">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white  hover:text-yellow-300">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white  hover:text-yellow-300">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
                        <form className="flex flex-col sm:flex-row gap-2">

                            <button
                                type="submit"
                                className="bg-white text-purple-700 font-semibold px-5 py-3 rounded-lg hover:bg-gray-100 transition"
                            >
                                Subscribe
                            </button>
                        </form>
                        <div className="flex space-x-4 mt-5">
                            <a href="#" className="hover:text-gray-300 text-white">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="hover:text-gray-300 text-white">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="hover:text-gray-300 text-white">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="hover:text-gray-300 text-white">
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 border-t border-white/20 pt-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-200">
                    <p>© {new Date().getFullYear()} SAVIYA. All rights reserved.</p>
                    <p className="mt-3 md:mt-0">
                        Designed with ❤️ by <span className="font-semibold">Team Saviya</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
