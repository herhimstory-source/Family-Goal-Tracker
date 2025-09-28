import React, { useState, useEffect } from 'react';
import { USERS, CATEGORIES } from '../constants.js';

const CloseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
  </svg>
);


const GoalModal = ({ isOpen, onClose, onSave, goal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: USERS[1].username,
    category: CATEGORIES[0].name,
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '',
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title,
        description: goal.description,
        assignee: goal.assignee,
        category: goal.category,
        dueDate: goal.dueDate.split('T')[0],
        dueTime: goal.dueTime,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        assignee: USERS[1].username,
        category: CATEGORIES[0].name,
        dueDate: new Date().toISOString().split('T')[0],
        dueTime: '',
      });
    }
  }, [goal, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
        alert("목표 제목을 입력해주세요.");
        return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  const formUsers = USERS.filter(u => u.username !== '모두');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-base-200 rounded-lg shadow-xl w-full max-w-md relative animate-fade-in-up border border-base-300" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-base-content transition-colors">
          <CloseIcon className="w-8 h-8"/>
        </button>
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold text-base-content mb-6">{goal ? '목표 수정' : '새 목표 추가'}</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">목표</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
                className="w-full bg-base-300 border-base-300 rounded-md p-2 text-base-content focus:ring-blue-500 focus:border-blue-500" required />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">설명 (선택)</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3}
                className="w-full bg-base-300 border-base-300 rounded-md p-2 text-base-content focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <label htmlFor="assignee" className="block text-sm font-medium text-gray-400 mb-1">담당자</label>
                <select id="assignee" name="assignee" value={formData.assignee} onChange={handleChange}
                  className="w-full bg-base-300 border-base-300 rounded-md p-2 text-base-content focus:ring-blue-500 focus:border-blue-500">
                  {formUsers.map(user => <option key={user.username} value={user.username}>{user.displayName}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-1">카테고리</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange}
                  className="w-full bg-base-300 border-base-300 rounded-md p-2 text-base-content focus:ring-blue-500 focus:border-blue-500">
                  {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-400 mb-1">마감일</label>
                <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange}
                  className="w-full bg-base-300 border-base-300 rounded-md p-2 text-base-content focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="dueTime" className="block text-sm font-medium text-gray-400 mb-1">마감 시간</label>
                <input type="time" id="dueTime" name="dueTime" value={formData.dueTime} onChange={handleChange}
                  className="w-full bg-base-300 border-base-300 rounded-md p-2 text-base-content focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-base-200 transition-colors">
              {goal ? '저장' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;