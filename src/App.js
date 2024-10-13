import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Papa from 'papaparse';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false); 
  useEffect(() => {
    Papa.parse('/hotel_bookings_1000.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  useEffect(() => {
    const filtered = data.filter((row) => {
      const date = new Date(`${row.arrival_date_year}-${row.arrival_date_month}-${row.arrival_date_day_of_month}`);
      return date >= startDate && date <= endDate; 
    });
    setFilteredData(filtered);
  }, [startDate, endDate, data]);

  const handleStartDateChange = (date) => {
    if (date && (!endDate || date <= endDate)) {
      setStartDate(date); 
      setIsDateSelected(date && endDate);
    }
  };

  const handleEndDateChange = (date) => {
    if (date && (!startDate || date >= startDate)) { 
      setEndDate(date);
      setIsDateSelected(date && startDate);
    }
  };

  return (
    <div className="container">
      <h1>Hotel Booking Dashboard</h1>
      <div className="dateFilter">
        <div>
          <label>Start From: </label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date('2015-06-30')}
            maxDate={new Date('2015-08-08')}
          />
        </div>
        <div>
          <label>End At: </label>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate} 
            maxDate={new Date('2015-08-08')} 
          />
        </div>
      </div>
      {isDateSelected && (
        <>
          <div className="chartContainer">
            <TimeSeriesChart data={filteredData} />
          </div>
          <div className="chartContainer">
            <ColumnChart data={filteredData} />
          </div>
          <div className="chartContainer">
            <SparklineChart data={filteredData} type="adults" />
          </div>
          <div className="chartContainer">
            <SparklineChart data={filteredData} type="children" />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
