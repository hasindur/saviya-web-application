import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';

const CareHomeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [home, setHome] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Map backend types to display categories
    const typeMapping = {
        'Child Home': 'Children Care',
        'Elder Home': 'Elder Care', 
        'Animal Center': 'Animal Care'
    };

    // Get default image based on organization type
    const getDefaultImage = (type) => {
        const imageMap = {
            'Child Home': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop',
            'Elder Home': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop',
            'Animal Center': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop'
        };
        return imageMap[type] || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop';
    };

    // Get default needs based on organization type
    const getDefaultNeeds = (type) => {
        const needsMap = {
            'Child Home': ['Money', 'Volunteers', 'Books', 'School Supplies', 'Toys'],
            'Elder Home': ['Money', 'Medical Supplies', 'Volunteers', 'Wheelchairs', 'Care Items'],
            'Animal Center': ['Money', 'Volunteers', 'Pet Food', 'Medical Supplies', 'Cages']
        };
        return needsMap[type] || ['Money', 'Volunteers', 'Supplies'];
    };

    useEffect(() => {
        fetchHomeDetails();
    }, [id]);

    const fetchHomeDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/home/${id}`);
            
            // Transform backend data to match frontend structure
            const org = response.data;
            const transformedData = {
                id: org._id,
                name: org.name,
                category: typeMapping[org.type] || org.type,
                location: org.location,
                description: org.description || `A ${org.type.toLowerCase()} providing care and support to those in need.`,
                image: org.picture || getDefaultImage(org.type),
                needs: getDefaultNeeds(org.type),
                registrationNumber: org.registrationNumber,
                contactNumber: org.contactNumber,
                email: org.email,
                type: org.type
            };
            
            setHome(transformedData);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch home details:', error);
            setError('Failed to load organization details. Please try again later.');
            setHome(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSponsor = () => {
        if (home) {
            navigate('/payment', { state: { homeName: home.name, homeId: home.id } });
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <div className="container mx-auto py-10 px-4">
                    <div className="bg-white shadow-lg border rounded-xl p-6 md:p-10">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/2">
                                <div className="w-full h-64 bg-gray-300 rounded-xl animate-pulse"></div>
                            </div>
                            <div className="md:w-1/2 space-y-4">
                                <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <div className="container mx-auto py-10 px-4">
                    <div className="bg-white shadow-lg border rounded-xl p-6 md:p-10 text-center">
                        <i className="fas fa-exclamation-triangle fa-3x text-red-500 mb-4"></i>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Organization</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={fetchHomeDetails}
                                className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => navigate('/organization')}
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                            >
                                Back to Organizations
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Organization not found
    if (!home) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <div className="container mx-auto py-10 px-4">
                    <div className="bg-white shadow-lg border rounded-xl p-6 md:p-10 text-center">
                        <i className="fas fa-home fa-3x text-gray-400 mb-4"></i>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Organization Not Found</h2>
                        <p className="text-gray-600 mb-4">The organization you're looking for doesn't exist or has been removed.</p>
                        <button
                            onClick={() => navigate('/organization')}
                            className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
                        >
                            Back to Organizations
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            
            <div className="container mx-auto py-10 px-4">
                <div className="bg-white shadow-lg border rounded-xl p-6 md:p-10 flex flex-col md:flex-row gap-6">

                    {/* Left: Image */}
                    <div className="md:w-1/2 flex justify-center items-start">
                        <img
                            src={home.image}
                            alt={home.name}
                            className="rounded-xl shadow-md w-full md:max-w-md object-cover"
                            onError={(e) => {
                                e.target.src = getDefaultImage(home.type);
                            }}
                        />
                    </div>

                    {/* Right: Details */}
                    <div className="md:w-1/2 flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                        <h1 className="text-3xl font-bold text-purple-700">{home.name}</h1>
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                {home.registrationNumber}
                            </span>
                        </div>
                        
                        <p className="text-gray-500 mb-2 flex items-center">
                            <i className="fas fa-tag mr-2"></i>
                            {home.category} 
                            <span className="mx-2">|</span>
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            {home.location}
                        </p>

                        {/* Description */}
                        <div className="mb-4">
                            <h5 className="text-lg font-semibold mb-2 flex items-center">
                                <i className="fas fa-info-circle mr-2 text-purple-600"></i>
                                About This Organization
                            </h5>
                            <p className="text-gray-700 leading-relaxed">
                                {home.description}
                            </p>
                        </div>

                        {/* Current Needs */}
                        <div className="mb-4">
                            <h5 className="text-lg font-semibold mb-2 flex items-center">
                                <i className="fas fa-heart mr-2 text-red-500"></i>
                                Current Needs
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                {home.needs.map((need, index) => (
                                    <span
                                        key={index}
                                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {need}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="mb-4">
                            <h5 className="text-lg font-semibold mb-2 flex items-center">
                                <i className="fas fa-phone mr-2 text-green-600"></i>
                                Contact Details
                            </h5>
                            <div className="space-y-1">
                                <p className="text-gray-700 flex items-center">
                                    <i className="fas fa-phone-alt mr-2 text-gray-400"></i>
                                    {home.contactNumber}
                                </p>
                                <p className="text-gray-700 flex items-center">
                                    <i className="fas fa-envelope mr-2 text-gray-400"></i>
                                    {home.email}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto pt-4 flex gap-3">
                        <button
                            onClick={handleSponsor}
                                className="flex-1 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition flex items-center justify-center"
                            >
                                <i className="fas fa-heart mr-2"></i>
                                Support This Organization
                            </button>
                            <button
                                onClick={() => navigate('/organization')}
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center"
                            >
                                <i className="fas fa-arrow-left mr-2"></i>
                                Back
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CareHomeDetail;
