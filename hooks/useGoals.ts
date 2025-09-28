import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/googleAppsScript.ts';
// Fix: Import Goal type to strongly type the state.
import { Goal } from '../types.ts';

export const useGoals = () => {
  // Fix: Explicitly type the state to ensure goals are always Goal[].
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGoals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedGoals = await api.getGoals();
      setGoals(fetchedGoals.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
    } catch (e) {
      setError('목표를 불러오는데 실패했습니다.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = async (goalData) => {
    try {
      const newGoal = await api.addGoal(goalData);
      setGoals(prevGoals => [...prevGoals, newGoal].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
    } catch (e) {
      setError('목표 추가에 실패했습니다.');
      console.error(e);
      throw e; // re-throw to be caught in component
    }
  };

  const updateGoal = async (goalToUpdate) => {
    try {
      const updatedGoal = await api.updateGoal(goalToUpdate);
      setGoals(prevGoals =>
        prevGoals.map(g => (g.id === updatedGoal.id ? updatedGoal : g))
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      );
    } catch (e) {
      setError('목표 업데이트에 실패했습니다.');
      console.error(e);
      throw e;
    }
  };
  
  const toggleComplete = async (goal: Goal) => {
    const updatedStatus = goal.status === 'completed' ? 'pending' : 'completed';
    const completedAt = updatedStatus === 'completed' ? new Date().toISOString() : undefined;
    
    await updateGoal({ id: goal.id, status: updatedStatus, completedAt });
  };

  const deleteGoal = async (id) => {
    try {
      await api.deleteGoal(id);
      setGoals(prevGoals => prevGoals.filter(g => g.id !== id));
    } catch (e) {
      setError('목표 삭제에 실패했습니다.');
      console.error(e);
      throw e;
    }
  };

  return {
    goals,
    isLoading,
    error,
    fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    toggleComplete,
  };
};