
import { User, Category } from './types';

export const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbworYKAimN82WJEqsQD-qMXVjgdYImXydGsWmYDSohbJS5RUzOerZ9IGoDIR8KFY3bi/exec';

export const USERS: User[] = [
  { username: '모두', displayName: '모두', avatar: '👥', color: '#9ca3af' },
  { username: '가족', displayName: '가족', avatar: '👨‍👩‍👧‍👦', color: '#f97316' },
  { username: '은', displayName: '은', avatar: '👧', color: '#3b82f6' },
  { username: '미랑', displayName: '미랑', avatar: '👩', color: '#ec4899' },
  { username: '재성', displayName: '재성', avatar: '👨', color: '#10b981' },
];

export const CATEGORIES: Category[] = [
    { name: '공부', icon: '📚', color: '#3b82f6' },
    { name: '운동', icon: '🏃‍♂️', color: '#10b981' },
    { name: '업무', icon: '💼', color: '#f97316' },
    { name: '집안일', icon: '🧼', color: '#8b5cf6' },
    { name: '개인', icon: '👤', color: '#ec4899' },
    { name: '기타', icon: '📝', color: '#6b7280' },
];

export const getCategory = (categoryName: string): Category | undefined => {
    return CATEGORIES.find(c => c.name === categoryName);
};

export const getUser = (username: string): User | undefined => {
    return USERS.find(u => u.username === username);
};
