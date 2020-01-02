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

  useEffect(() => {
    authContext.loadUser();
    getSchedules();
    // eslint-disable-next-line
  }, []);

  const [show, setShow] = useState(false);

  const changeShow = e => {
    setShow(!show);
  };

  if (schedule !== null && schedule.length === 0) {
    return (
      <Fragment>
        <div className='home-container'>
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
