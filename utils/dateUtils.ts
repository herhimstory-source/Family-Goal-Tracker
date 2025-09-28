
import { Goal } from '../types';

export const formatToYYYYMMDD = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const getDayName = (date: Date, locale: string = 'ko-KR'): string => {
    return date.toLocaleDateString(locale, { weekday: 'short' });
};

export const formatFullDateWithDay = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    // Check for invalid date
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayName = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date);

    return `${year}-${month}-${day} (${dayName})`;
  } catch (e) {
    // In case of unexpected errors, return original string
    return dateString;
  }
};


// --- Date comparison functions ---

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate();
};

export const isCompletedToday = (goal: Goal): boolean => {
  if (goal.status !== 'completed' || !goal.completedAt) {
    return false;
  }
  return isToday(new Date(goal.completedAt));
}

export const isThisWeek = (date: Date): boolean => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))); // Monday as start of week
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return date >= startOfWeek && date <= endOfWeek;
};

export const isThisMonth = (date: Date): boolean => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth();
};


// --- Deprecated weekly calendar functions, kept for reference if needed ---
export const getWeekDays = (date: Date): Date[] => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    startOfWeek.setDate(diff);
    
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
};
