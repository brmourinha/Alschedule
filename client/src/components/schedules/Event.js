import React, { useContext } from 'react';
import setTime from '../../utils/setTime';

import ScheduleContext from '../../context/schedule/scheduleContext';

const Event = ({ event }) => {
  const checkIn = new Date(event.inDate);
  const checkOut = new Date(event.outDate);
  const hours = checkOut.getTime() - checkIn.getTime();

  const scheduleContext = useContext(ScheduleContext);

  const { removeSchedule } = scheduleContext;

  const handleRemove = () => {
    removeSchedule(event._id);
  };

  return (
    <div className='event-container'>
      <h2>{event.event}</h2>
      <h2>
        Entrada: {(checkIn.getHours() < 10 ? '0' : '') + checkIn.getHours()}:
        {(checkIn.getMinutes() < 10 ? '0' : '') + checkIn.getMinutes()}
      </h2>
      <h2>
        Saida: {(checkOut.getHours() < 10 ? '0' : '') + checkOut.getHours()}:
        {(checkOut.getMinutes() < 10 ? '0' : '') + checkOut.getMinutes()}
      </h2>
      <h2>{setTime(hours)}</h2>
      <div className='controls'>
        <button className='btn' onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Event;
