import React from 'react';
import { Goal } from '../types';
import StatsCard from './StatsCard';
import CompletionChart from './CompletionChart';
import CategoryChart from './CategoryChart';
import { getCategory } from '../constants';

interface DashboardProps {
  goals: Goal[];
}

const Dashboard: React.FC<DashboardProps> = ({ goals }) => {
  const pendingGoals = goals.filter(g => g.status === 'pending');
  const completedGoals = goals.filter(g => g.status === 'completed');

  const totalGoals = goals.length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals.length / totalGoals) * 100) : 0;

  // Last 7 days completion data
  const last7DaysCompletion = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      day: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('ko-KR', { weekday: 'short' }),
      count: 0
    };
  }).reverse();

  completedGoals.forEach(goal => {
    if (goal.completedAt) {
      const completedDate = goal.completedAt.split('T')[0];
      const dayData = last7DaysCompletion.find(d => d.day === completedDate);
      if (dayData) {
        dayData.count++;
      }
    }
  });

  // Category stats data
  const categoryStats: { [key: string]: number } = {};
  pendingGoals.forEach(goal => {
    categoryStats[goal.category] = (categoryStats[goal.category] || 0) + 1;
  });

  const categoryChartData = Object.entries(categoryStats).map(([category, count]) => ({
    category,
    count,
    color: getCategory(category)?.color || '#8884d8'
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="총 목표" value={totalGoals} unit="개" icon={<span className="text-3xl">🎯</span>} />
        <StatsCard title="진행중" value={pendingGoals.length} unit="개" icon={<span className="text-3xl">🏃</span>} />
        <StatsCard title="완료" value={completedGoals.length} unit="개" icon={<span className="text-3xl">✅</span>} />
        <StatsCard title="달성률" value={completionRate} unit="%" icon={<span className="text-3xl">🏆</span>} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-200/50 p-4 rounded-lg shadow-lg border border-base-300">
            <h3 className="text-lg font-semibold text-base-content mb-4">최근 7일 완료 현황</h3>
            <CompletionChart data={last7DaysCompletion} />
        </div>
        <div className="bg-base-200/50 p-4 rounded-lg shadow-lg border border-base-300">
            <h3 className="text-lg font-semibold text-base-content mb-4">진행중인 목표 카테고리</h3>
            <CategoryChart data={categoryChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;