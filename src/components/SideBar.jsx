/* eslint-disable no-unused-vars */
import athenalogo from "../assets/newLOGO2.png"
import calicon from "../assets/spanner1.svg"
import React from 'react'
import { AppContext } from '../AppContext'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
export default function SideBar() {
  const navigate = useNavigate();
  const { Page, setPage, userCredentials ,setUserCredentials} = React.useContext(AppContext);
  const BP  = async  () => {
    const data = await fetch('http://localhost:3006/BP');
    if (data.status !== 200) {
      alert("FAILED TO BYPASS")
    }else{
      alert("BYPASS SUCCESSFULLY")
    }
  }
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "25%", fontSize:"0.9rem" }}>
      <img className="mb-3 pb-3" src={athenalogo} />
      <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
          <Link to="/" className={`nav-link text-white ${Page === "Home" ? "active bg-danger" : ""}`} {...{ onClick: () => setPage("Home") }} >
            <svg className="bi me-2 bi-house" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            HOME
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Calibration" className={`nav-link text-white ${Page === "Calibration" ? "active bg-danger" : ""}`} {...{ onClick: () => setPage("Home") }} >
          <img className="me-2" src={calicon} width="16" height="16"/>
            CALLIBRATION
          </Link>
        </li>
        <li>
          <Link to="/SetUpMode" className={`nav-link text-white ${Page === "SetUpMode" ? "active bg-danger" : ""}`} {...{ onClick: () => setPage("SetUpMode") }}>
            <svg className="bi me-2 bi-sliders" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
            </svg>
            SETUP MODE
          </Link>
        </li>
        <li>
          <Link to="/Table" className={`nav-link text-white ${Page === "Table" ? "active bg-danger" : ""}`} {...{ onClick: () => setPage("Table") }}>
            <svg className="bi me-2 bi-table" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
            </svg>
            TABLE
          </Link>
        </li>
      

        {/* <li>
          <Link to="/Users" className={`nav-link text-white ${Page === "Users" ? "active bg-danger" : ""}`} {...{ onClick: () => setPage("Users") }}>
            <svg className="bi me-2 bi-people" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
            </svg>
            USERS
          </Link>
        </li> */}
      </ul>
      <div className="dropdown">
        <button className="btn  bg-light text-black" type="button" style={{ width: "100%" ,marginBottom:"20px",fontSize:"0.9rem"}} onClick={() => {BP()}}>BY-PASS BUTTON</button>
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1"
          data-bs-toggle="dropdown" aria-expanded="false">
          <svg className="bi me-2 bi-person-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>
          <strong>ADMIN</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li><a className="dropdown-item" onClick={()=>{
            setUserCredentials(null)
            navigate("/login")
          }} href="#">logout</a></li>
        </ul>
      </div>
    </div>
  )
}