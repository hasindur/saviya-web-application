import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboardFuturistic() {
    const [users, setUsers] = useState([]);
    const [homes, setHomes] = useState([]);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersRes, homesRes, donationsRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/user/users", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://localhost:5000/api/home", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://localhost:5000/api/donations") // fetch donations
                ]);


                setHomes(homesRes.data || []);
                setUsers(usersRes.data || []);
                setDonations(donationsRes.data?.data || []); // real donation data
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const userSummary = {
        admin: users.filter(u => u.role === "admin").length,
        regular: users.filter(u => u.role !== "admin").length
    };

    const orgSummary = homes.reduce((sum, h) => {
        sum[h.type] = (sum[h.type] || 0) + 1;
        return sum;
    }, {});

    if (loading) return <p className="p-4 text-center text-gray-400">Loading dashboard...</p>;

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
                Admin Dashboard
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Users Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <h2 className="text-lg font-semibold tracking-wide uppercase">Users</h2>
                    <p className="text-5xl font-extrabold my-4">{users.length}</p>
                    <div className="flex flex-col space-y-1 text-sm">
                        <p>Admins: {userSummary.admin}</p>
                        <p>Regular: {userSummary.regular}</p>
                    </div>
                </div>

                {/* Organizations Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <h2 className="text-lg font-semibold tracking-wide uppercase">Organizations</h2>
                    <p className="text-5xl font-extrabold my-4">{homes.length}</p>
                    <div className="flex flex-col space-y-1 text-sm">
                        {Object.entries(orgSummary).map(([type, count]) => (
                            <p key={type}>{type}: {count}</p>
                        ))}
                    </div>
                </div>

                {/* Donations Card */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <h2 className="text-lg font-semibold tracking-wide uppercase">Donations</h2>
                    <p className="text-5xl font-extrabold my-4">{donations.length}</p>
                    <p className="text-sm">Total Donations Received</p>
                </div>
            </div>

            {/* Optional: Quick Links / Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                    Manage Users
                    <p className="text-xs mt-1">View and edit users, update roles, manage permissions.</p>
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                    Manage Organizations
                    <p className="text-xs mt-1">Add, edit, and monitor organizations.</p>
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                    Manage Donations
                    <p className="text-xs mt-1">Track donations and contribution status.</p>
                </button>
            </div>
        </div>
    );
}
