import { SCRIPT_URL } from '../constants';
import { Goal, GoalFormData } from '../types';

const performRequest = async (action: string, payload?: any): Promise<any> => {
  const url = `${SCRIPT_URL}?action=${action}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Apps Script needs this for POST
      },
      body: JSON.stringify(payload || {}), // Ensure body is always valid JSON
      redirect: 'follow',
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const result = await response.json();

    if (result.status === 'success') {
      return result.data;
    } else {
      throw new Error(result.message || 'An unknown error occurred in Google Apps Script.');
    }
  } catch (error) {
    console.error(`Error performing action '${action}':`, error);
    throw error;
  }
};

export const getGoals = async (): Promise<Goal[]> => {
  return performRequest('getGoals');
};

export const addGoal = async (goalData: GoalFormData): Promise<Goal> => {
  return performRequest('addGoal', goalData);
};

export const updateGoal = async (goal: Partial<Goal> & { id: string }): Promise<Goal> => {
  return performRequest('updateGoal', goal);
};

export const deleteGoal = async (id: string): Promise<{ id: string }> => {
  return performRequest('deleteGoal', { id });
};
