/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { useEffect, useState, useRef } from 'react';

import '../assets/pop.css';

import FullWidthTabs from '../components/Tabs';
// import { AppBar } from '@mui/material';
import { AppContext } from '../AppContext';
import React from 'react';
// import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { red } from '@mui/material/colors';
import { rgbToHex } from '@mui/material';

export default function Home() {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const { Page, setPage, userCredentials, setUserCredentials } = React.useContext(AppContext);
    setPage("Calibration");
    const [isPopupVisible, setPopupVisible] = useState(true);
    const [popupType, setPopupType] = useState(""); // "change_tool" or "add_reason"

    const [mypopup, setmypopup] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [prevToolStatus, setPrevToolStatus] = useState(null);
    const [approvetool, setapprovetoll] = useState("");
    const [selectedValue, setSelectedValue] = useState(""); 
    const [customOption, setCustomOption] = useState(""); 
    const [options] = useState(["Reason1", "Reason2", "Reason3", "Reason4", "custom"]); 
    const [popMessage, setPopMessage] = useState({
        title: "Loading",
        message: "Please wait..."
    });
    const [Progress, setProgress] = useState(16);
    const [ID_Readings, setID_Readings] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [OD_Readings, setOD_Readings] = useState([]);
    const [Success, setSuccess] = useState(false);
    const [ispopupvisiblemsg, setpopupvisiblemsg] = useState(false);
    const [isReasonvisible, setReasonvisible] = useState(false)
    const [NEW_ENTRY, setNEW_ENTRY] = useState(true);
    const [showProgress, setShowProgress] = useState(true);
    const [selectedTool, setSelectedTool] = useState();
    const [customReason, setCustomReason] = useState("");
    const [tools, setTools] = useState([]);
    const prevToolStatusRef = useRef({});



    const Start = async () => {
        const res = await fetch('http://localhost:3006/Start');
        if (!res.ok) {
            alert("FAILED TO START")
        }
    }
    const fetchReadings = async () => {
        const result = await fetch('http://localhost:3006/Readings');
        if (!result.ok) {
            setPopMessage({
                title: "Error",
                message: "Cannot GET Readings"
            })
            setPopupVisible(true);
        } else {
            const data = await result.json();
            var id_readings = []
            var od_readings = []
            await data.forEach(async element => {
                id_readings.push(element.ID_Reading);
                od_readings.push(element.OD_Reading);
            })
            id_readings = id_readings.reverse();
            od_readings = od_readings.reverse();
            setID_Readings(id_readings);
            setOD_Readings(od_readings);
            console.log(id_readings, od_readings);
        }
    }
    useEffect(() => {
        async function setUp() {
            const data = await fetch('http://localhost:3006/Calibration');
            if (!data.ok) {
                alert("FAILED TO ENTER CALIBRATION MODE")
            }
            localStorage.setItem('SetUpMode', "False");
        }
        setUp();
    })
    useEffect(() => {

        if (!ID_Readings.length || !OD_Readings.length) {
            console.log("Data Fetched..")
            fetchReadings();
        }
    })
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3006/ws');
        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            //console.log(data);
            if (data.ZERO !== "True") {
                setPopMessage({
                    title: "Zero Callibration",
                    message: "Put Zero Callibrtion Master in Gauge"
                })
                setProgress(32);
                setPopupVisible(true);
                setShowProgress(true);
                return;
            }

            if (data.HIGH !== "True") {
                setPopMessage({
                    title: "High Callibration",
                    message: "Put High Callibrtion Master in Gauge"
                })
                setProgress(48);
                setPopupVisible(true);
                setShowProgress(true);
                return
            }

            if (data.LOW !== "True") {
                setPopMessage({
                    title: "Low Callibration",
                    message: "Put Low Callibrtion Master in Gauge"
                })
                setProgress(64);
                setPopupVisible(true);
                setShowProgress(true);
                return;
            }
            if (data.MEDIUM !== "True") {
                setPopMessage({
                    title: "Medium Callibration",
                    message: "Put Medium Callibrtion Master in Gauge"
                })
                setProgress(80);
                setPopupVisible(true);
                setShowProgress(true);
                return;
            }

            if (data.START !== "True") {
                console.log("Sucess BEfore", Success);
                setPopMessage({
                    title: "SUCCESS",
                    message: "Calibration Successfull"
                })
                setProgress(100);
                setShowProgress(true);
                setPopupVisible(true);
                await fetch("http://localhost:3006/Start");
                return;
            } else {
                setPopupVisible(false);
                setSuccess(true);
                // if (data.INSERT_INDEXING === "True") {
                //     setSuccess(false);
                //     setPopMessage({
                //         title: "FINISH INSERT",
                //         message: (
                //             <>
                //                 <h3>Change Finish Insert</h3>
                //                 <button  className="btn btn-danger" onClick={() => { fetch("http://localhost:3006/Index"); setPopupVisible(false); setSuccess(true)}}>Finish Inserted</button>
                //             </>
                //         )
                //     })

                //     setShowProgress(false);
                //     setPopupVisible(true);
                //     return;

                // }

                //  if (data.TOOL2 === "False") {
                //     setSuccess(false);
                //     setPopMessage({
                //         title: "Semi-Finish Insert",
                //         message: (
                //             <>
                //                 <h3>Change Tool</h3>
                //                 <button  className="btn btn-danger" onClick={() => { fetch("http://localhost:3006/Semifinish"); setPopupVisible(false); setSuccess(true)}}>Semi-Finish Inserted</button>
                //             </>
                //         )
                //     })
                //     setShowProgress(false);
                //     setPopupVisible(true);
                //     return;
                // }
                // if (data.SemiFinish === "True") {
                //     setSuccess(false);
                //     setPopMessage({
                //         title: "Semi-Finish Insert",
                //         message: (
                //             <>
                //                 <h3>Change Semi-Finish Insert</h3>
                //                 <button  className="btn btn-danger" onClick={() => { fetch("http://localhost:3006/Semifinish"); setPopupVisible(false); setSuccess(true)}}>Semi-Finish Inserted</button>
                //             </>
                //         )
                //     })
                //     setShowProgress(false);
                //     setPopupVisible(true);
                //     return;
                // }


                // if (data.RoughingInsert === "True") {
                //     setSuccess(false);
                //     setPopMessage({
                //         title:"Roughing Insert",
                //         message: (
                //             <>
                //                 <h3>Change Roughing Insert</h3>
                //                 <button  className="btn btn-danger" onClick={() => { fetch("http://localhost:3006/roughinginsert"); setPopupVisible(false); setSuccess(true)}}>Roughing Inserted</button>
                //             </>
                //         )
                //     })

                //     setShowProgress(false);
                //     setPopupVisible(true);
                //     return;

                // }

                if (data.TOOL_BROKEN === "True") {
                    setSuccess(false);
                    setPopMessage({
                        title: "TOOL BROKEN",
                        message: (<button className="btn btn-danger" onClick={() => { fetch("http://localhost:3006/Tool"); setPopupVisible(false); setSuccess(true) }}>TOOL FIXED!</button>)
                    })

                    setShowProgress(false);
                    setPopupVisible(true);
                    return;
                }

                if (data.NEW_ENTRY === "True") {
                    setNEW_ENTRY(true);
                    fetchReadings();
                    return;
                }
                return;
            }

        }
        return () => {
            if (socket.readyState === 1) {
                socket.close();
            }

            
        }
    }, []);

    useEffect(() => {
        setShowProgress(false)
        const ws = new WebSocket("ws://localhost:3006/ws"); // Connect to WebSocket server
    
        ws.onmessage = (event) => {
          const toolStatus = JSON.parse(event.data);
    
          if (JSON.stringify(toolStatus) !== JSON.stringify(prevToolStatusRef.current)) {
            prevToolStatusRef.current = toolStatus;
    
            // Handle popup conditions
            if (toolStatus.TOOL2 === "True") {
              setmypopup(true);
              setPopMessage({
                title: "Check Roughing Insert",
                message: (
                  <>
                    <button
                      className="btn btn-danger mr-[20px]"
                      onClick={() => {
                        fetch("http://localhost:3006/updateTool2");
                        setmypopup(false);
                      }}
                      style={{ margin: "50px" }}
                    >
                      Changed
                    </button>
                    <button
                      className="btn btn-danger mr-[20px]"
                      onClick={() => {
                        fetch("http://localhost:3006/stillokTool2");
                        setmypopup(false);
                      }}
                    >
                      Still OK!!
                    </button>
                  </>
                ),
              });
            } else if (toolStatus.TOOL3 === "True") {
              setmypopup(true);
              setPopMessage({
                title: "Check SemiFinish",
                message: (
                  <>
                    <button
                      className="btn btn-danger mr-[20px]"
                      onClick={() => {
                        fetch("http://localhost:3006/updateTool3");
                        setmypopup(false);
                      }}
                      style={{ margin: "50px" }}
                    >
                      Changed
                    </button>
                    <button
                      className="btn btn-danger mr-[20px]"
                      onClick={() => {
                        fetch("http://localhost:3006/stillokTool3");
                        setmypopup(false);
                      }}
                    >
                      Still OK!!
                    </button>
                  </>
                ),
              });
            } else if (toolStatus.TOOL8 === "True") {
              setmypopup(true);
              setPopMessage({
                title: "Check Insert Indexing",
                message: (
                  <>
                    <button
                      className="btn btn-danger mr-[20px]"
                      onClick={() => {
                        fetch("http://localhost:3006/updateTool8");
                        setmypopup(false);
                      }}
                      style={{ margin: "50px" }}
                    >
                      Changed
                    </button>
                    <button
                      className="btn btn-danger mr-[20px]"
                      onClick={() => {
                        fetch("http://localhost:3006/stillokTool8");
                        setmypopup(false);
                      }}
                    >
                      Still OK!!
                    </button>
                  </>
                ),
              });
            }
          }
        };
    
        return () => ws.close(); // Cleanup WebSocket connection on unmount
      }, []);

      const closePopup = () => {
        setPopupVisible(false);
        // fetch("http://localhost:3006/TOOL2value")
      };


    const startMeasurement = async () => {
        console.log("in Measure")
        const res = await fetch('http://localhost:3006/NewEntry');
        if (!res.ok) {
            alert("FAILED TO START")
        }
        console.log(NEW_ENTRY);
        setNEW_ENTRY(false);
    }
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handlePopupVisibility = () => {
        setPopupType("change_tool");
        setpopupvisiblemsg(true); // Show the popup
        setPopMessage({
            title: "Change Tool",
            message: (
                <>
                    <div>
                        <select
                            id="toolSelect"
                            style={{ padding: "10px", background: "#212529", color: "White", width: "100%" }}
                            // value={selectedTool} // Bind the value to the state
                            onChange={(e) => {
                                let newSelectedTool = e.target.value;
                                console.log(newSelectedTool);

                                // Check if the tool is already selected to avoid multiple function calls
                                if (newSelectedTool !== selectedTool && newSelectedTool !== "") {
                                    setSelectedTool(newSelectedTool); // Update the selected tool

                                    // Call the respective tool update function
                                    if (newSelectedTool === "tool2") {
                                        setapprovetoll("tool2")
                                        // updatetool2();
                                        setSelectedTool("");
                                        console.log("Tool2 selected")


                                    } else if (newSelectedTool === "tool3") {
                                        setapprovetoll("tool3")
                                        // updatetool3();
                                        setSelectedTool("");

                                    } else if (newSelectedTool === "tool8") {
                                        setapprovetoll("tool8")
                                        // updatetool8();
                                        setSelectedTool("");

                                    }

                                    // After executing the function, reset the selection to the default (empty string)

                                    console.log(selectedTool);
                                    return; // Set to empty string to reset dropdown to default
                                }
                            }}
                        >
                            <option value="">Select Tool</option> {/* Default option */}
                            <option value="tool2">Tool 2</option>
                            <option value="tool3">Tool 3</option>
                            <option value="tool8">Tool 8</option>
                        </select>
                    </div>
                </>
            ),
        });
    };



    const handleAddReasons = () => {
        setPopupType("add_reason");
        setpopupvisiblemsg(true); // Show the popup
    
        setPopMessage({
            title: "Add Reason",
            message: (
                <>
                    <div>
                        <select
                            id="toolSelect"
                            style={{ padding: "10px", background: "#212529", color: "White", width: "100%" }}
                            value={selectedTool} // Bind the value to state
                            onChange={(e) => {
                                let newSelectedReason = e.target.value;
                                console.log(newSelectedReason);
    
                                setSelectedTool(newSelectedReason); // Update selected reason
    
                                if (newSelectedReason !== "Custom") {
                                    setCustomReason(""); // Clear custom reason when another option is selected
                                }
                                if(newSelectedReason === "reason1" || newSelectedReason === "reason2" || newSelectedReason === "reason3"|| newSelectedReason === "reason4" )
                                {
                                    setapprovetoll(newSelectedReason);


                                }
                                else
                                {
                                    setapprovetoll("custom")
                                }
    
                                // Update the popup message dynamically whenever the state changes
                                updatePopMessage(newSelectedReason);
                            }}
                        >
                            <option value="">Select Reason</option> {/* Default option */}
                            <option value="reason1">Reason 1</option>
                            <option value="reason2">Reason 2</option>
                            <option value="reason3">Reason 3</option>
                            <option value="reason4">Reason 4</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>
    
                    {/* Custom Reason Input (Appears only when "Custom" is selected) */}
                    {selectedTool === "Custom" && (
                        <input
                            type="text"
                            placeholder="Enter your custom reason..."
                            value={customReason}
                            onChange={(e) => setCustomReason(e.target.value)}
                            style={{
                                marginTop: "10px",
                                padding: "10px",
                                background: "#212529",
                                color: "white",
                                width: "100%",
                                border: "1px solid #6c757d",
                                borderRadius: "5px",
                            }}
                        />
                    )}
                </>
            ),
        });
    };

    const updatePopMessage = (selectedValue) => {
    setPopupType("add_reason");
    setPopMessage({
        title: "Add Reason",
        message: (
            <>
                <div>
                    <select
                        id="toolSelect"
                        style={{ padding: "10px", background: "#212529", color: "White", width: "100%" }}
                        value={selectedValue} // Use new value
                        onChange={(e) => {
                            let newSelectedReason = e.target.value;
                            setSelectedTool(newSelectedReason);

                            if (newSelectedReason !== "Custom") {
                                setCustomReason("");
                            }

                            updatePopMessage(newSelectedReason); // Update UI again
                        }}
                    >
                        <option value="">Select Reason</option> {/* Default option */}
                        <option value="reason1">Reason 1</option>
                        <option value="reason2">Reason 2</option>
                        <option value="reason3">Reason 3</option>
                        <option value="reason4">Reason 4</option>
                        <option value="Custom">Custom</option>
                    </select>
                </div>

                {/* Show input only when "Custom" is selected */}
                {selectedValue === "Custom" && (
                    <input
                        type="text"
                        placeholder="Enter your custom reason..."
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        style={{
                            marginTop: "10px",
                            padding: "10px",
                            background: "#212529",
                            color: "white",
                            width: "100%",
                            border: "1px solid #6c757d",
                            borderRadius: "5px",
                        }}
                    />
                )}
            </>
        ),
    });
};
    // const handlereasonchange =()=>{
    //     //   alert("Hello Omkar");

    // }

    const handleapprove =  async () => {
        if (!approvetool) {
            alert("Please select a reason.");
            return;
        }

       
    if (popupType === "change_tool") {
      
        if (approvetool === "tool2") {
            updatetool2();
        } else if (approvetool === "tool3") {
            updatetool3();
        } else if (approvetool === "tool8") {
            updatetool8();
        }

        setpopupvisiblemsg(false);
        return; 
    }

    if (popupType === "add_reason") {
        
        try {
            const response = await fetch("http://localhost:3006/addReason", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason: approvetool }),
            });

            const data = await response.json();
            if (response.ok) {
                setpopupvisiblemsg(false);
            } else {
                alert("Failed to add reason: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding reason.");
        }
    }
       
    
        
        setSelectedTool("");
        setpopupvisiblemsg(false);
    }

    const handleClosePopup = () => {
        setpopupvisiblemsg(false);
        setSelectedTool("");  // Close the popup
    };

    const updatetool2 = async () => {
        await fetch("http://localhost:3006/Tool2");

    };
    const updatetool3 = async () => {
        await fetch("http://localhost:3006/Tool3");

    };
    const updatetool8 = async () => {
        await fetch("http://localhost:3006/Tool8");

    };
  
    const arrayToCSV = (array, headers) => {
        const csvRows = [headers.join(',')];
        array.forEach(row => {
            csvRows.push(row.join(','));
        });
        return csvRows.join('\n');
    };
    const downloadCSV = (data1, data2, filename = 'data.csv') => {
        const zip = (a, b) => a.map((k, i) => [k, b[i]]);
        const headers = ['ID_READINGS', 'OD_READINGS'];
        const csvData = arrayToCSV(zip(data1, data2), headers);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, filename);
    };

    if (!userCredentials) {
        return (
            <Navigate to="/login" />
        )
    }
    return (
        <div className="p-3 pb-0 height-fluid position-relative">
            <div className="container text-center dimmed-background ">
                {/* <button onClick={togglePopup} className="btn btn-primary">Toggle Pop-up</button> */}

                {/* <div>
                {tools.map((tool, index) => (
                    <div key={index} className="popup">
                    <p>{tool.name} is Active!</p>
                    </div>
                ))}
                </div> */}

                {mypopup && (
                    <>
                        <div className="custom-popup bg-dark text-white" style={{zIndex:10}}>
                            <h5 className='mb-3' style={{ fontSize: "2rem" }}>{popMessage.title}</h5>
                            <p className='mb-3' style={{ fontSize: "0.5rem" }}>{popMessage.message}</p>
                            {/* <button onClick={closePopup} className="btn btn-secondary">Close</button> */}
                            {showProgress && <div className="progress" style={{ height: "1.5rem" }}>
                                <div className="progress-bar progress-bar-striped bg-danger b-5" role="progressbar" style={{ width: `${Progress}%`, height: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>}
                        </div>
                        <div className="backdrop"></div>
                    </>
                )}


                {isPopupVisible && (
                    <>
                        <div className="custom-popup bg-dark text-white" >
                            <h5 className='mb-3' style={{ fontSize: "5rem" }}>{popMessage.title}</h5>
                            <p className='mb-3' style={{ fontSize: "1.5rem" }}>{popMessage.message}</p>
                            {/* <button onClick={closePopup} className="btn btn-secondary">Close</button> */}
                            {showProgress && <div className="progress" style={{ height: "1.5rem" }}>
                                <div className="progress-bar progress-bar-striped bg-danger b-5" role="progressbar" style={{ width: `${Progress}%`, height: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>}
                        </div>
                        <div className="backdrop"></div>
                    </>
                )}
            </div>
            <div className='d-flex justify-content-between'>
                <h2 className='mb-0'>Calibration</h2>
                <div className='d-flex align-items-center'>
                    <button type="button" className="d-flex btn btn-danger text-center align-items-center mx-2" height="30%" onClick={startMeasurement} disabled={!NEW_ENTRY}>▸ Start</button>
                    <button type="button" className="d-flex btn btn-danger text-center align-items-center mx-2" height="30%" onClick={() => { downloadCSV(ID_Readings, OD_Readings) }}>⤓Download</button>

                </div>
            </div>
            <hr className='m-2 mb-2 mx-0' style={{ borderColor: "#6c757d" }}></hr>


            {/* {ID_Readings && <Chart Readings={ID_Readings}></Chart>} */}
            {/* {OD_Readings && <Chart Readings={OD_Readings}></Chart>}       */}
            {Success && <FullWidthTabs width="fluid" height="" id_readings={ID_Readings} od_readings={OD_Readings} />}
            <div style={{ display: "flex", marginLeft: "-150px", justifyContent: "center", gap: "20px", marginTop: "-40px" }}>
            <button className='text-center text-dark pb-3 mb-0'
    style={{
      height: "32px",
      padding: "5px 15px",
      backgroundColor: "#DC3545",
      fontWeight:"500",
      color: "black",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "14px",
      position:"absolute",
      textAlign: "center",
    }}
    onClick={handlePopupVisibility}
  >
    CHANGE TOOL
  </button>

  <button className='text-center text-dark pb-3 mb-0'
    style={{
      height: "32px",
      width: "125px",
      padding: "5px 15px",
      backgroundColor: "#DC3545",
      color: "black",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "center",
      position:"absolute",
      marginLeft: "350px"
    }}
    onClick={handleAddReasons}
  >
    ADD REASONS
  </button>
</div>
            {ispopupvisiblemsg && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#212529",
                            padding: "20px",

                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            width: "500px",
                            height: "250px",
                            textAlign: "center",
                        }}
                    >
                        <h2 style={{ color: 'white' }}>{popMessage.title}</h2>
                        <div>{popMessage.message}</div>
                        <button
                            onClick={handleapprove}
                            style={{
                                marginTop: "15px",
                                padding: "10px 20px",
                                backgroundColor: "#DC3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Approve
                        </button>
                        <button onClick={handleClosePopup}
                            style={{
                                marginTop: "15px",
                                margin: "15px",
                                padding: "10px 20px",
                                backgroundColor: "#DC3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
    // {/* <p>ID_READING : {ID_Readings[ID_Readings.length-1]} OD_READING : {OD_Readings[OD_Readings.length-1]}</p> */}


}