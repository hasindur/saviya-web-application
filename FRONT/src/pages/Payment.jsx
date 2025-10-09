import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        amount: "",
        goodsAmount: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔴 Check login only on button click
        if (!token) {
            setErrorMsg("❌ You must be logged in first to donate.");
            return;
        }

        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/donations",
                {
                    name: formData.name,
                    email: formData.email,
                    amount: formData.amount,
                    goodsAmount: formData.goodsAmount,
                    message: formData.message,
                    registrationNumber: "ORG001",
                    organizationName: "Sunrise Elder Home",
                    currentNeeds: `Money: ${formData.amount}, Goods: ${formData.goodsAmount}`,
                    receivedItems: "",
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data?.data) {
                setSuccessMsg("🎉 Thank you for your kind donation!");
                setFormData({
                    name: "",
                    email: "",
                    amount: "",
                    goodsAmount: "",
                    message: "",
                });

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.error("Donation Error:", error);
            setErrorMsg(
                error.response?.data?.message ||
                "❌ Failed to submit donation. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-grow flex justify-center items-center py-10 px-4 md:px-6">
                <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden">

                    {/* Left Info Panel */}
                    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 to-pink-500 text-white flex-col justify-center items-center text-center p-8">
                        <img
                            src="/src/assets/logo.png"
                            alt="Saviya Logo"
                            className="w-20 h-20 rounded-2xl shadow-lg mb-4"
                        />
                        <h1 className="text-3xl font-bold mb-4">SAVIYA</h1>
                        <h2 className="text-xl mb-2 font-semibold">Support a Care Home</h2>
                        <p className="max-w-sm text-sm mb-6">
                            Your donation helps care homes provide food, shelter, education,
                            and medical care for those in need.
                        </p>
                        <div className="bg-white/20 rounded-lg p-4 max-w-sm text-sm italic">
                            “Every contribution, big or small, makes a real difference in
                            someone's life.”
                        </div>
                    </div>

                    {/* Donation Form */}
                    <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-gray-50">
                        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <h2 className="text-2xl font-bold text-center">Donate Now</h2>
                                <p className="text-gray-500 text-sm text-center mb-4">
                                    Fill in your details and support a care home in need.
                                </p>

                                {successMsg && (
                                    <p className="text-green-600 font-medium text-center">
                                        {successMsg}
                                    </p>
                                )}
                                {errorMsg && (
                                    <p className="text-red-600 font-medium text-center">
                                        {errorMsg}
                                    </p>
                                )}

                                <div>
                                    <label className="block font-medium mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                        className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">
                                        Donation Amount (Rs.)
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        placeholder="Enter amount"
                                        required
                                        className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">Goods Donation</label>
                                    <input
                                        type="text"
                                        name="goodsAmount"
                                        value={formData.goodsAmount}
                                        onChange={handleChange}
                                        placeholder="Ex: 2 Boxes of Food, 10 Blankets..."
                                        className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Leave a kind message..."
                                        rows="3"
                                        className="w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition disabled:bg-gray-400"
                                >
                                    {loading ? "Submitting..." : "Donate Now"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Payment;
