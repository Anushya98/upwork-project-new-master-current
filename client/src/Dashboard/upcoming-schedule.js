import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  

const UpcomingSchedule = () => {
    const [upcoming, setUpcoming] = useState([])
    const [value, onChange] = useState(new Date());
    

    useEffect(() => {
        axios.get("http://localhost:5000/events", config).then((res => {
            setUpcoming(res.data.specEvents)
            console.log("Events data", res.data.specEvents)
        }));
    }, []);



    const handleDateClick = date => {
        axios
          .get(`http://localhost:5000/events/${date.toISOString()}`, config)
          .then(res => {
        
          });
      };
  
  //calendar.addEventListener('dateClick', handleDateClick);

  return (
    <div>
      <Calendar onChange={onChange} value={value} onClickDay={handleDateClick} style={{ width: '100%'}} />
    </div>
  );
}

export default UpcomingSchedule;