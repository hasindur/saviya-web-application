// src/pages/AdminOrganizationPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminOrganizationPage() {
    const [homes, setHomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editHomeId, setEditHomeId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        registrationNumber: "",
        type: "Child Home",
        location: "",
        contactNumber: "",
        email: "",
        picture: "",
        description: ""
    });
    const [formLoading, setFormLoading] = useState(false);

    // ------------------- Fetch Homes -------------------
    const fetchHomes = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/home");
            setHomes(res.data);
        } catch (err) {
            console.error("Failed to fetch homes", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomes();
    }, []);

    // ------------------- Handle Input Change -------------------
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ------------------- Add or Edit Home -------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);

        try {
            const token = localStorage.getItem("token"); // Admin JWT
            if (!token) {
                alert("Please login as admin to manage organizations");
                setFormLoading(false);
                return;
            }

            if (editHomeId) {
                // Edit home
                const res = await axios.put(
                    `http://localhost:5000/api/home/${editHomeId}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setHomes(prev => prev.map(h => h._id === editHomeId ? res.data.data : h));
                alert("Organization updated successfully");
            } else {
                // Add home
                const res = await axios.post(
                    "http://localhost:5000/api/home",
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setHomes(prev => [...prev, res.data.data]);
                alert("Organization added successfully");
            }

            setFormData({
                name: "",
                registrationNumber: "",
                type: "Child Home",
                location: "",
                contactNumber: "",
                email: "",
                picture: "",
                description: ""
            });
            setShowAddForm(false);
            setEditHomeId(null);

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to submit form");
        } finally {
            setFormLoading(false);
        }
    };

    // ------------------- Delete Home -------------------
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this organization?")) return;
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`http://localhost:5000/api/home/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHomes(prev => prev.filter(h => h._id !== id));
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to delete organization");
        }
    };

    // ------------------- Start Edit -------------------
    const handleEdit = (home) => {
        setFormData({
            name: home.name,
            registrationNumber: home.registrationNumber,
            type: home.type,
            location: home.location,
            contactNumber: home.contactNumber,
            email: home.email,
            picture: home.picture,
            description: home.description
        });
        setEditHomeId(home._id);
        setShowAddForm(true);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Beneficiary Organizations</h1>
                <button
                    onClick={() => {
                        setShowAddForm(!showAddForm);
                        setEditHomeId(null);
                        setFormData({
                            name: "",
                            registrationNumber: "",
                            type: "Child Home",
                            location: "",
                            contactNumber: "",
                            email: "",
                            picture: "",
                            description: ""
                        });
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    {showAddForm ? "Cancel" : "Add New Organization"}
                </button>
            </div>

            {/* ------------------- Add/Edit Form ------------------- */}
            {showAddForm && (
                <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-purple-700">
                        {editHomeId ? "Edit Organization" : "Add New Organization"}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number *</label>
                            <input
                                type="text"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="Child Home">Child Home</option>
                                <option value="Elder Home">Elder Home</option>
                                <option value="Animal Center">Animal Center</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Picture URL</label>
                            <input
                                type="url"
                                name="picture"
                                value={formData.picture}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-3">
                            <button
                                type="submit"
                                disabled={formLoading}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                {formLoading ? "Saving..." : editHomeId ? "Update Organization" : "Add Organization"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowAddForm(false);
                                    setEditHomeId(null);
                                    setFormData({
                                        name: "",
                                        registrationNumber: "",
                                        type: "Child Home",
                                        location: "",
                                        contactNumber: "",
                                        email: "",
                                        picture: "",
                                        description: ""
                                    });
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ------------------- Organizations Table ------------------- */}
            {loading ? (
                <p className="text-center py-4">Loading organizations...</p>
            ) : homes.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No organizations found. Add the first one!</p>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-purple-100">
                                <th className="border border-gray-300 p-3 text-left font-semibold">Reg. Number</th>
                                <th className="border border-gray-300 p-3 text-left font-semibold">Name</th>
                                <th className="border border-gray-300 p-3 text-left font-semibold">Type</th>
                                <th className="border border-gray-300 p-3 text-left font-semibold">Location</th>
                                <th className="border border-gray-300 p-3 text-left font-semibold">Contact</th>
                                <th className="border border-gray-300 p-3 text-left font-semibold">Email</th>
                                <th className="border border-gray-300 p-3 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {homes.map(home => (
                                <tr key={home._id} className="border hover:bg-purple-50 transition-colors">
                                    <td className="border border-gray-300 p-3 text-center font-mono text-sm">{home.registrationNumber}</td>
                                    <td className="border border-gray-300 p-3 font-medium">{home.name}</td>
                                    <td className="border border-gray-300 p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${home.type === 'Child Home' ? 'bg-blue-100 text-blue-800' :
                                                home.type === 'Elder Home' ? 'bg-green-100 text-green-800' :
                                                    'bg-orange-100 text-orange-800'
                                            }`}>{home.type}</span>
                                    </td>
                                    <td className="border border-gray-300 p-3">{home.location}</td>
                                    <td className="border border-gray-300 p-3 font-mono text-sm">{home.contactNumber}</td>
                                    <td className="border border-gray-300 p-3 text-sm">{home.email}</td>
                                    <td className="border border-gray-300 p-3 flex gap-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                                            onClick={() => handleEdit(home)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors"
                                            onClick={() => handleDelete(home._id)}
                                        >
                                            Delete
                                        </button>
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
