import React, { useState } from 'react';
import GoalList from '../components/GoalList.jsx';
import { formatToYYYYMMDD } from '../utils/dateUtils.js';

const CalendarView = ({ goals, onEdit, onDelete, onToggleComplete }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const goalsByDate = goals.reduce((acc, goal) => {
    const dateStr = goal.dueDate.split('T')[0];
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(goal);
    return acc;
  }, {});

  const dates = [];
  let day = new Date(startDate);
  while (day <= endDate) {
    dates.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  
  const todayYYYYMMDD = formatToYYYYMMDD(new Date());
  const selectedDateYYYYMMDD = formatToYYYYMMDD(selectedDate);
  
  const selectedDateGoals = goalsByDate[selectedDateYYYYMMDD] || [];

  const changeMonth = (amount) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + amount, 1));
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-base-200/50 p-4 sm:p-6 rounded-lg shadow-lg border border-base-300">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-base-300">‹</button>
          <h2 className="text-xl font-bold text-base-content">{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</h2>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-base-300">›</button>
        </div>
        <div className="grid grid-cols-7 text-center text-xs text-gray-400 mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {dates.map(date => {
            const dateStr = formatToYYYYMMDD(date);
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = dateStr === todayYYYYMMDD;
            const isSelected = dateStr === selectedDateYYYYMMDD;
            
            return (
              <div
                key={dateStr}
                className={`p-1.5 rounded-lg cursor-pointer aspect-square flex flex-col items-center justify-start transition-colors duration-200 ${
                  isSelected ? 'bg-blue-600/50' : 'hover:bg-base-300'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm ${
                  isToday ? 'bg-blue-600 text-white font-bold' : ''
                } ${!isCurrentMonth ? 'text-gray-500' : 'text-base-content'}`}>
                  {date.getDate()}
                </span>
                <div className="flex items-center mt-1 space-x-0.5">
                  {(goalsByDate[dateStr] || []).slice(0, 3).map(goal => (
                     <div key={goal.id} className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: 'rgb(var(--color-base-content))'}}></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <GoalList
          goals={selectedDateGoals}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          listTitle={`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 목표`}
        />
      </div>
    </div>
  );
};

export default CalendarView;