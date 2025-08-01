import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';

function MainLayout(props) {
    return (
        <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default MainLayout;