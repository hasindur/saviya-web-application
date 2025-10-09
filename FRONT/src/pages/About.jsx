import React from "react";
import Footer from "../components/Footer";
import BgImg from "../assets/child-bg.jpg";

const AboutSection = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-16 px-4 md:px-12 bg-white" id="about">
                <div className="max-w-7xl mx-auto flex flex-col gap-16">
                    <div className="relative bg-black/90 rounded-2xl shadow-2xl p-8 mb-12 overflow-hidden">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60"
                            style={{ backgroundImage: `url(${BgImg})` }}
                        ></div>

                        {/* Overlay for better readability */}
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Content */}
                        <div className="relative z-10 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 py-5">
                                About Saviya
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
                                Our vision is to create a compassionate community where every child, elder, and animal
                                receives the care and support they deserve. Through collaboration, transparency, and
                                dedication, Saviya empowers both sponsors and beneficiaries to make a lasting impact.
                            </p>
                        </div>
                    </div>








                    {/* Paragraph 1 - Left - Organization Introduction */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="md:w-1/2 p-6 rounded-xl bg-purple-700/20 backdrop-blur-lg border border-purple-300/30">
                            <p className="text-gray-900 text-lg leading-relaxed">
                                <span className="font-semibold text-purple-700">Saviya</span> is a
                                non-profit organization committed to helping individuals, families, and
                                communities find the support they need. From children's homes to elder
                                care facilities and animal rescue centers, we connect sponsors who
                                genuinely care with those in need.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
                                alt="Happy children in care home playing together"
                                className="w-full rounded-xl shadow-lg object-cover h-64"
                            />
                        </div>
                    </div>

                    {/* Paragraph 2 - Right - Platform & Location */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-6">
                        <div className="md:w-1/2 p-6 rounded-xl bg-pink-500/20 backdrop-blur-lg border border-pink-200/30">
                            <p className="text-gray-900 text-lg leading-relaxed">
                                Based in Nugegoda, Colombo, Sri Lanka, our platform allows anyone seeking
                                help to locate sponsors easily. Whether it's monetary aid, food, building
                                materials, or essential items, Saviya bridges the gap between those in
                                need and those who want to contribute.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Hands connecting in community support"
                                className="w-full rounded-xl shadow-lg object-cover h-64"
                            />
                        </div>
                    </div>

                    {/* Paragraph 3 - Left - Trust & Impact */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="md:w-1/2 p-6 rounded-xl bg-purple-700/20 backdrop-blur-lg border border-purple-300/30">
                            <p className="text-gray-900 text-lg leading-relaxed">
                                Sponsors can contribute confidently, knowing their support directly
                                impacts lives. We track donations and highlight success stories to
                                inspire more people to join our mission of compassion and care.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.pexels.com/photos/7492989/pexels-photo-7492989.jpeg"
                                alt="Rescued animals receiving care and love"
                                className="w-full rounded-xl shadow-lg object-cover h-64"
                            />
                        </div>
                    </div>

                    {/* Paragraph 4 - Right - Impact & Transformation */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-6">
                        <div className="md:w-1/2 p-6 rounded-xl bg-pink-500/20 backdrop-blur-lg border border-pink-200/30">
                            <p className="text-gray-900 text-lg leading-relaxed">
                                Every contribution matters. By supporting Saviya, you help transform
                                children's lives, bring dignity to elders, and provide care for rescued
                                animals. Together, we create a network of hope and empowerment.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.pexels.com/photos/7474858/pexels-photo-7474858.jpeg"
                                alt="Elderly people enjoying care and companionship"
                                className="w-full rounded-xl shadow-lg object-cover h-64"
                            />
                        </div>
                    </div>

                    {/* Paragraph 5 - Left - Call to Action */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="md:w-1/2 p-6 rounded-xl bg-purple-700/20 backdrop-blur-lg border border-purple-300/30">
                            <p className="text-gray-900 text-lg leading-relaxed">
                                Join us today and be part of a movement that believes in the power of
                                giving. Your support can build homes, feed the hungry, rescue animals,
                                and create a brighter, safer future. At Saviya, compassion meets action.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                                alt="Volunteers working together to help community"
                                className="w-full rounded-xl shadow-lg object-cover h-64"
                            />
                        </div>
                    </div>

                    {/* Additional Impact Statistics Section */}
                    <div className="mt-12 p-8 bg-gradient-to-r from-purple-700/10 to-pink-500/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl">
                        <h3 className="text-2xl font-bold text-purple-700 text-center mb-8">Our Impact</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-purple-700 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-purple-700">50+</div>
                                <div className="text-sm text-gray-600">Care Homes Supported</div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-pink-500 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-pink-500">200+</div>
                                <div className="text-sm text-gray-600">Active Sponsors</div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-purple-700 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-purple-700">1000+</div>
                                <div className="text-sm text-gray-600">Lives Impacted</div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-pink-500 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div className="text-3xl font-bold text-pink-500">LKR 5M+</div>
                                <div className="text-sm text-gray-600">Funds Raised</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutSection;