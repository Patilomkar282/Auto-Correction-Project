import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import zIndex from '@mui/material/styles/zIndex';

export default function BasicArea(props) {
  return (
    <div style={{ width: '100%', height: '54vh', maxWidth: '100%' }}>
      <LineChart
        className="text-center"
        series={[
          {
            data: props.Readings, // Array of data points
            curve: 'linear',
            color: '#dc3545', // Line color for the data
          },
        ]}
        grid={{ stroke: 'white' }} // Grid line color
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
        })}
        annotations={[
          {
            type: 'line',
            y: 62, // Y value for the reference line
            color: 'white', // Line color
            strokeDasharray: '5 5', // Dashed line style
            strokeWidth: 10, // Line thickness
            label: {
              text: 'Y = 62', // Label for the line
              position: 'middle', // Position of the label (start, middle, or end)
              style: {
                fill: 'yellow', // Label text color
                fontSize: '12px',
                zIndex:-1 // Font size for the label
              },
            },
          },
        ]}
      />
    </div>
  );
}

