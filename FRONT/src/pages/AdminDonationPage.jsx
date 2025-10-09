// src/pages/AdminDonationPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDonationPage() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/donations");
                if (res.data.success) {
                    setDonations(res.data.data);
                } else {
                    setErrorMsg("Failed to load donations.");
                }
            } catch (err) {
                console.error("Error fetching donations:", err);
                setErrorMsg("Failed to load donation data from server.");
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-purple-800">
                Admin Donation Dashboard
            </h1>

            {loading && <p>Loading donations...</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            {!loading && donations.length === 0 && (
                <p>No donations found in the database.</p>
            )}

            {!loading && donations.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-purple-700 text-white">
                            <tr>
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Amount (Rs.)</th>
                                <th className="p-2 border">Goods</th>
                                <th className="p-2 border">Organization</th>
                                <th className="p-2 border">Message</th>
                                <th className="p-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((d, idx) => (
                                <tr
                                    key={d._id}
                                    className="hover:bg-purple-50 transition-all duration-200"
                                >
                                    <td className="border p-2 text-center">{idx + 1}</td>
                                    <td className="border p-2">{d.name}</td>
                                    <td className="border p-2">{d.email}</td>
                                    <td className="border p-2">{d.amount}</td>
                                    <td className="border p-2">{d.goodsAmount || "-"}</td>
                                    <td className="border p-2">{d.organizationName}</td>
                                    <td className="border p-2">{d.message || "-"}</td>
                                    <td className="border p-2 text-sm text-gray-500">
                                        {new Date(d.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
