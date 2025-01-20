import Footer from './components/Footer'
import SideBar from './components/SideBar'

import React from 'react'
import Home from './pages/Home'
import SetUpMode from './pages/SetUpMode'
import { AppContext } from './AppContext'
import Table from './pages/Table'
import { Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Welcome from './pages/Welcome'


function App() {
  const navigate = useNavigate();
  function getUserCredentials() {
    let data = localStorage.getItem('token')
    if (data != undefined) {
      return JSON.parse(data)
    }
    return null
  }

  // getUserCredentials();

  const [userCredentials, setUserCredentials] = React.useState(getUserCredentials())

  useEffect(() => {
    let str = JSON.stringify(userCredentials)
    localStorage.setItem('token', str)
    console.log(userCredentials)
    if (!userCredentials) {
      navigate("/login")
    }
  }, [userCredentials, navigate])



  const [Page, setPage] = React.useState("Home")

  const location = useLocation();
  const hideSidebar = location.pathname === "/login";



  return (
    <AppContext.Provider value={{ Page, setPage, userCredentials, setUserCredentials }}>
      { !userCredentials && location.pathname !== "/login" ? <Navigate to="/login" /> :
      <div className={`App ${hideSidebar && "d-flex align-items-center"}`} style={{ height: "100vh" }}>
        <div id="root" className={`d-flex ${hideSidebar && "justify-content-center "}`} style={{ width: "100%",margin:"auto" }} height="100%">
          {!hideSidebar ? <>
            <SideBar />
            <div className="d-flex flex-column container-fluid p-0" style={{ overflowY: "auto", height: "100vh" }}>
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Welcome />} />
                  <Route path="/Calibration" element={<Home />} />
                  <Route path="/table" element={<Table />} />
                  <Route path="/SetUpMode" element={<SetUpMode/>}/>
                </Routes> 
              </main>
              <Footer />
            </div>
          </> : <>
          <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </>}
        </div>
      </div>
      }
    </AppContext.Provider>

  )
}

export default App

