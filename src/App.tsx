import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { AdminDashboard } from './components/Dashboard/AdminDashboard';
import { EmployeeDashboard } from './components/Dashboard/EmployeeDashboard';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated, user, register } = useAuthStore();

  const handleRegister = (userData: any) => {
    const success = register(userData, userData.password);
    if (success) {
      setShowRegister(false);
    } else {
      alert('Registration failed. Email might already be in use.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isAuthenticated ? (
          showRegister ? (
            <div>
              <RegisterForm onRegister={handleRegister} />
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowRegister(false)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </div>
          ) : (
            <LoginForm onToggleRegister={() => setShowRegister(true)} />
          )
        ) : (
          <div className="px-4 py-6 sm:px-0">
            {user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;