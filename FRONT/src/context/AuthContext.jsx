// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

// Helper function to decode JWT token
const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Helper function to check if token is expired
const isTokenExpired = (token) => {
    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) return true;

        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initialize auth state on component mount
    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }

            // Check if token is expired
            if (isTokenExpired(token)) {
                console.log('Token expired, removing from storage');
                localStorage.removeItem('token');
                setLoading(false);
                return;
            }

            // Decode token to get user info
            const decoded = decodeToken(token);
            if (decoded) {
                setUser({
                    email: decoded.email,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                    role: decoded.role,
                    isDisabled: decoded.isDisabled,
                    isEmailVerified: decoded.isEmailVerified
                });
                setIsAuthenticated(true);

                // Set default authorization header for axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error initializing auth:', error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', {
                email,
                password
            });

            const { token } = response.data;

            // Store token
            localStorage.setItem('token', token);

            // Decode and set user info
            const decoded = decodeToken(token);
            if (decoded) {
                const userData = {
                    email: decoded.email,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                    role: decoded.role,
                    isDisabled: decoded.isDisabled,
                    isEmailVerified: decoded.isEmailVerified
                };

                setUser(userData);
                setIsAuthenticated(true);

                // Set default authorization header
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                return { success: true, user: userData };
            }

            throw new Error('Invalid token received');
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message
            };
        }
    };

    const logout = () => {
        // Clear local storage
        localStorage.removeItem('token');

        // Clear axios default headers
        delete axios.defaults.headers.common['Authorization'];

        // Reset state
        setUser(null);
        setIsAuthenticated(false);

        console.log('User logged out successfully');
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const getFullName = () => {
        if (!user) return '';
        return `${user.firstName} ${user.lastName}`.trim();
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        isAdmin,
        getFullName,
        initializeAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
