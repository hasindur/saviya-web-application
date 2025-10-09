// HomePage.jsx
import React from "react";
import Hero from "./Hero";
import Footer from "../components/Footer";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <Footer />
        </div>
    );
}
