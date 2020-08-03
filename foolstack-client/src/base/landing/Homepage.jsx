import React from 'react';

// components
import Navbar from "../../components/navigation/Navbar";
import Header from "../../components/landing/header/Header";
import About from "../../components/landing/about/About";

function Homepage() {
    return(
        <>
            <Navbar />
            <Header />
            <About />
        </>
    )
}

export default Homepage;