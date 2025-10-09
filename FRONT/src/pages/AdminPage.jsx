import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
    Home,
    Building2,
    Gift,
    Users,
    Settings,
    LogOut,
} from "lucide-react";

import AdminUserPage from "./AdminUserPage";
import AdminOrganizationPage from "./AdminOrganizationPage";
import AdminDonationPage from "./AdminDonationPage";
import AdminDashboard from "./AdminDashboardPage";


export default function AdminPage() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [showToast, setShowToast] = useState(false);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear auth token
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
            navigate("/"); // Redirect to home page
        }, 1200); // 1.2 seconds delay
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50">
            {/* Sidebar */}
            <div
                className={`${isOpen ? "w-64" : "w-20"} fixed md:static top-0 left-0 h-full bg-purple-700 text-white transition-all duration-300 p-4 flex flex-col items-center shadow-xl rounded-r-2xl z-50`}
            >
                {/* Menu items */}
                <nav className="flex flex-col gap-3 w-full text-white font-semibold">
                    <SidebarLink to="/admin" icon={<Home size={20} />} text="Home" isOpen={isOpen} />
                    <SidebarLink to="/admin/organization" icon={<Building2 size={20} />} text="Organization" isOpen={isOpen} />
                    <SidebarLink to="/admin/donations" icon={<Gift size={20} />} text="Donations" isOpen={isOpen} />
                    <SidebarLink to="/admin/user" icon={<Users size={20} />} text="Users" isOpen={isOpen} />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto mt-20 md:mt-0">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/organization" element={<AdminOrganizationPage />} />
                    <Route path="/donations" element={<AdminDonationPage />} />
                    <Route path="/user" element={<AdminUserPage />} />

                </Routes>
            </div>


        </div>
    );
}

/* Sidebar Link Component */
function SidebarLink({ to, icon, text, isOpen }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white cursor-pointer select-none bg-white/10 hover:bg-white/25 hover:translate-x-2 transition-all duration-200 ease-in-out w-full no-underline hover:no-underline focus:no-underline active:no-underline"
        >
            <span className="text-white">{icon}</span>
            {isOpen && <span className="text-white">{text}</span>}
        </Link>
    );
}
