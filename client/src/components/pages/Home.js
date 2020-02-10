import React, { useContext, useEffect, useState, Fragment } from 'react';
import Event from '../schedules/Event';
import setTime from '../../utils/setTime';
import AddScheduleModal from '../layouts/AddScheduleModal';
import Spinner from '../layouts/Spinner';

import AuthContext from '../../context/auth/authContext';
import ScheduleContext from '../../context/schedule/scheduleContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const scheduleContext = useContext(ScheduleContext);

  const { getSchedules, schedule, total, loading } = scheduleContext;

  const date = new Date();
  const dateIn = `${date.getUTCFullYear()}-${(
    '0' +
    (date.getUTCMonth() + 1)
  ).slice(-2)}`;

  useEffect(() => {
    authContext.loadUser();
    getSchedules(dateIn);
    // eslint-disable-next-line
  }, []);

  const [show, setShow] = useState(false);
  const changeShow = e => {
    setShow(!show);
  };

  const [dateSchedule, setDateSchedule] = useState(dateIn);

  const onChange = e => {
    setDateSchedule(e.target.value);
  };

  const submitDate = e => {
    if (dateSchedule !== '') {
      getSchedules(dateSchedule);
    }
    e.preventDefault();
  };

  if (schedule !== null && schedule.length === 0) {
    return (
      <Fragment>
        <div className='home-container'>
          <form>
            <input type='month' value={dateSchedule} onChange={onChange} />
            <button
              type='button'
              className='btn btn-primary'
              onClick={submitDate}
            >
              Check
            </button>
          </form>
          <h2>Schedule Empty</h2>
          <button className='btn' type='button' onClick={changeShow}>
            Add Schedule
          </button>

          <AddScheduleModal show={show} changeShow={changeShow} />
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {schedule !== null && loading !== true ? (
        <div className='home-container'>
          <form>
            <input type='month' value={dateSchedule} onChange={onChange} />
            <button
              type='button'
              className='btn btn-primary'
              onClick={submitDate}
            >
              Check
            </button>
          </form>
          <div className='schedule-container'>
            {schedule.map(event => (
              <Event key={event._id} event={event}></Event>
            ))}
          </div>
          <h2>{setTime(total)}</h2>
          <button className='btn' type='button' onClick={changeShow}>
            Add Schedule
          </button>

          <AddScheduleModal show={show} changeShow={changeShow} />
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Home;
