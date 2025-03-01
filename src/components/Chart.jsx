import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import PropTypes from "prop-types";

export default function BasicArea({ Readings, featureType }) {
  const [usl, setUsl] = useState(null);
  const [lsl, setLsl] = useState(null);

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

        if (data?.results?.length > 0) {
          // Find the USL and LSL for the given feature type (OD or ID)
          const featureData = data.results.find((item) => item.Feature === featureType);

          if (featureData) {
            setUsl(Number(featureData.USL));
            setLsl(Number(featureData.LSL));
          } else {
            console.error("Feature not found in API response:", featureType);
          }
        } else {
          console.error("Invalid API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching USL & LSL:", error);
      }
    }

    fetchLimits();
  }, [featureType]); // Depend on featureType

  if (!Array.isArray(Readings) || Readings.length === 0) {
    return <p style={{ color: "white" }}>No data available</p>;
  }

  const mean = usl !== null && lsl !== null ? (usl + lsl) / 2 : null;

  return (
    <div style={{ width: "100%", height: "54vh", maxWidth: "100%" }}>
      <LineChart
        className="text-center"
        series={[
          {
            data: Readings,
            curve: "linear",
            color: "#dc3545",
          },
          usl !== null && {
            data: Array(Readings.length).fill(usl),
            curve: "linear",
            color: "orange",
            dashArray: "5 5",
            showMark: false,
          },
          lsl !== null && {
            data: Array(Readings.length).fill(lsl),
            curve: "linear",
            color: "green",
            dashArray: "5 5",
            showMark: false,
          },
          mean !== null && {
            data: Array(Readings.length).fill(mean),
            curve: "linear",
            color: "white",
            dashArray: "5 5",
            showMark: false,
          },
        ].filter(Boolean)} // Removes undefined values
        xAxis={[
          {
            data: Array.from({ length: Readings.length }, (_, i) => i),
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
  featureType: PropTypes.string.isRequired, // New prop to pass feature type
};
