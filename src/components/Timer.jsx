import React from 'react';
import PropTypes from 'prop-types';

export const Timer = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getTimeColor = () => {
    if (timeLeft <= 30) return 'text-red-600';
    if (timeLeft <= 60) return 'text-amber-600';
    return 'text-amber-900';
  };

  return (
    <div className="text-center">
      <div className={`text-2xl font-mono font-bold ${getTimeColor()}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

Timer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
};