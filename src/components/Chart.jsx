import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import PropTypes from 'prop-types';

export default function BasicArea(props) {
  return (
    <div style={{ width: '100%', height: '54vh', maxWidth: '100%' }}>
      <LineChart
        className="text-center"
        series={[
          {
            data: props.Readings,
            curve: 'linear',
            color: '#dc3545', // Keep the line red
            marker: { color: '#dc3545' }, // Ensure dots remain red
          },
        ]}
        xAxis={[
          {
            data: Array.from({ length: 20 }, (_, i) => i), // Generates [0, 1, 2, ..., 19]
          },
        ]}

        grid={{ stroke: 'white' }} 
        sx={{
          '& .MuiChartsPoint-root': {
            fill: '#dc3545 !important', // Force red dots
            stroke: '#dc3545 !important', // Ensure border is red
          },
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
        }}
        annotations={[
          {
            type: 'line',
            y: 61.2,
            color: 'white',
            strokeDasharray: '6 6',
            strokeWidth: 2,
            label: {
              text: '62.01',
              position: 'end',
              style: {
                fill: 'yellow',
                fontSize: '12px',
              },
            },
          },
          {
            type: 'line',
            y: 61.6,
            color: 'white',
            strokeDasharray: '6 6',
            strokeWidth: 2,
            label: {
              text: '61.980',
              position: 'end',
              style: {
                fill: 'yellow',
                fontSize: '12px',
              },
            },
          },
          {
            type: 'line',
            y: 62.0,
            color: 'white',
            strokeDasharray: '6 6',
            strokeWidth: 2,
            label: {
              text: '61.995',
              position: 'end',
              style: {
                fill: 'yellow',
                fontSize: '12px',
              },
            },
          },
        ]}
      />
  
    </div>
  );
}

BasicArea.propTypes = {
  Readings: PropTypes.array.isRequired, 
};
