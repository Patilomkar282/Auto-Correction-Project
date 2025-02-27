/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { useEffect, useState } from 'react';
import '../assets/pop.css';
import FullWidthTabs from '../components/Tabs';
// import { AppBar } from '@mui/material';
import { AppContext } from '../AppContext';
import StatsCards from '../components/StatsCards';
import GaugeChart from '../components/GaugeChart';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

export default function Oee() {
    

    
    const { Page, setPage, userCredentials, setUserCredentials } = React.useContext(AppContext);
    setPage("oee");


  
   


    
            
    
    
    
    if (!userCredentials) {
        return (
            <Navigate to="/login" />
        )
    }
    return (
        <div className="p-3 pb-0 height-fluid position-relative" style={{width:"100%"}}>
            
            <div className='d-flex justify-content-between'>
                <h2 className='mb-0'>OEE CHART</h2>
            </div>
            <hr className='m-2 mb-3 mx-0' style={{ borderColor: "#6c757d" }}></hr>
            <GaugeChart />
            <div style={{width:"100%"}}>
            <StatsCards />
            </div>

        </div>
    )
}