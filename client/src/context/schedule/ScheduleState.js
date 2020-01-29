import React, { useReducer } from 'react';
import axios from 'axios';
import ScheduleContext from './scheduleContext';
import scheduleReducer from './scheduleReducer';

import {
  GET_SCHEDULES,
  SCHEDULE_ERROR,
  ADD_SCHEDULE,
  DELETE_SCHEDULE,
  CLEAR_SCHEDULE
} from '../types';

const ScheduleState = props => {
  const initialState = {
    schedule: null,
    total: 0,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  // Get Schedules
  const getSchedules = async dateString => {
    try {
      let schedule;
      if (!dateString) {
        schedule = await axios.get('/schedule');
      } else {
        const dateValues = dateString.split('-');
        console.log(dateValues);
        schedule = await axios.get(
          `/schedule?year=${dateValues[0]}&month=${dateValues[1]}`
        );
      }

      dispatch({
        type: GET_SCHEDULES,
        payload: schedule.data
      });
    } catch (err) {
      dispatch({
        type: SCHEDULE_ERROR,
        payload: err
      });
    }
  };

  // Add Schedule
  const addSchedule = async schedule => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const addSchedule = await axios.post('/schedule', schedule, config);
      dispatch({
        type: ADD_SCHEDULE,
        payload: addSchedule.data
      });
    } catch (err) {
      dispatch({
        type: SCHEDULE_ERROR,
        payload: err
      });
    }
  };

  // Remove Schedule
  const removeSchedule = async id => {
    try {
      await axios.delete(`/schedule/${id}`);
      dispatch({
        type: DELETE_SCHEDULE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: SCHEDULE_ERROR,
        payload: err
      });
    }
  };

  // CLEAR SCHEDULE
  const clearSchedule = () => {
    dispatch({ type: CLEAR_SCHEDULE });
  };

  return (
    <ScheduleContext.Provider
      value={{
        schedule: state.schedule,
        loading: state.loading,
        error: state.error,
        total: state.total,
        getSchedules,
        addSchedule,
        removeSchedule,
        clearSchedule
      }}
    >
      {props.children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleState;
