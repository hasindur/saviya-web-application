// components/Navbar.jsx
import React, { useState } from "react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { isAuthenticated, user, logout, isAdmin, getFullName, loading } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/organization", label: "Organization" },
    ];

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        setMenuOpen(false);
        navigate("/");
    };

    const handleProfileClick = () => {
        setUserMenuOpen(false);
        setMenuOpen(false);
        // Navigate to profile page (implement later)
        console.log("Profile clicked");
    };

    const handleAdminClick = () => {
        setUserMenuOpen(false);
        setMenuOpen(false);
        navigate("/admin");
    };

    // Show loading state
    if (loading) {
        return (
            <header className="bg-purple-700 shadow-md fixed w-full z-50">
                <div className="max-w-9xl mx-auto flex items-center justify-between px-4 py-2 md:px-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg animate-pulse"></div>
                        <div className="w-24 h-6 bg-purple-600 rounded animate-pulse"></div>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <div className="w-20 h-8 bg-purple-600 rounded-full animate-pulse"></div>
                        <div className="w-20 h-8 bg-purple-600 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-purple-700 shadow-md fixed w-full z-50">
            <div className="max-w-9xl mx-auto flex items-center justify-between px-4 py-2 md:px-6">

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <Link to="/" className="no-underline">
                        <img type="image/logo.png" src="./src/assets/logo.png" alt="Saviya Logo" className="w-10 h-10 rounded-lg" />
                    </Link>

                    <Link to="/" className="text-xl font-bold text-white no-underline">
                        Saviya.lk
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <nav className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-white hover:text-yellow-300 font-medium transition-colors duration-300 no-underline"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Authentication Buttons/User Menu */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            // Authenticated User Menu
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-800 text-white rounded-full font-medium transition-colors duration-300"
                                >
                                    <User size={18} />
                                    <span className="hidden lg:inline">{getFullName()}</span>
                                    <span className="lg:hidden">{user?.firstName}</span>
                                </button>

                                {/* User Dropdown Menu */}
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{getFullName()}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                            {isAdmin() && (
                                                <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                                    Admin
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            onClick={handleProfileClick}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <User size={16} />
                                            Profile
                                        </button>

                                        {isAdmin() && (
                                            <button
                                                onClick={handleAdminClick}
                                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                <Settings size={16} />
                                                Admin Dashboard
                                            </button>
                                        )}

                                        <hr className="my-1" />

                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Unauthenticated Buttons
                            <>
                                <Link
                                    to="/signin"
                                    className="px-5 py-1.5 bg-purple-400 text-white rounded-full font-semibold shadow-md hover:bg-yellow-400 hover:scale-101 transition-transform duration-300 no-underline"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-5 py-1.5 bg-purple-400 text-white rounded-full font-semibold shadow-md hover:bg-yellow-400 hover:scale-101 transition-transform duration-300 no-underline"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-purple-700 shadow-lg">
                    <div className="flex flex-col gap-3 px-6 py-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-white hover:text-yellow-300 font-medium transition-colors duration-300 text-left no-underline"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            // Mobile Authenticated Menu
                            <div className="border-t border-purple-600 pt-3 mt-2">
                                <div className="mb-3">
                                    <p className="text-white font-medium">{getFullName()}</p>
                                    <p className="text-purple-200 text-sm">{user?.email}</p>
                                    {isAdmin() && (
                                        <span className="inline-block mt-1 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                                            Admin
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={handleProfileClick}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-purple-600 rounded-lg transition-colors mb-2"
                                >
                                    <User size={16} />
                                    Profile
                                </button>

                                {isAdmin() && (
                                    <button
                                        onClick={handleAdminClick}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-purple-600 rounded-lg transition-colors mb-2"
                                    >
                                        <Settings size={16} />
                                        Admin Dashboard
                                    </button>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-red-200 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            // Mobile Unauthenticated Buttons
                            <>
                                <Link
                                    to="/signin"
                                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-800 transition-colors text-center no-underline"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-800 transition-colors text-center no-underline"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Click outside to close user menu */}
            {userMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                ></div>
            )}
        </header>
    );
};

export default Navbar;
