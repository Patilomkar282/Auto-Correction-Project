import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import PropTypes from "prop-types";

export default function BasicArea({ Readings, currentFeature }) {
  const [limits, setLimits] = useState({
    featureOD: null,
    uslOD: null,
    lslOD: null,
    featureID: null,
    uslID: null,
    lslID: null,
  });

  useEffect(() => {
    async function fetchLimits() {
      try {
        const response = await fetch("http://localhost:3006/usllsl");
        if (!response.ok) {
          console.error("Failed to fetch data");
          return;
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data?.results?.length > 1) {
          setLimits({
            featureOD: data.results[0].Feature,
            uslOD: parseFloat(data.results[0].USL),
            lslOD: parseFloat(data.results[0].LSL),
            featureID: data.results[1].Feature,
            uslID: parseFloat(data.results[1].USL),
            
            lslID: parseFloat(data.results[1].LSL),
          });
        
        } else {
          console.error("Invalid API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching USL & LSL:", error);
      }
    }

    fetchLimits();
  }, []);
  useEffect(() => {
    if (limits.uslID !== undefined) {
        console.log("uslID:", limits.uslID);
        console.log("lslID:", limits.lslID);
        console.log("uslOD:", limits.uslOD);
        console.log("lslOD:", limits.lslOD);
    }
}, [limits]); 

  if (!Array.isArray(Readings) || Readings.length === 0) {
    return <p style={{ color: "white" }}>No data available</p>;
  }

  const { featureOD, uslOD, lslOD, featureID, uslID, lslID } = limits;

  const meanOD = uslOD && lslOD ? (uslOD + lslOD) / 2 : null;
  const meanID = uslID && lslID ? (uslID + lslID) / 2 : null;

  // Determine which feature to show - this should come from props or parent state
  const isID = currentFeature === "ID";

  const series = isID
    ? [
        {
          data: Readings,
          curve: "linear",
          color: "#dc3545",
        },
        limits.uslID && {
          data: Array(Readings.length).fill(limits.uslID),
          curve: "linear",
          color: "orange",
          dashArray: "5 5",
          showMark: false,
        },
        limits.lslID && {
          data: Array(Readings.length).fill(limits.lslID),
          curve: "linear",
          color: "green",
          dashArray: "5 5",
          showMark: false,
        },
        meanID && {
          data: Array(Readings.length).fill(meanID),
          curve: "linear",
          color: "white",
          dashArray: "5 5",
          showMark: false,
        },
      ].filter(Boolean)
    : [
        {
          data: Readings,
          curve: "linear",
          color: "#dc3545",
        },
        uslOD && {
          data: Array(Readings.length).fill(uslOD),
          curve: "linear",
          color: "orange",
          dashArray: "5 5",
          showMark: false,
        },
        lslOD && {
          data: Array(Readings.length).fill(lslOD),
          curve: "linear",
          color: "green",
          dashArray: "5 5",
          showMark: false,
        },
        meanOD && {
          data: Array(Readings.length).fill(meanOD),
          curve: "linear",
          color: "white",
          dashArray: "5 5",
          showMark: false,
        },
      ].filter(Boolean);

  return (
    <div style={{ width: "100%", height: "54vh", maxWidth: "100%" }}>
      <LineChart
        className="text-center"
        series={series}
        xAxis={[
          {
            data: Array.from({ length: 20 }, (_, i) => i),
          },
        ]}
        grid={{ stroke: "white" }}
        sx={() => ({
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: "#FFFFFF",
              strokeWidth: 3,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: "#FFFFFF",
            },
          },
          backgroundColor: "#212529",
          ["& .MuiMarkElement-root"]: {
            fill: "#212529",
          },
        })}
      />
    </div>
  );
}

BasicArea.propTypes = {
  Readings: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentFeature: PropTypes.string.isRequired, // either "ID" or "OD"
};
