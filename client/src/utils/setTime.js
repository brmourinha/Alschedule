const setTime = ms => {
  const hour = Math.floor(ms / (1000 * 60 * 60));
  const minute = Math.round((ms / (1000 * 60 * 60) - hour) * 60);

  if (hour === 0)
    return minute === 1 ? `${minute} Minuto` : `${minute} Minutos`;
  if (minute === 0) return hour === 1 ? `${hour} Hora` : `${hour} Horas`;

  return `${hour}h${minute}`;
};

export default setTime;
