import React, { useState } from 'react';
import { Goal } from '../types';
import { getCategory, getUser } from '../constants';
import { formatFullDateWithDay } from '../utils/dateUtils';

interface GoalItemProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (goal: Goal) => void;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, onEdit, onDelete, onToggleComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const category = getCategory(goal.category);
  const assigneeUser = getUser(goal.assignee);
  const isCompleted = goal.status === 'completed';
  const isOverdue = !isCompleted && new Date(goal.dueDate) < new Date();

  const handleToggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(goal);
    setIsMenuOpen(false);
  }
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(goal.id);
    setIsMenuOpen(false);
  }

  return (
    <li
      className={`bg-base-200/50 rounded-lg shadow-md border border-base-300 transition-all duration-300 ${isCompleted ? 'opacity-60' : 'hover:border-blue-500'}`}
    >
      <div className="flex items-start p-4">
        <div className="flex-shrink-0 mr-4">
          <button
            onClick={() => onToggleComplete(goal)}
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
              isCompleted
                ? 'bg-blue-600 border-blue-600'
                : 'border-gray-500 hover:border-blue-400'
            }`}
            aria-label={isCompleted ? '완료 취소' : '완료'}
          >
            {isCompleted && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex-grow">
          <p className={`font-semibold text-base-content ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {goal.title}
          </p>
          {goal.description && <p className="text-sm text-gray-400 mt-1">{goal.description}</p>}
          
          <div className="flex items-center flex-wrap gap-2 text-xs text-gray-400 mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium`} style={{ backgroundColor: `${category?.color}20`, color: category?.color }}>
              {category?.icon} {goal.category}
            </span>
             {assigneeUser && (
                <span 
                    className="px-2 py-1 rounded-full text-xs font-semibold" 
                    style={{ 
                        backgroundColor: `${assigneeUser.color}20`,
                        color: assigneeUser.color 
                    }}
                >
                    {assigneeUser.displayName}
                </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
              🗓️ {formatFullDateWithDay(goal.dueDate)}{goal.dueTime ? ` ${goal.dueTime}` : ''}
            </span>
          </div>
        </div>

        <div className="relative flex-shrink-0 ml-4">
          <button onClick={handleToggleMenu} className="p-1 rounded-full hover:bg-base-300 text-gray-400 hover:text-base-content">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {isMenuOpen && (
             <div className="absolute right-0 mt-2 w-28 bg-base-300 border border-base-300 rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <button onClick={handleEdit} className="w-full text-left px-4 py-2 text-sm text-content-secondary hover:bg-base-100 hover:text-base-content">수정</button>
                </li>
                <li>
                  <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-base-100">삭제</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default GoalItem;