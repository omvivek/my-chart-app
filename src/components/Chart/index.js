import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toPng } from 'html-to-image';

const Chart = ({ data }) => {
  const chartRef = useRef(null);

  const handleExportClick = () => {
    if (chartRef.current && chartRef.current.container) {
      const chartContainer = chartRef.current.container;
      chartContainer.style.backgroundColor = 'white'; 

      toPng(chartContainer.firstChild)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'chart.png';
          link.href = dataUrl;
          link.click();
          chartContainer.style.backgroundColor = ''; 
        })
        .catch((error) => {
          console.error('Error exporting chart:', error);
          chartContainer.style.backgroundColor = ''; 
        });
    }
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} ref={chartRef}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="outline-primary" onClick={handleExportClick}>
          Export as PNG
        </Button>
      </div>
    </div>
  );
};

export default Chart;
