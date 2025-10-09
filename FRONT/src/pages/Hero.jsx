import React from "react";
import BgImg from "../assets/child-bg.jpg";
import { useNavigate } from "react-router-dom";
import { UserPlus, Home } from "lucide-react";

export default function Hero() {
    const navigate = useNavigate();
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                {/* Main Hero Content */}
                <div className="mb-16 p-8 relative bg-black/99 backdrop-blur-lg border border-purple-300/30 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Background Layer */}
                    <div
                        className="absolute inset-0 bg-no-repeat opacity-50"
                        style={{
                            backgroundImage: `url(${BgImg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 text-center text-amber-50">
                        <h1 className="text-6xl md:text-7xl font-bold mb-6  bg-clip-text  ">
                            Connecting Hearts,
                            <br />
                            Changing Lives
                        </h1>

                        <p className="text-xl md:text-2xl mb-8 text-amber-50 max-w-3xl mx-auto leading-relaxed font-semibold">
                            Saviya empowers care homes and charitable organizations to connect with compassionate sponsors.
                            If any beneficiaries or charity homes are in need of support, they can reach out to the Saviya team
                            via email, phone, or message. Our team will review their request and create a dedicated post on the platform
                            to help them receive the assistance they deserve.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Become a Sponsor Button */}
                            <button
                                className="flex items-center rounded-2xl gap-3 px-8 py-4 bg-gradient-to-r from-purple-700 to-purple-800 text-white font-semibold text-lg hover:from-purple-800 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                onClick={() => navigate("/signup")}
                            >
                                <UserPlus className="w-6 h-6" />
                                Become a Sponsor
                            </button>

                            {/* Explore Care Homes Button */}
                            <button
                                onClick={() => navigate("/organization")}
                                className="flex items-center  gap-3 px-8 py-4 bg-white/40 backdrop-blur-sm border border-purple-300 text-purple-700 rounded-2xl font-semibold text-lg hover:bg-purple-700 hover:text-white hover:border-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <Home className="w-6 h-6" />
                                Explore Care Homes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Mission Card */}
                    <div className="p-8 bg-purple-700/20 backdrop-blur-lg border border-purple-300/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-center w-16 h-16 bg-purple-700 rounded-full mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-purple-700 mb-4">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                            To create meaningful connections between compassionate sponsors and those in need,
                            ensuring transparent and direct support reaches children's homes, elder care facilities,
                            and animal rescue centers across Sri Lanka.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="p-8 bg-pink-500/20 backdrop-blur-lg border border-pink-300/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-center w-16 h-16 bg-pink-500 rounded-full mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-pink-600 mb-4">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            A Sri Lanka where every vulnerable individual - from children to elders to rescued animals -
                            has access to the care, dignity, and support they deserve through a network of
                            empowered communities and generous hearts.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
                    <div className="p-6 bg-white/30 backdrop-blur-sm border border-purple-200/50 rounded-xl text-center">
                        <div className="text-3xl font-bold text-purple-700 mb-2">50+</div>
                        <div className="text-sm text-gray-600">Care Homes</div>
                    </div>
                    <div className="p-6 bg-white/30 backdrop-blur-sm border border-purple-200/50 rounded-xl text-center">
                        <div className="text-3xl font-bold text-purple-700 mb-2">200+</div>
                        <div className="text-sm text-gray-600">Active Sponsors</div>
                    </div>
                    <div className="p-6 bg-white/30 backdrop-blur-sm border border-purple-200/50 rounded-xl text-center">
                        <div className="text-3xl font-bold text-purple-700 mb-2">1000+</div>
                        <div className="text-sm text-gray-600">Lives Impacted</div>
                    </div>
                    <div className="p-6 bg-white/30 backdrop-blur-sm border border-purple-200/50 rounded-xl text-center">
                        <div className="text-3xl font-bold text-purple-700 mb-2">LKR 5M+</div>
                        <div className="text-sm text-gray-600">Funds Raised</div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}