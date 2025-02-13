/* eslint-disable react/prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chart from "../components/Chart"
import "../assets/tabs.css"
import { useState,useEffect } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs(props) {
 
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  
  const [LSL, setLSL] = React.useState(0);
  // const [extremeleft,setextremeleft]=useState("");
  const [USL, setUSL] = React.useState(100);
// const [loading, setLoading] = React.useState(true);

useEffect(() => {
  async function reqData() {
    try {
      const data = await fetch('http://localhost:3006/lastEntry');
      if (!data.ok) {
        alert("Cannot GET Readings");
      } else {
        const resp = await data.json();
        setLSL(parseFloat(resp["results"][0]["LSL"]));
        setUSL(parseFloat(resp["results"][0]["USL"]));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  }
  reqData();
}, []);

// useEffect(() => {
//   console.log('useEffect triggered');

//   const fetchData = async () => {
//     try {
//       const res = await fetch('http://localhost:3006/extremeshift');
      
//       // Check if the response is ok
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log(data); // Log the entire response

//       // Assuming you want the value of Extreme_shift
//       const extremeShiftValue = data.results.find(item => item.field_name === "Extreme_shift");
//       if (extremeShiftValue) {
//         setExtremeLeft(extremeShiftValue.value); // Set the value
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, []);  // Add dependency array to run only once

// const socket = new WebSocket('ws://localhost:3006/ws');



  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };
  { console.log("LSL",LSL,"USL",USL) }
  return (
    <Box sx={() => ({
      bgcolor: 'background.paper',  width: '100%',padding: "0px 0px 0px 0px",
    })} >
      <AppBar position="static">
        <Tabs sx={() => ({ bgcolor: "#212529", color: "white", borderBlockColor: "white", [`& .MuiTabs-indicator`]: { bgcolor: "#dc3545" } })}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="black"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="ID Reading" {...a11yProps(0)} />
          <Tab label="OD Reading" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}

      > */}
      
      
      <TabPanel value={value} index={0} dir={theme.direction}>
  <Chart className="" Readings={props.id_readings} />
  <p className='text-center bg-dark text-light pb-3 mb-0' style={{width: "100%", height:"80%"}}>
    
    {(() => {
      let current_readings = props.id_readings[props.id_readings.length - 1];
      
      if (current_readings <= LSL) {
        // If the reading is less than or equal to LSL, use the orange color
        return (
          <span 
            className="badge text-dark"
            style={{
              fontSize: "16px",
              width: "270px",
              marginTop:"-20px",
              marginLeft: "-180px",
              position: "relative",
              left: "-10",
              fontWeight: "lighter",
              borderRadius: "30px",
              backgroundColor: "#ff4000" // Orange color
            }}
          >
            CURRENT ID READING&nbsp;&nbsp;:&nbsp; {Math.round(current_readings * 1000) / 1000}
          </span>
        );
      } else if (current_readings >= USL) {
        // If the reading is greater than or equal to USL, use the red background (bg-danger)
        return (
          <div style={{position:"relative"}}>
          <span 
            className="badge text-dark bg-danger"
            style={{
              fontSize: "16px",
              width: "270px",
              marginTop:"-20px",
              marginLeft: "100px",
              position: "absolute",
              left: "100px",
              fontWeight: "lighter",
              borderRadius: "30px"
            }}
          >
            CURRENT ID READING&nbsp;&nbsp;:&nbsp; {Math.round(current_readings * 1000) / 1000}
          </span>
          </div>
        );
      } else {
        // If the reading is between LSL and USL, use the green background (bg-success)
        return (
          <div style={{position:"relative"}}>
          <span 
            className="badge text-dark bg-success"
            style={{
              fontSize: "16px",
              width: "270px",
              marginTop:"-20px",
              marginLeft: "-130px",
              position: "absolute",
              fontWeight: "lighter",
              borderRadius: "30px",
              marginBottom: "50px"
            }}
          >
            CURRENT ID READING&nbsp;&nbsp;:&nbsp; {Math.round(current_readings * 1000) / 1000}
          </span>
          </div>
        );
      }
    })()}

  </p>
</TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        <Chart className="" Readings={props.od_readings} />
        <p className='text-center bg-dark text-light pb-3 mb-0' style={{width: "100%",height:"80%"}}>
        <span className={`badge text-dark ${(()=>{let current_readings = props.od_readings[props.od_readings.length-1]; 
        if(current_readings <= LSL) return "bg-danger"; 
        else if(current_readings >= USL) return "bg-warning"; 
        else return "bg-success"})()}`} style={{fontSize:"16px",marginLeft:"-180px",fontWeight:"lighter",borderRadius:"30px"}}>
        CURRENT OD READING&nbsp;&nbsp;:&nbsp; {Math.round(props.od_readings[props.od_readings.length-1]*1000)/1000}
        </span>
        </p>
      </TabPanel>
    {/* </SwipeableViews> */}

    
        <div
        style={{
          // top:"-130px",
          height: '50px',
          overflow: 'hidden',
          position: 'relative',
          background: '#212529',
          color: 'yellow',
         
        }}
      >
        {/* <p
          style={{
            // position: 'absolute',
            width: '100%',
            height: '100%',
            margin: '0',
            lineHeight: '50px',
            textAlign: 'center',
            transform: 'translateX(100%)',
            animation: 'scroll-left 15s linear infinite',
          }}
        >s
  
          Warning : Hard Material.....
        </p> */}
        {/* <style>
          {`
            @keyframes scroll-left {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
          `}
        </style> */}
      </div>

      
      

   
   
    
    </Box>
);
}