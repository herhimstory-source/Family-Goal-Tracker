import React, { useMemo } from 'react';
import Dashboard from '../components/Dashboard.tsx';
import { CATEGORIES, getCategory } from '../constants.ts';
import GoalItem from '../components/GoalItem.tsx';
import { Goal } from '../types.ts';

// Fix: Added explicit prop types to ensure type safety and correct type inference within the component.
interface AchievementsViewProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (goal: Goal) => void;
}

const AchievementsView = ({ goals, onEdit, onDelete, onToggleComplete }: AchievementsViewProps) => {
    
    const pendingGoals = useMemo(() => goals.filter(g => g.status === 'pending'), [goals]);
    
    const goalsByCategory = useMemo(() => {
        // Explicitly typing `grouped` ensures `categoryGoals` is correctly inferred as an array of Goals.
        const grouped: { [key: string]: Goal[] } = {};
        
        // Initialize with all categories to maintain order
        CATEGORIES.forEach(cat => {
            grouped[cat.name] = [];
        });

        pendingGoals.forEach(goal => {
            if (grouped[goal.category]) {
                grouped[goal.category].push(goal);
            } else {
                // Fallback for uncategorized goals
                if (!grouped['기타']) grouped['기타'] = [];
                grouped['기타'].push(goal);
            }
        });

        return grouped;
    }, [pendingGoals]);

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-base-content mb-4">오늘의 현황</h2>
                <Dashboard goals={goals} />
            </section>
            
            <section>
                <h2 className="text-2xl font-bold text-base-content mb-4">카테고리별 진행 목표</h2>
                {pendingGoals.length === 0 ? (
                    <div className="text-center py-10 bg-base-200/50 rounded-lg border border-base-300">
                        <p className="text-2xl mb-2">🎉</p>
                        <p className="font-semibold text-base-content">모든 목표를 완료했어요!</p>
                        <p className="text-gray-400 text-sm">새로운 목표를 추가해보세요.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(goalsByCategory).map(([categoryName, categoryGoals]) => {
                            if (categoryGoals.length === 0) return null;
                            const category = getCategory(categoryName);
                            return (
                                <div key={categoryName}>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <span className="text-2xl">{category?.icon}</span>
                                        <h3 className="text-lg font-semibold text-base-content">{categoryName}</h3>
                                        <span className="text-sm font-medium text-gray-400 bg-base-300 px-2 py-0.5 rounded-full">{categoryGoals.length}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {categoryGoals.map(goal => (
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
                            )
                        })}
                    </div>
                )}
            </section>
        </div>
    );
};

export default AchievementsView;