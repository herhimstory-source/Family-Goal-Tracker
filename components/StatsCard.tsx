import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit, icon }) => {
  return (
    <div className="bg-base-200/50 p-4 rounded-lg shadow-lg border border-base-300">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-base-content">
            {value}
            <span className="text-lg font-medium ml-1 text-gray-400">{unit}</span>
          </p>
          {icon}
      </div>
    </div>
  );
};

export default StatsCard;