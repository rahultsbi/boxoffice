// import { useState, useEffect } from "react";
// import { apiService } from './services/apiService';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import MainAppPage from './MainApp';

// function App() {
//   const [currentRoute, setCurrentRoute] = useState('login');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     const token = localStorage.getItem('authToken');
//     const savedUser = localStorage.getItem('user');
    
//     if (token && savedUser) {
//       try {
//         const userData = await apiService.verifyToken();
//         setUser(userData);
//         setIsAuthenticated(true);
//         setCurrentRoute('main');
//       } catch (error) {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('user');
//         setCurrentRoute('login');
//       }
//     } else {
//       setCurrentRoute('login');
//     }
    
//     setIsLoading(false);
//   };

//   const handleLogin = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     setCurrentRoute('main');
//   };

//   const handleRegister = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     setCurrentRoute('main');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('user');
//     setUser(null);
//     setIsAuthenticated(false);
//     setCurrentRoute('login');
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <h3 className="text-lg font-semibold text-gray-900">Loading...</h3>
//         </div>
//       </div>
//     );
//   }

//   switch (currentRoute) {
//     case 'register':
//       return (
//         <RegisterPage
//           onRegister={handleRegister}
//           onNavigateToLogin={() => setCurrentRoute('login')}
//         />
//       );
    
//     case 'main':
//       if (!isAuthenticated) {
//         setCurrentRoute('login');
//         return null;
//       }
//       return (
//         <MainAppPage
//           user={user}
//           onLogout={handleLogout}
//         />
//       );
    
//     case 'login':
//     default:
//       return (
//         <LoginPage
//           onLogin={handleLogin}
//           onNavigateToRegister={() => setCurrentRoute('register')}
//         />
//       );
//   }
// }

// export default App;

import { useState, useEffect } from "react";
import { apiService } from './services/apiService';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainAppPage from '../src/MainApp';

function App() {
  const [currentRoute, setCurrentRoute] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = await apiService.verifyToken();
        setUser(userData);
        setIsAuthenticated(true);
        setCurrentRoute('main');
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setCurrentRoute('login');
      }
    } else {
      setCurrentRoute('login');
    }
    
    setIsLoading(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentRoute('main');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentRoute('login');
  };

  const navigateToLogin = () => {
    setCurrentRoute('login');
  };

  const navigateToRegister = () => {
    setCurrentRoute('register');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900">Loading...</h3>
          <p className="text-gray-600">Checking authentication status</p>
        </div>
      </div>
    );
  }

  // Route rendering
  switch (currentRoute) {
    case 'register':
      return (
        <RegisterPage
          onNavigateToLogin={navigateToLogin}  // Only pass navigation, not registration handler
        />
      );
    
    case 'main':
      if (!isAuthenticated) {
        setCurrentRoute('login');
        return null;
      }
      return (
        <MainAppPage
          user={user}
          onLogout={handleLogout}
        />
      );
    
    case 'login':
    default:
      return (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={navigateToRegister}
        />
      );
  }
}

export default App;