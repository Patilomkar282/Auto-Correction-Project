import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import PropTypes from "prop-types"; // Import PropTypes

export default function BasicArea({ Readings }) {
  if (!Array.isArray(Readings) || Readings.length === 0) {
    return <p style={{ color: "white" }}>No data available</p>;
  }

  const usl = 62.01;
  const lsl = 61.98;
  const mean = 61.995;

  return (
    <div style={{ width: '100%', height: '54vh', maxWidth: '100%' }}>
      <LineChart
        className="text-center"
        series={[
          {
            // Main Data Line
            data: Readings,
            curve: "linear",
            color: "#dc3545",
          },
          {
            // USL Dotted Line
            data: Array(Readings.length).fill(usl),
            curve: "linear",
            color: "white",
            dashArray: "5 5",
            showMark: false,
          },
          {
            // LSL Dotted Line
            data: Array(Readings.length).fill(lsl),
            curve: "linear",
            color: "white",
            dashArray: "5 5",
            showMark: false,
          },
          {
            // Mean Dotted Line
            data: Array(Readings.length).fill(mean),
            curve: "linear",
            color: "white",
            dashArray: "5 5",
            showMark: false,
          },
        ]}
        xAxis={[
          {
            data: Array.from({ length: 20 }, (_, i) => i),
          },
        ]}
        grid={{ stroke: 'white' }} // Grid lines color
      // Set width to 100% to make it responsive
// You can adjust the height as needed
        sx={() => ({
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: '#FFFFFF',
              strokeWidth: 3,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: '#FFFFFF',
            },
          },
          backgroundColor: '#212529',
          ['& .MuiMarkElement-root']: {
            fill: '#212529',
          },
        })}
      />
    </div>
  );
}

BasicArea.propTypes = {
  Readings: PropTypes.arrayOf(PropTypes.number).isRequired, // Ensure Readings is an array of numbers
};