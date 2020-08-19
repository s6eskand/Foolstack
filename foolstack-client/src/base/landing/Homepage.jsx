import React from 'react';

// components
import Navbar from "../../components/navigation/Navbar";
import Header from "../../components/landing/header/Header";
import About from "../../components/landing/about/About";
import {useMediaQuery, useTheme} from "@material-ui/core";

function Homepage() {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <>
            <Navbar fullScreen={fullScreen} />
            <Header />
            <About />
        </>
    )
}

export default Homepage;