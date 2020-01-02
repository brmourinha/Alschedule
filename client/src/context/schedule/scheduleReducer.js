import {
  GET_SCHEDULES,
  SCHEDULE_ERROR,
  ADD_SCHEDULE,
  DELETE_SCHEDULE,
  CLEAR_SCHEDULE
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        ...state,
        loading: false,
        schedule: action.payload,
        total: action.payload.reduce((acc, value) => {
          return acc + parseInt(value.workHours);
        }, 0)
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ADD_SCHEDULE:
      return {
        ...state,
        schedule: [...state.schedule, action.payload],
        total: state.total + parseInt(action.payload.workHours),
        loading: false
      };
    case DELETE_SCHEDULE:
      return {
        ...state,
        loading: false,
        total:
          state.total -
          parseInt(
            state.schedule.find(event => event._id === action.payload).workHours
          ),
        schedule: state.schedule.filter(event => event._id !== action.payload)
      };
    case CLEAR_SCHEDULE:
      return {
        ...state,
        schedule: null,
        total: 0,
        error: null,
        loading: true
      };
    default:
      return state;
  }
};
