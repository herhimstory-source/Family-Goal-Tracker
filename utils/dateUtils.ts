import { Goal } from '../types.ts';

export const formatToYYYYMMDD = (date) => {
    return date.toISOString().split('T')[0];
};

export const getDayName = (date, locale = 'ko-KR') => {
    return date.toLocaleDateString(locale, { weekday: 'short' });
};

export const formatFullDateWithDay = (dateString) => {
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

export const isToday = (date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate();
};

export const isCompletedToday = (goal) => {
  if (goal.status !== 'completed' || !goal.completedAt) {
    return false;
  }
  return isToday(new Date(goal.completedAt));
}

export const isThisWeek = (date) => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))); // Monday as start of week
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return date >= startOfWeek && date <= endOfWeek;
};

export const isThisMonth = (date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth();
};