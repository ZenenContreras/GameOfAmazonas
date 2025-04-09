import React from 'react';
import { Crown } from 'lucide-react';

interface SquareProps {
  value: number;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
  value,
  isSelected,
  isValidMove,
  onClick,
}) => {
  const getSquareClass = () => {
    let baseClass = "w-full h-12 flex items-center justify-center transition-all duration-300";
    
    if (isSelected) {
      return `${baseClass} bg-yellow-300`;
    }
    if (isValidMove) {
      return `${baseClass} bg-green-200 cursor-pointer hover:bg-green-300`;
    }
    return `${baseClass} ${(value === 3) ? 'bg-gray-700' : 'bg-amber-100'} cursor-pointer hover:opacity-80`;
  };

  const getPieceClass = () => {
    if (value === 1) return "text-black";
    if (value === 2) return "text-white";
    return "";
  };

  return (
    <div className={getSquareClass()} onClick={onClick}>
      {(value === 1 || value === 2) && (
        <Crown className={`w-8 h-8 ${getPieceClass()}`} />
      )}
      {value === 3 && (
        <div className="w-3 h-3 bg-red-500 rounded-full" />
      )}
    </div>
  );
};