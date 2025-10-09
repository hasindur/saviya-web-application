import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // ------------------- Fetch Users -------------------
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/user/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ------------------- Delete User -------------------
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/user/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(prev => prev.filter(u => u._id !== id));
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to delete user");
        }
    };

    // ------------------- Toggle Role -------------------
    const handleToggleRole = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const user = users.find(u => u._id === id);
            const newRole = user.role === "admin" ? "user" : "admin";

            await axios.put(
                `http://localhost:5000/api/user/users/${id}`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
            alert(`User role updated to ${newRole}`);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to update role");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border hover:bg-gray-50">
                                <td className="border p-2">{user.firstName} {user.lastName}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2 text-center">{user.role}</td>
                                <td className="border p-2 flex justify-center items-center gap-3">
                                    <button
                                        className={`px-3 py-1 rounded text-sm font-medium ${user.role === "admin"
                                                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                                : "bg-blue-500 hover:bg-blue-600 text-white"
                                            } transition`}
                                        onClick={() => handleToggleRole(user._id)}
                                    >
                                        {user.role === "admin" ? "Make User" : "Make Admin"}
                                    </button>
                                    <button
                                        className="px-3 py-1 rounded text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            )}
        </div>
    );
}
