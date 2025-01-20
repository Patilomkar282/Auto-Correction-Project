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

export default function Welcome() {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const { Page, setPage, userCredentials, setUserCredentials } =
    React.useContext(AppContext);
  setPage("Home");
  const [isPopupVisible, setPopupVisible] = useState(true);
  const [popMessage, setPopMessage] = useState({
    title: "WELCOME",
    message: `to ATHENA AUTOMATION Dashboard`,
  });
  // const [Progress, setProgress] = useState(16);
  // const [ID_Readings, setID_Readings] = useState([]);
  // // eslint-disable-next-line no-unused-vars
  // const [OD_Readings, setOD_Readings] = useState([]);
  // const [Success, setSuccess] = useState(false);
  // const [NEW_ENTRY, setNEW_ENTRY] = useState(true);
  // const [showProgress, setShowProgress] = useState(true);
  // const [start , setStart] = useState(false);

//   const Start = async () => {
//     const res = await fetch("http://localhost:3006/Start");
//     if (!res.ok) {
//       alert("FAILED TO START");
//     }
//   };
  // const fetchReadings = async () => {
  //     const result = await fetch('http://localhost:3006/Readings');
  //     if (!result.ok) {
  //         setPopMessage({
  //             title: "Error",
  //             message: "Cannot GET Readings"
  //         })
  //         setPopupVisible(true);
  //     } else {
  //         const data = await result.json();
  //         var id_readings = []
  //         var od_readings = []
  //         await data.forEach(async element => {
  //             id_readings.push(element.ID_Reading);
  //             od_readings.push(element.OD_Reading);
  //         })
  //         id_readings = id_readings.reverse();
  //         od_readings = od_readings.reverse();
  //         setID_Readings(id_readings);
  //         setOD_Readings(od_readings);
  //         console.log(id_readings, od_readings);
  //     }
  // }
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
  // useEffect(() => {

  //     if (!ID_Readings.length || !OD_Readings.length) {
  //         console.log("Data Fetched..")
  //         fetchReadings();
  //     }
  // })
  // useEffect(() => {
  //     const socket = new WebSocket('ws://localhost:3006/ws');
  //     socket.onmessage = async (event) => {
  //         const data = JSON.parse(event.data);
  //         console.log(data);
  //         if (data.ZERO !== "True") {
  //             setPopMessage({
  //                 title: "Zero Callibration",
  //                 message: "Put Zero Callibrtion Master in Gauge"
  //             })
  //             setProgress(32);
  //             setPopupVisible(true);
  //             setShowProgress(true);
  //             return;
  //         }

  //         if (data.HIGH !== "True") {
  //             setPopMessage({
  //                 title: "High Callibration",
  //                 message: "Put High Callibrtion Master in Gauge"
  //             })
  //             setProgress(48);
  //             setPopupVisible(true);
  //             setShowProgress(true);
  //             return
  //         }

  //         if (data.LOW !== "True") {
  //             setPopMessage({
  //                 title: "Low Callibration",
  //                 message: "Put Low Callibrtion Master in Gauge"
  //             })
  //             setProgress(64);
  //             setPopupVisible(true);
  //             setShowProgress(true);
  //             return;
  //         }

  //         if (data.MEDIUM !== "True") {
  //             setPopMessage({
  //                 title: "Medium Callibration",
  //                 message: "Put Medium Callibrtion Master in Gauge"
  //             })
  //             setProgress(80);
  //             setPopupVisible(true);
  //             setShowProgress(true);
  //             return;
  //         }

  //         // if (data.START !== "True") {
  //             console.log("Sucess BEfore", Success);
  //             setPopMessage({
  //                 title: "SUCCESS",
  //                 message: "Calibration Successfull"
  //             })
  //             setStart(true);
  //             setProgress(100);
  //             setShowProgress(true);
  //             setPopupVisible(true);
  //             await fetch("http://localhost:3006/Start");
  //             return;
  //         // }
  //     }
  //     return () => {
  //         if (socket.readyState === 1) {
  //             socket.close();
  //         }
  //     }
  // }, []);

  // const startMeasurement = async () => {
  //     const res = await fetch('http://localhost:3006/NewEntry');
  //     if (!res.ok) {
  //         alert("FAILED TO START")
  //     }
  //     console.log(NEW_ENTRY);
  //     setNEW_ENTRY(false);
  // }
  // const arrayToCSV = (array, headers) => {
  //     const csvRows = [headers.join(',')];
  //     array.forEach(row => {
  //         csvRows.push(row.join(','));
  //     });
  //     return csvRows.join('\n');
  // };
  // const downloadCSV = (data1, data2, filename = 'data.csv') => {
  //     const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  //     const headers = ['ID_READINGS', 'OD_READINGS'];
  //     const csvData = arrayToCSV(zip(data1, data2), headers);
  //     const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  //     saveAs(blob, filename);
  // };
  // useEffect(() => {
  //     function sleep(ms) {
  //         return new Promise(resolve => setTimeout(resolve, ms));
  //     }
  //     async function popUp() {
  //         var result = await fetch('http://localhost:3006/test');
  //         if (!result.ok) {
  //             setPopMessage({
  //                 title: "Error",
  //                 message: "Failed to connect to database"
  //             })
  //             setPopupVisible(true);
  //         } else {
  //             setPopMessage({
  //                 title: "Zero Callibration",
  //                 message: "Put Zero Callibrtion Master in Gauge"
  //             })
  //             setProgress(25);
  //             setPopupVisible(true);
  //             while (true) {
  //                 await sleep(2000);
  //                 result = await fetch('http://localhost:3006/Fields?field_name="Zero"');
  //                 if (!result.ok) {
  //                     setPopMessage({
  //                         title: "Error",
  //                         message: "Internal Server Error"
  //                     })
  //                 } else {
  //                     data = await result.json();
  //                     if (data[0].value == "True") {
  //                         setPopMessage({
  //                             title: "High Callibration",
  //                             message: "Put High Callibrtion Master in Gauge"
  //                         })
  //                         setProgress(50);<p className='mb-3' style={{ fontSize: "1.5rem" }}>{popMessage.message}</p>
  //                         break;
  //                     }
  //                 }
  //             }

  //             while (true) {
  //                 await sleep(2000);
  //                 result = await fetch('http://localhost:3006/Fields?field_name="High"');
  //                 if (!result.ok) {
  //                     setPopMessage({
  //                         title: "Error",
  //                         message: "Internal Server Error"
  //                     })
  //                 } else {
  //                     data = await result.json();
  //                     if (data[0].value == "True") {
  //                         setPopMessage({
  //                             title: "Low Callibration",
  //                             message: "Put High Callibrtion Master in Gauge"
  //                         })
  //                         setProgress(75);
  //                         break;
  //                     }
  //                 }
  //             }

  //             while (true) {
  //                 await sleep(2000);
  //                 result = await fetch('http://localhost:3006/Fields?field_name="Low"');
  //                 if (!result.ok) {
  //                     setPopMessage({
  //                         title: "Error",
  //                         message: "Internal Server Error"
  //                     })
  //                 } else {
  //                     var data = await result.json();
  //                     if (data[0].value == "True") {
  //                         setPopMessage({
  //                             title: "Success",
  //                             message: "Calibration Completed"
  //                         })
  //                         setProgress(100);
  //                         break;
  //                     }
  //                 }
  //             }
  //         }
  //         // console.log("Hi");
  //         await sleep(2000);
  //         setPopupVisible(false);
  //         await fetchReadings();
  //
  //     }
  //     popUp();

  // }, []);
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
              {/* <button onClick={togglePopup} className="btn btn-secondary">Close</button> */}
              {/* {showProgress && <div className="progress" style={{ height: "1.5rem" }}>
                                <div className="progress-bar progress-bar-striped bg-danger b-5" role="progressbar" style={{ width: `${Progress}%`, height: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>} */}
            </div>
            {/* {!start && <div className="backdrop"></div>} */}
          </>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="mb-0">Home</h2>
        {/* <div className='d-flex align-items-center'>
                    <button type="button" className="d-flex btn btn-danger text-center align-items-center mx-2" height="30%" onClick={startMeasurement} disabled={!NEW_ENTRY}>▸ Start</button>
                    <button type="button" className="d-flex btn btn-danger text-center align-items-center mx-2" height="30%" onClick={() => { downloadCSV(ID_Readings, OD_Readings) }}>⤓Download</button>

                </div> */}
      </div>
      <hr className="m-2 mb-3 mx-0" style={{ borderColor: "#6c757d" }}></hr>

      {/* {ID_Readings && <Chart Readings={ID_Readings}></Chart>} */}
      {/* {OD_Readings && <Chart Readings={OD_Readings}></Chart>}       */}
      {/* {Success && <FullWidthTabs width="fluid" height="" id_readings={ID_Readings} od_readings={OD_Readings} />} */}
      {/* <p>ID_READING : {ID_Readings[ID_Readings.length-1]} OD_READING : {OD_Readings[OD_Readings.length-1]}</p> */}
    </div>
  );
}
