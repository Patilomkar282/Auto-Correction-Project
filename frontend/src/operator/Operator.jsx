/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { useEffect, useState } from "react";
import "../assets/pop.css";
import FullWidthTabs from "../components/Tabs";
// import { AppBar } from '@mui/material';
import { AppContext } from "../AppContext";
import React from "react";
import { Navigate } from "react-router-dom";

import { saveAs } from "file-saver";

export default function Operator() {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const { Page, setPage, userCredentials, setUserCredentials } =
    React.useContext(AppContext);
  setPage("Home");
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [popMessage, setPopMessage] = useState({
    title: "WELCOME",
    message: `to ATHENA AUTOMATION Operator Dashboard `,
  });
 
  useEffect(() => {
  async function setUp() {
          const data = await fetch('http://localhost:3006/Home');
          if (!data.ok) {
              alert("FAILED TO ENTER HOME")
          }
          localStorage.setItem('SetUpMode', "True");
      }
setUp();
  }, [])
  
  if (!userCredentials) {
    return <Navigate to="/login" />;
  }
  return (
  
    <div className="p-3 pb-0 height-fluid position-relative">
          
      <div className="container text-center dimmed-background ">
        {/* <button onClick={togglePopup} className="btn btn-primary">Toggle Pop-up</button> */}

        {isPopupVisible && (
          <>
            <div className="custom-popup bg-dark text-white">
              <h5 className="mb-3" style={{ fontSize: "5rem" }}>
                {popMessage.title}
              </h5>
              <p className="mb-3" style={{ fontSize: "1.5rem" }}>
                {popMessage.message}
              </p>
             
            </div>
           
          </>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mb-0">Home</h2>
       
      </div>
      <hr className="m-2 mb-3 mx-0" style={{ borderColor: "#6c757d" }}></hr>
    </div>
  );
}
