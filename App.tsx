import React, { useState, useMemo } from 'react';
import { useGoals } from './hooks/useGoals.js';
import { USERS } from './constants.js';
import Header from './components/Header.jsx';
import GoalModal from './components/GoalModal.jsx';
import Loader from './components/Loader.jsx';
import Navigation from './components/Navigation.jsx';
import GoalsView from './views/GoalsView.jsx';
import CalendarView from './views/CalendarView.jsx';
import AchievementsView from './views/AchievementsView.jsx';

const App = () => {
  const {
    goals,
    isLoading,
    error,
    addGoal: apiAddGoal,
    updateGoal: apiUpdateGoal,
    deleteGoal: apiDeleteGoal,
    toggleComplete,
  } = useGoals();

  const [selectedUser, setSelectedUser] = useState(USERS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [currentView, setCurrentView] = useState('goals');

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const filteredGoals = useMemo(() => {
    const username = selectedUser.username;
    
    if (username === '모두') {
      // '모두'는 '가족', '은', '미랑', '재성'에게 할당된 모든 목표를 보여줍니다.
      const allFamilyAssignees = USERS.filter(u => u.username !== '모두').map(u => u.username);
      return goals.filter(g => allFamilyAssignees.includes(g.assignee));
    }
    
    // '가족', '은', '미랑', '재성'은 각각 자신에게 할당된 목표만 보여줍니다.
    return goals.filter(g => g.assignee === username);
  }, [goals, selectedUser]);


  const handleOpenModal = (goal = null) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  const handleSaveGoal = async (goalData) => {
    try {
      if (editingGoal) {
        await apiUpdateGoal({ id: editingGoal.id, ...goalData });
      } else {
        await apiAddGoal(goalData);
      }
      handleCloseModal();
    } catch (e) {
      console.error("Failed to save goal:", e);
      alert("목표 저장에 실패했습니다.");
    }
  };

  const handleDeleteGoal = async (id) => {
    if (window.confirm('정말로 이 목표를 삭제하시겠습니까?')) {
      try {
        await apiDeleteGoal(id);
      } catch (e) {
        console.error("Failed to delete goal:", e);
        alert("목표 삭제에 실패했습니다.");
      }
    }
  };
  
  const renderView = () => {
    switch(currentView) {
      case 'goals':
        return <GoalsView goals={filteredGoals} onEdit={handleOpenModal} onDelete={handleDeleteGoal} onToggleComplete={toggleComplete} />;
      case 'calendar':
        return <CalendarView goals={filteredGoals} onEdit={handleOpenModal} onDelete={handleDeleteGoal} onToggleComplete={toggleComplete} />;
      case 'achievements':
        return <AchievementsView goals={filteredGoals} onEdit={handleOpenModal} onDelete={handleDeleteGoal} onToggleComplete={toggleComplete} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen font-sans antialiased relative pb-24">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <Header selectedUser={selectedUser} onSelectUser={handleSelectUser} />

        <main className="mt-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
              {error}
            </div>
          ) : (
             renderView()
          )}
        </main>

        <button
          onClick={() => handleOpenModal()}
          className="fixed bottom-24 sm:bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors duration-300 z-40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-base-100"
          aria-label="새 목표 추가"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        <Navigation currentView={currentView} onNavigate={setCurrentView} />
      </div>

      <GoalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGoal}
        goal={editingGoal}
      />
    </div>
  );
};

export default App;