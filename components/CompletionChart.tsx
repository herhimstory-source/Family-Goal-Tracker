import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyCompletionData } from '../types.ts';

const CompletionChart = ({ data }) => {
    if(!data || data.length === 0) {
        return <div className="h-[300px] flex items-center justify-center text-gray-500">데이터가 없습니다.</div>
    }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="dayName" stroke="#d1d5db" />
          <YAxis allowDecimals={false} stroke="#d1d5db" />
          <Tooltip 
            cursor={{fill: 'rgba(37, 99, 235, 0.1)'}}
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#d1d5db' }}
          />
          <Bar dataKey="count" fill="#2563eb" name="완료" unit="개" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletionChart;