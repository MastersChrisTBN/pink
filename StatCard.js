import React from 'react';

const StatCard = ({ title, value, change, color }) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    purple: 'text-purple-600 bg-purple-50',
  };

  const isNegative = change.startsWith('-');

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
          isNegative ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
        }`}>
          {change}
        </span>
      </div>
    </div>
  );
};

export default StatCard;