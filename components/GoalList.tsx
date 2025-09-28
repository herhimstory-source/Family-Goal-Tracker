import React from 'react';
import GoalItem from './GoalItem.tsx';
// Fix: Import the Goal type for explicit prop typing.
import { Goal } from '../types.ts';

// Fix: Added explicit prop types to ensure type safety.
interface GoalListProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (goal: Goal) => void;
  listTitle: string;
}

const GoalList = ({ goals, onEdit, onDelete, onToggleComplete, listTitle }: GoalListProps) => {
  if (goals.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{listTitle}에 해당하는 목표가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
        <h2 className="text-lg font-semibold text-base-content mb-3">{listTitle}</h2>
        <ul className="space-y-3">
            {goals.map((goal) => (
                <GoalItem
                key={goal.id}
                goal={goal}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
                />
            ))}
        </ul>
    </div>
  );
};

export default GoalList;