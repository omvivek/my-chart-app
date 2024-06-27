import React, { useState } from 'react';
import './App.css';
import Chart from './components/Chart';
import TimeframeSelector from './components/TimeframeSelector';

const generateData = () => {
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-06-30');
  const data = [];

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    const dateString = date.toISOString().slice(0, 10);
    const value = Math.floor(Math.random() * 20) + 5; 
    data.push({ timestamp: dateString, value });
  }

  return data;
};

const initialData = generateData();

const App = () => {
  const [data, setData] = useState(initialData);

  const handleTimeframeSelect = (timeframe) => {
    console.log(`Selected timeframe: ${timeframe}`);
  
    let updatedData = [];
  
    switch (timeframe) {
      case 'daily':
        updatedData = initialData; 
        break;
      case 'weekly':
        updatedData = aggregateData(initialData, 'week'); 
        break;
      case 'monthly':
        updatedData = aggregateData(initialData, 'month'); 
        break;
      default:
        updatedData = initialData;
    }
  
    setData(updatedData);
  };
  
 
  const aggregateData = (data, timeframe) => {
    if (timeframe === 'week') {
      return aggregateWeekly(data);
    } else if (timeframe === 'month') {
      return aggregateMonthly(data);
    }
    return data;
  };
  
  
  const aggregateWeekly = (data) => {
    
    const weeklyData = [];
    let tempWeek = null;
    let tempValueSum = 0;
  
    data.forEach((item, index) => {
      const currentDate = new Date(item.timestamp);
      const weekStart = tempWeek ? new Date(tempWeek) : null;
      if (!tempWeek) {
        tempWeek = currentDate;
        tempValueSum += item.value;
      } else if (currentDate >= weekStart && currentDate < new Date(weekStart.setDate(weekStart.getDate() + 7))) {
        tempValueSum += item.value;
      } else {
        weeklyData.push({
          timestamp: tempWeek.toISOString().slice(0, 10),
          value: tempValueSum,
        });
        tempWeek = currentDate;
        tempValueSum = item.value;
      }
  
      if (index === data.length - 1) {
        weeklyData.push({
          timestamp: tempWeek.toISOString().slice(0, 10),
          value: tempValueSum,
        });
      }
    });
  
    return weeklyData;
  };
  
  
  const aggregateMonthly = (data) => {
    
    const monthlyData = [];
    let tempMonth = null;
    let tempValueSum = 0;
  
    data.forEach((item, index) => {
      const currentDate = new Date(item.timestamp);
      const monthStart = tempMonth ? new Date(tempMonth) : null;
      if (!tempMonth) {
        tempMonth = currentDate;
        tempValueSum += item.value;
      } else if (currentDate.getMonth() === monthStart.getMonth()) {
        tempValueSum += item.value;
      } else {
        monthlyData.push({
          timestamp: tempMonth.toISOString().slice(0, 7),
          value: tempValueSum,
        });
        tempMonth = currentDate;
        tempValueSum = item.value;
      }
  
      if (index === data.length - 1) {
        monthlyData.push({
          timestamp: tempMonth.toISOString().slice(0, 7),
          value: tempValueSum,
        });
      }
    });
  
    return monthlyData;
  };
  

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="chart-container">
          <TimeframeSelector onSelect={handleTimeframeSelect} />
          <Chart data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
