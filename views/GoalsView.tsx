import React, { useState, useMemo } from 'react';
import GoalList from '../components/GoalList.tsx';
import { isToday, isThisWeek, isThisMonth, isCompletedToday } from '../utils/dateUtils.ts';

const FILTERS = [
  { key: 'today', label: '오늘 목표' },
  { key: 'completedToday', label: '오늘 완료' },
  { key: 'week', label: '이번 주' },
  { key: 'month', label: '이번 달' },
];

const GoalsView = ({ goals, onEdit, onDelete, onToggleComplete }) => {
  const [activeFilter, setActiveFilter] = useState('today');
  
  const pendingGoals = useMemo(() => goals.filter(g => g.status === 'pending'), [goals]);

  const filteredGoals = useMemo(() => {
    switch (activeFilter) {
      case 'today':
        return goals.filter(g => isToday(new Date(g.dueDate)));
      case 'completedToday':
        return goals.filter(g => isCompletedToday(g));
      case 'week':
        return goals.filter(g => isThisWeek(new Date(g.dueDate)));
      case 'month':
        return goals.filter(g => isThisMonth(new Date(g.dueDate)));
      default:
        return [];
    }
  }, [goals, activeFilter]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-2 border-b border-base-300 mb-4">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 font-semibold transition-colors duration-200 border-b-2 ${
                activeFilter === key
                  ? 'border-blue-500 text-base-content'
                  : 'border-transparent text-gray-400 hover:text-base-content'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <GoalList
          goals={filteredGoals}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          listTitle={FILTERS.find(f => f.key === activeFilter)?.label || ''}
        />
      </div>
      
      <div className="pt-4">
         <GoalList
            goals={pendingGoals}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            listTitle="전체 진행중인 목표"
          />
      </div>
    </div>
  );
};

export default GoalsView;