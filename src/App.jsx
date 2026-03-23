import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 transition-all duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-blue-600"></div>
          <p className="animate-pulse text-sm font-medium tracking-wide text-gray-500">
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
      
      
      <Header />
      
      
      <main className="flex-grow w-full flex flex-col">
        <Outlet />
      </main>

      
      <Footer />
      
    </div>
  );
}

export default App;