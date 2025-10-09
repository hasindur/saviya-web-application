// CareHomeOrganization.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import BgImg from "../assets/child-bg.jpg";
import axios from 'axios';

const Organization = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All types');
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Map backend types to display categories
    const typeMapping = {
        'Child Home': 'Children Care',
        'Elder Home': 'Elder Care',
        'Animal Center': 'Animal Care'
    };

    const categories = ['All types', 'Elder Care', 'Children Care', 'Animal Care'];

    // Fetch organizations from backend
    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/home');

            // Transform backend data to match frontend structure
            const transformedData = response.data.map(org => ({
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
            }));

            setOrganizations(transformedData);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch organizations:', error);
            setError('Failed to load organizations. Please try again later.');
            // Fallback to empty array instead of dummy data
            setOrganizations([]);
        } finally {
            setLoading(false);
        }
    };

    // Get default image based on organization type
    const getDefaultImage = (type) => {
        const imageMap = {
            'Child Home': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=300&h=200&fit=crop',
            'Elder Home': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=200&fit=crop',
            'Animal Center': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop'
        };
        return imageMap[type] || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop';
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

    const filteredHomes = organizations.filter(home => {
        const matchesSearch = home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            home.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            home.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            home.needs.some(need => need.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'All types' || home.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            {/* Bootstrap CSS */}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="hero-section min-h-[400px] flex items-center justify-center text-purple-700 bg-purple-100 relative px-4 md:px-0 pt-10 mx-5 md:mx-0 rounded-3xl">
                    <div className="max-w-3xl text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Care Organizations</h1>
                        <p className="text-lg md:text-xl mb-6">
                            Find and support care organizations across Sri Lanka making a difference in their communities
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-full shadow-lg overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search for care organizations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-6 py-3 text-gray-700 outline-none focus:ring-2 rounded-l-full"
                            />
                            <button
                                className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-r-full hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-search"></i>
                                Search
                            </button>
                        </div>
                    </div>
                </section>

                {/* Filter Tabs */}
                <section className="py-4 bg-light">
                    <div className="container">
                        <ul className="nav nav-pills justify-content-center flex-wrap">
                            {categories.map(category => (
                                <li key={category} className="nav-item me-2 mb-2">
                                    <button
                                        className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                                        style={{
                                            backgroundColor: selectedCategory === category ? '#5b21b6' : 'transparent',
                                            borderColor: selectedCategory === category ? '#5b21b6' : '#6c757d',
                                            color: selectedCategory === category ? 'white' : '#6c757d',
                                            border: '1px solid',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Loading State */}
                {loading && (
                    <section className="py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center py-5">
                                    <div className="spinner-border text-purple" role="status" style={{ color: '#5b21b6' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <h4 className="text-muted mt-3">Loading organizations...</h4>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Error State */}
                {error && (
                    <section className="py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center py-5">
                                    <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                                    <h4 className="text-muted">{error}</h4>
                                    <button
                                        className="btn btn-purple mt-3"
                                        style={{ backgroundColor: '#5b21b6', borderColor: '#5b21b6' }}
                                        onClick={fetchOrganizations}
                                    >
                                        <i className="fas fa-refresh me-2"></i>
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Organizations Cards */}
                {!loading && !error && (
                    <section className="py-5">
                        <div className="container">
                            {/* Results Count */}
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h5 className="text-muted">
                                        {filteredHomes.length === 0 ? 'No organizations found' :
                                            `Showing ${filteredHomes.length} of ${organizations.length} organizations`}
                                    </h5>
                                </div>
                            </div>

                            <div className="row g-4">
                                {filteredHomes.map(home => (
                                    <div key={home.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="card h-100 shadow-sm border-0" style={{ transition: 'all 0.3s ease' }}>
                                            <div className="position-relative">
                                                <img
                                                    src={home.image}
                                                    className="card-img-top"
                                                    alt={home.name}
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        e.target.src = getDefaultImage(home.type);
                                                    }}
                                                />
                                                {/* Registration Number Badge */}
                                                <div className="position-absolute top-0 start-0 m-2">
                                                    <span className="badge bg-dark bg-opacity-75 text-white">
                                                        {home.registrationNumber}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-body d-flex flex-column p-4">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h5 className="card-title mb-0 fw-bold">{home.name}</h5>
                                                    <span className="badge bg-light text-dark ms-2 text-nowrap">
                                                        {home.category}
                                                    </span>
                                                </div>

                                                {/* Location */}
                                                <div className="mb-2">
                                                    <small className="text-muted">
                                                        <i className="fas fa-map-marker-alt me-1"></i>
                                                        {home.location}
                                                    </small>
                                                </div>

                                                {/* Contact Info */}
                                                <div className="mb-2">
                                                    <small className="text-muted">
                                                        <i className="fas fa-phone me-1"></i>
                                                        {home.contactNumber}
                                                    </small>
                                                </div>

                                                <p className="card-text text-muted flex-grow-1 lh-base mb-3">
                                                    {home.description}
                                                </p>

                                                {/* Needs Section */}
                                                <div className="mb-3">
                                                    <small className="fw-semibold text-dark d-block mb-2">Current Needs:</small>
                                                    <div className="d-flex flex-wrap gap-1">
                                                        {home.needs.slice(0, 3).map((need, index) => (
                                                            <span key={index} className="badge bg-light text-dark border" style={{ fontSize: '0.7rem' }}>
                                                                {need}
                                                            </span>
                                                        ))}
                                                        {home.needs.length > 3 && (
                                                            <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>
                                                                +{home.needs.length - 3} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-2">
                                                    <div className="row g-2">
                                                        <div className="col-6">
                                                            <Link
                                                                to={`/carehome/${home.id}`}
                                                                className="btn btn-outline-secondary w-100 btn-sm d-flex align-items-center justify-content-center"
                                                                style={{ borderColor: '#5b21b6', color: '#5b21b6', transition: 'all 0.3s ease' }}
                                                                onMouseOver={(e) => { e.target.style.backgroundColor = '#5b21b6'; e.target.style.color = 'white'; }}
                                                                onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#5b21b6'; }}
                                                            >
                                                                <i className="fas fa-info-circle me-1"></i>
                                                                Learn More
                                                            </Link>
                                                        </div>
                                                        <div className="col-6">
                                                            <Link
                                                                to="/payment"
                                                                className="btn w-100 btn-sm text-white d-flex align-items-center justify-content-center fw-semibold"
                                                                style={{
                                                                    backgroundColor: '#5b21b6',
                                                                    borderColor: '#5b21b6',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                                onMouseOver={(e) => e.target.style.backgroundColor = '#4c1d95'}
                                                                onMouseOut={(e) => e.target.style.backgroundColor = '#5b21b6'}
                                                            >
                                                                <i className="fas fa-heart me-1"></i>
                                                                Support Now
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* No Results State */}
                            {filteredHomes.length === 0 && organizations.length > 0 && (
                                <div className="row">
                                    <div className="col-12 text-center py-5">
                                        <i className="fas fa-search fa-3x text-muted mb-3"></i>
                                        <h4 className="text-muted">No organizations found</h4>
                                        <p className="text-muted">Try adjusting your search criteria or category filter</p>
                                        <button
                                            className="btn btn-outline-purple"
                                            style={{ borderColor: '#5b21b6', color: '#5b21b6' }}
                                            onClick={() => {
                                                setSearchTerm('');
                                                setSelectedCategory('All types');
                                            }}
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Empty State - No Organizations in Database */}
                            {organizations.length === 0 && !loading && !error && (
                                <div className="row">
                                    <div className="col-12 text-center py-5">
                                        <i className="fas fa-home fa-3x text-muted mb-3"></i>
                                        <h4 className="text-muted">No organizations available yet</h4>
                                        <p className="text-muted">
                                            Organizations will appear here once they are added by administrators.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                <Footer />
            </div>

            {/* Custom Styles */}
            <style>{`
                .card {
                    transition: all 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 20px rgba(0,0,0,0.15) !important;
                }
                .spinner-border {
                    width: 3rem;
                    height: 3rem;
                }
            `}</style>
        </>
    );
};

export default Organization;
