import React from 'react';
import PropTypes from 'prop-types';
import { Crown } from 'lucide-react';

export const Square = ({
  value,
  isSelected,
  isValidMove,
  isDark,
  onClick,
}) => {
  const getSquareClass = () => {
    let baseClass = "w-12 h-12 flex items-center justify-center transition-all duration-300 relative";
    
    if (isSelected) {
      return `${baseClass} bg-yellow-300 shadow-inner`;
    }
    if (isValidMove) {
      return `${baseClass} ${isDark ? 'bg-green-600' : 'bg-green-400'} cursor-pointer hover:brightness-110`;
    }
    if (value === 3) { // Arrow
      return `${baseClass} bg-gray-700 shadow-inner`;
    }
    return `${baseClass} ${isDark ? 'bg-amber-200' : 'bg-amber-50'} cursor-pointer hover:brightness-110`;
  };

  const getPieceStyle = () => {
    if (value === 1) {
      return {
        className: "w-8 h-8 text-gray-900 drop-shadow-lg transform transition-transform hover:scale-110",
        strokeWidth: 2.5
      };
    }
    if (value === 2) {
      return {
        className: "w-8 h-8 text-white filter drop-shadow-lg transform transition-transform hover:scale-110",
        strokeWidth: 2.5
      };
    }
    return {};
  };

  return (
    <div className={getSquareClass()} onClick={onClick}>
      {(value === 1 || value === 2) && (
        <Crown {...getPieceStyle()} />
      )}
      {value === 3 && (
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" />
      )}
      {isValidMove && (
        <div className="absolute inset-0 bg-yellow-400 opacity-20 rounded-sm" />
      )}
    </div>
  );
};

Square.propTypes = {
  value: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isValidMove: PropTypes.bool.isRequired,
  isDark: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};