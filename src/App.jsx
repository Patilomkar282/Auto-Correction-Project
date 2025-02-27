import Footer from './components/Footer'
import SideBar from './components/SideBar'

import React, { useState } from 'react'
import Home from './pages/Home'
import Oee from './pages/Oee'
import SetUpMode from './pages/SetUpMode'
import { AppContext } from './AppContext'
import Table from './pages/Table'
import { Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import { useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Operator from './operator/Operator'
import Sidebaroperator from './components/Sidebaroperator'

function App() {
  
  // const { role } = useContext(AppContext);
  // const { role, setRole } = useContext(AppContext);

  // const [UserRole ,setUserRole]= useState();
  const navigate = useNavigate();
  function getUserCredentials() {
    let data = localStorage.getItem('token');
    if (data !== null) {
      let parsedData = JSON.parse(data);
      return parsedData;
    }
    return null;
  }
  const [userCredentials, setUserCredentials] = useState(getUserCredentials());
  const [UserRole, setUserRole] = useState(userCredentials?.role || ""); 

  // getUserCredentials();


  useEffect(() => {
    if (userCredentials) {
      let str = JSON.stringify(userCredentials);
      localStorage.setItem('token', str);

      // Extract role and update UserRole
      if (userCredentials.role) {
        setUserRole(userCredentials.role);
      }

      console.log("User Credentials:", userCredentials);
    } else {
      navigate("/login");
    }
  }, [userCredentials, navigate]);



  useEffect(() => {
    async function reqData() {
      try {
        const response = await fetch("http://localhost:3006/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        console.log("Login Data:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    reqData();
  }, []);

  const [Page, setPage] = useState("Home");
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";




  return (
    <AppContext.Provider value={{ Page, setPage, userCredentials, setUserCredentials, UserRole, setUserRole }}>
      {!userCredentials && location.pathname !== "/login" ? (
        <Navigate to="/login" />
      ) : (
        <div className={`App ${hideSidebar ? "d-flex align-items-center" : ""}`} style={{ height: "100vh" }}>
          <div id="root" className={`d-flex ${hideSidebar ? "justify-content-center " : ""}`} style={{ width: "100%", margin: "auto" }} height="100%">
            {!hideSidebar ? (
              UserRole === "operator" ? (
                <>
                <Sidebaroperator/>
                  <Routes>
                    <Route path="/operator" element={<Operator />} />
                    <Route path="/Calibration" element={<Home />} />
                    <Route path="/SetUpMode" element={<SetUpMode />} />
                  </Routes>
                </>
              ) : (
                <>
                  <SideBar />
                  <div className="d-flex flex-column container-fluid p-0" style={{ overflowY: "auto", height: "100vh" }}>
                    <main className="flex-grow-1">
                      <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/Calibration" element={<Home />} />
                        <Route path="/table" element={<Table />} />
                        <Route path="/SetUpMode" element={<SetUpMode />} />
                        <Route path="/oee" element={<Oee />} />
                      </Routes> 
                    </main>
                    <Footer />
                  </div>
                </>
              )
            ) : (
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            )}
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export default App

