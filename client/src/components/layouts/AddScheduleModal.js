import React, { useState, useContext } from 'react';
import ScheduleContext from '../../context/schedule/scheduleContext';

const AddScheduleModal = ({ show, changeShow }) => {
  const scheduleContext = useContext(ScheduleContext);

  const { addSchedule } = scheduleContext;

  const today = new Date().toISOString().slice(0, 16);

  const [schedule, setSchedule] = useState({
    event: '',
    inDate: today,
    outDate: today
  });

  const { event, inDate, outDate } = schedule;
  const onChange = e => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const submitItem = e => {
    addSchedule(schedule);
    setSchedule({
      event: '',
      inDate: today,
      outDate: today
    });
    changeShow();
  };

  if (!show) {
    return null;
  } else {
    return (
      <div className='modal' role='dialog'>
        <div className='modal-header'>
          <h5 className='modal-title'>Add Schedule</h5>
        </div>
        <div className='modal-body'>
          <form>
            <div className='form-group'>
              <label htmlFor='event'>Event</label>
              <input
                type='text'
                id='event'
                name='event'
                value={event}
                onChange={onChange}
                placeholder='Event'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='inDate'>Check in</label>
              <input
                type='datetime-local'
                id='inDate'
                name='inDate'
                value={inDate}
                onChange={onChange}
                placeholder='Check In'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='outDate'>Check out</label>
              <input
                type='datetime-local'
                id='outDate'
                name='outDate'
                value={outDate}
                onChange={onChange}
                placeholder='Check Out'
                required
              />
            </div>
          </form>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={submitItem}
          >
            ADD
          </button>
          <button type='button' className='btn' onClick={changeShow}>
            Close
          </button>
        </div>
      </div>
    );
  }
};

export default AddScheduleModal;
