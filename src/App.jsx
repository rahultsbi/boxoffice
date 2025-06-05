
// // import { useState, useEffect } from "react";
// // import { apiService } from './services/apiService';
// // import OTPLoginPage from './pages/LoginPage';
// // import MainAppPage from '../src/MainApp';
// // import AdminDashboard from './pages/AdminDashboard';
// // import DashboardWithExcelPrediction from './components/ExcelMoviePrediction'; // NEW

// // function App() {
// //   const [currentRoute, setCurrentRoute] = useState('login');
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     checkAuthStatus();
// //   }, []);

// //   const checkAuthStatus = async () => {
// //     console.log('🔍 Checking authentication status...');
    
// //     // Check if we have a stored token (localStorage with fallback)
// //     const token = apiService.getAuthToken();
// //     const savedUserData = apiService.getUserData();
    
// //     if (token) {
// //       // Check if token is still valid before making API call
// //       if (!apiService.isTokenValid()) {
// //         console.log('❌ Token expired, clearing storage');
// //         apiService.clearAuthToken();
// //         apiService.clearUserData();
// //         setCurrentRoute('login');
// //         setIsLoading(false);
// //         return;
// //       }

// //       try {
// //         console.log('🔑 Valid token found, verifying with server...');
        
// //         // If we have saved user data, use it immediately while verifying
// //         if (savedUserData) {
// //           console.log('👤 Using cached user data:', savedUserData);
// //           setUser(savedUserData);
// //           setIsAuthenticated(true);
          
// //           // Route based on user role
// //           if (savedUserData.is_admin) {
// //             setCurrentRoute('admin');
// //           } else {
// //             setCurrentRoute('main');
// //           }
// //         }
        
// //         // Verify token with server in background
// //         const userData = await apiService.verifyToken();
// //         console.log('✅ Token verified, updated user data:', userData);
        
// //         // Update with fresh data from server
// //         setUser(userData);
// //         setIsAuthenticated(true);
        
// //         // Update route if user role changed
// //         if (userData.is_admin && currentRoute !== 'admin') {
// //           setCurrentRoute('admin');
// //         } else if (!userData.is_admin && currentRoute !== 'main') {
// //           setCurrentRoute('main');
// //         }
        
// //       } catch (error) {
// //         console.error('❌ Token verification failed:', error);
        
// //         // Clear invalid session data
// //         apiService.clearAuthToken();
// //         apiService.clearUserData();
        
// //         // Reset app state
// //         setUser(null);
// //         setIsAuthenticated(false);
// //         setCurrentRoute('login');
// //       }
// //     } else {
// //       console.log('📭 No token found, redirecting to login');
// //       // Also clear any stale user data
// //       apiService.clearUserData();
// //       setCurrentRoute('login');
// //     }
    
// //     setIsLoading(false);
// //   };

// //   const handleLogin = (userData) => {
// //     console.log('✅ Login successful, user data:', userData);
    
// //     // Store user data in localStorage for persistence
// //     apiService.setUserData(userData);
    
// //     // Update app state
// //     setUser(userData);
// //     setIsAuthenticated(true);
    
// //     // Route based on user role
// //     if (userData.is_admin) {
// //       setCurrentRoute('admin');
// //     } else {
// //       setCurrentRoute('main');
// //     }
// //   };

// //   const handleLogout = async () => {
// //     console.log('🚪 Logging out...');
    
// //     try {
// //       // Call logout API to invalidate token on server
// //       await apiService.logout();
// //     } catch (error) {
// //       console.error('⚠️ Logout API call failed:', error);
// //       // Continue with client-side logout anyway
// //     }
    
// //     // Clear all client-side state and storage
// //     setUser(null);
// //     setIsAuthenticated(false);
// //     setCurrentRoute('login');
    
// //     console.log('✅ Logout completed');
// //   };

// //   // Handle token expiration during app usage
// //   const handleTokenExpired = () => {
// //     console.log('🚨 Token expired during app usage');
    
// //     // Clear all data
// //     apiService.clearAuthToken();
// //     apiService.clearUserData();
// //     setUser(null);
// //     setIsAuthenticated(false);
// //     setCurrentRoute('login');
    
// //     // Optionally show a message to user
// //     alert('Your session has expired. Please login again.');
// //   };

// //   // Auto-refresh check (optional - runs every 5 minutes)
// //   useEffect(() => {
// //     if (isAuthenticated && user) {
// //       const interval = setInterval(() => {
// //         // Check if token is still valid
// //         if (!apiService.isTokenValid()) {
// //           handleTokenExpired();
// //         }
// //       }, 5 * 60 * 1000); // Check every 5 minutes
      
// //       return () => clearInterval(interval);
// //     }
// //   }, [isAuthenticated, user]);

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
// //         <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
// //           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
// //           <h3 className="text-lg font-semibold text-gray-900">Loading...</h3>
// //           <p className="text-gray-600">Checking authentication status</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Route rendering with better error handling
// //   switch (currentRoute) {
// //     case 'admin':
// //       // Double-check admin access
// //       if (!isAuthenticated || !user?.is_admin) {
// //         console.warn('⚠️ Unauthorized admin access attempt');
// //         setCurrentRoute('login');
// //         return null;
// //       }
// //       return (
// //         <AdminDashboard
// //           user={user}
// //           onLogout={handleLogout}
// //           onTokenExpired={handleTokenExpired}
// //         />
// //       );
    
// //     case 'main':
// //       // Check if user is still authenticated
// //       if (!isAuthenticated || !user) {
// //         console.warn('⚠️ Unauthorized main app access attempt');
// //         setCurrentRoute('login');
// //         return null;
// //       }
// //       return (
// //         <MainAppPage
// //           user={user}
// //           onLogout={handleLogout}
// //           onTokenExpired={handleTokenExpired}
// //         />
// //       );
    
// //     case 'login':
// //     default:
// //       // If user is already authenticated, redirect to appropriate page
// //       if (isAuthenticated && user) {
// //         console.log('🔄 User already authenticated, redirecting...');
// //         if (user.is_admin) {
// //           setCurrentRoute('admin');
// //         } else {
// //           setCurrentRoute('main');
// //         }
// //         return null;
// //       }
      
// //       return (
// //         <OTPLoginPage
// //           onLogin={handleLogin}
// //         />
// //       );
// //   }
// // }

// // export default App;
// import { useState, useEffect } from "react";
// import { apiService } from './services/apiService';
// import OTPLoginPage from './pages/LoginPage';
// import DashboardWithExcelPrediction from './components/ExcelMoviePrediction'; // NEW
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//   const [currentRoute, setCurrentRoute] = useState('login');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     console.log('🔍 Checking authentication status...');
    
//     const token = apiService.getAuthToken();
//     const savedUserData = apiService.getUserData();
    
//     if (token) {
//       if (!apiService.isTokenValid()) {
//         console.log('❌ Token expired, clearing storage');
//         apiService.clearAuthToken();
//         apiService.clearUserData();
//         setCurrentRoute('login');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log('🔑 Valid token found, verifying with server...');
        
//         if (savedUserData) {
//           console.log('👤 Using cached user data:', savedUserData);
//           setUser(savedUserData);
//           setIsAuthenticated(true);
          
//           if (savedUserData.is_admin) {
//             setCurrentRoute('admin');
//           } else {
//             setCurrentRoute('dashboard'); // UPDATED: Use dashboard instead of main
//           }
//         }
        
//         const userData = await apiService.verifyToken();
//         console.log('✅ Token verified, updated user data:', userData);
        
//         setUser(userData);
//         setIsAuthenticated(true);
        
//         if (userData.is_admin && currentRoute !== 'admin') {
//           setCurrentRoute('admin');
//         } else if (!userData.is_admin && currentRoute !== 'dashboard') {
//           setCurrentRoute('dashboard'); // UPDATED
//         }
        
//       } catch (error) {
//         console.error('❌ Token verification failed:', error);
//         apiService.clearAuthToken();
//         apiService.clearUserData();
//         setUser(null);
//         setIsAuthenticated(false);
//         setCurrentRoute('login');
//       }
//     } else {
//       console.log('📭 No token found, redirecting to login');
//       apiService.clearUserData();
//       setCurrentRoute('login');
//     }
    
//     setIsLoading(false);
//   };

//   const handleLogin = (userData) => {
//     console.log('✅ Login successful, user data:', userData);
//     apiService.setUserData(userData);
//     setUser(userData);
//     setIsAuthenticated(true);
    
//     if (userData.is_admin) {
//       setCurrentRoute('admin');
//     } else {
//       setCurrentRoute('dashboard'); // UPDATED
//     }
//   };

//   const handleLogout = async () => {
//     console.log('🚪 Logging out...');
    
//     try {
//       await apiService.logout();
//     } catch (error) {
//       console.error('⚠️ Logout API call failed:', error);
//     }
    
//     setUser(null);
//     setIsAuthenticated(false);
//     setCurrentRoute('login');
    
//     console.log('✅ Logout completed');
//   };

//   const handleTokenExpired = () => {
//     console.log('🚨 Token expired during app usage');
//     apiService.clearAuthToken();
//     apiService.clearUserData();
//     setUser(null);
//     setIsAuthenticated(false);
//     setCurrentRoute('login');
//     alert('Your session has expired. Please login again.');
//   };

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       const interval = setInterval(() => {
//         if (!apiService.isTokenValid()) {
//           handleTokenExpired();
//         }
//       }, 5 * 60 * 1000);
      
//       return () => clearInterval(interval);
//     }
//   }, [isAuthenticated, user]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
//           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <h3 className="text-lg font-semibold text-gray-900">Loading...</h3>
//           <p className="text-gray-600">Checking authentication status</p>
//         </div>
//       </div>
//     );
//   }

//   // UPDATED ROUTING
//   switch (currentRoute) {
//     case 'admin':
//       if (!isAuthenticated || !user?.is_admin) {
//         console.warn('⚠️ Unauthorized admin access attempt');
//         setCurrentRoute('login');
//         return null;
//       }
//       return (
//         <AdminDashboard
//           user={user}
//           onLogout={handleLogout}
//           onTokenExpired={handleTokenExpired}
//         />
//       );
    
//     case 'dashboard': // UPDATED: New dashboard route
//       if (!isAuthenticated || !user) {
//         console.warn('⚠️ Unauthorized dashboard access attempt');
//         setCurrentRoute('login');
//         return null;
//       }
//       return (
//         <DashboardWithExcelPrediction
//           user={user}
//           onLogout={handleLogout}
//           onTokenExpired={handleTokenExpired}
//         />
//       );
    
//     case 'login':
//     default:
//       if (isAuthenticated && user) {
//         console.log('🔄 User already authenticated, redirecting...');
//         if (user.is_admin) {
//           setCurrentRoute('admin');
//         } else {
//           setCurrentRoute('dashboard'); // UPDATED
//         }
//         return null;
//       }
      
//       return (
//         <OTPLoginPage
//           onLogin={handleLogin}
//         />
//       );
//   }
// }

// export default App;
import { useState, useEffect } from "react";
import { apiService } from './services/apiService';
import OTPLoginPage from './pages/LoginPage';
import MainAppPage from '../src/MainApp'; // Keep existing ML component
import AdminDashboard from './pages/AdminDashboard';
import ExcelMoviePrediction from './components/ExcelMoviePrediction'; // Excel-based prediction
import DashboardSelection from './components/DashboardSelection'; // NEW: Selection screen

function App() {
  const [currentRoute, setCurrentRoute] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    console.log('🔍 Checking authentication status...');
    
    // Check if we have a stored token (localStorage with fallback)
    const token = apiService.getAuthToken();
    const savedUserData = apiService.getUserData();
    
    if (token) {
      // Check if token is still valid before making API call
      if (!apiService.isTokenValid()) {
        console.log('❌ Token expired, clearing storage');
        apiService.clearAuthToken();
        apiService.clearUserData();
        setCurrentRoute('login');
        setIsLoading(false);
        return;
      }

      try {
        console.log('🔑 Valid token found, verifying with server...');
        
        // If we have saved user data, use it immediately while verifying
        if (savedUserData) {
          console.log('👤 Using cached user data:', savedUserData);
          setUser(savedUserData);
          setIsAuthenticated(true);
          
          // Route based on user role
          if (savedUserData.is_admin) {
            setCurrentRoute('admin');
          } else {
            setCurrentRoute('dashboard-selection'); // NEW: Show selection screen first
          }
        }
        
        // Verify token with server in background
        const userData = await apiService.verifyToken();
        console.log('✅ Token verified, updated user data:', userData);
        
        // Update with fresh data from server
        setUser(userData);
        setIsAuthenticated(true);
        
        // Update route if user role changed
        if (userData.is_admin && currentRoute !== 'admin') {
          setCurrentRoute('admin');
        } else if (!userData.is_admin && currentRoute !== 'dashboard-selection') {
          setCurrentRoute('dashboard-selection'); // NEW
        }
        
      } catch (error) {
        console.error('❌ Token verification failed:', error);
        
        // Clear invalid session data
        apiService.clearAuthToken();
        apiService.clearUserData();
        
        // Reset app state
        setUser(null);
        setIsAuthenticated(false);
        setCurrentRoute('login');
      }
    } else {
      console.log('📭 No token found, redirecting to login');
      // Also clear any stale user data
      apiService.clearUserData();
      setCurrentRoute('login');
    }
    
    setIsLoading(false);
  };

  const handleLogin = (userData) => {
    console.log('✅ Login successful, user data:', userData);
    
    // Store user data in localStorage for persistence
    apiService.setUserData(userData);
    
    // Update app state
    setUser(userData);
    setIsAuthenticated(true);
    
    // Route based on user role
    if (userData.is_admin) {
      setCurrentRoute('admin');
    } else {
      setCurrentRoute('dashboard-selection'); // NEW: Show selection screen
    }
  };

  const handleLogout = async () => {
    console.log('🚪 Logging out...');
    
    try {
      // Call logout API to invalidate token on server
      await apiService.logout();
    } catch (error) {
      console.error('⚠️ Logout API call failed:', error);
      // Continue with client-side logout anyway
    }
    
    // Clear all client-side state and storage
    setUser(null);
    setIsAuthenticated(false);
    setCurrentRoute('login');
    
    console.log('✅ Logout completed');
  };

  // Handle token expiration during app usage
  const handleTokenExpired = () => {
    console.log('🚨 Token expired during app usage');
    
    // Clear all data
    apiService.clearAuthToken();
    apiService.clearUserData();
    setUser(null);
    setIsAuthenticated(false);
    setCurrentRoute('login');
    
    // Optionally show a message to user
    alert('Your session has expired. Please login again.');
  };

  // NEW: Handle prediction type selection
  const handleSelectPredictionType = (type) => {
    console.log(`🎯 User selected: ${type} prediction method`);
    
    if (type === 'excel') {
      setCurrentRoute('excel-prediction');
    } else if (type === 'ml') {
      setCurrentRoute('ml-prediction');
    }
  };

  // NEW: Handle back to dashboard selection
  const handleBackToDashboard = () => {
    console.log('🔙 Returning to dashboard selection');
    setCurrentRoute('dashboard-selection');
  };

  // Auto-refresh check (optional - runs every 5 minutes)
  useEffect(() => {
    if (isAuthenticated && user) {
      const interval = setInterval(() => {
        // Check if token is still valid
        if (!apiService.isTokenValid()) {
          handleTokenExpired();
        }
      }, 5 * 60 * 1000); // Check every 5 minutes
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user]);

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

  // Route rendering with better error handling
  switch (currentRoute) {
    case 'admin':
      // Double-check admin access
      if (!isAuthenticated || !user?.is_admin) {
        console.warn('⚠️ Unauthorized admin access attempt');
        setCurrentRoute('login');
        return null;
      }
      return (
        <AdminDashboard
          user={user}
          onLogout={handleLogout}
          onTokenExpired={handleTokenExpired}
        />
      );
    
    case 'dashboard-selection':
      // NEW: Dashboard selection screen
      if (!isAuthenticated || !user) {
        console.warn('⚠️ Unauthorized dashboard access attempt');
        setCurrentRoute('login');
        return null;
      }
      return (
        <DashboardSelection
          user={user}
          onLogout={handleLogout}
          onSelectPredictionType={handleSelectPredictionType}
        />
      );
    
    case 'excel-prediction':
      // NEW: Excel-based prediction
      if (!isAuthenticated || !user) {
        console.warn('⚠️ Unauthorized Excel prediction access attempt');
        setCurrentRoute('login');
        return null;
      }
      return (
        <ExcelMoviePrediction
          user={user}
          onLogout={handleLogout}
          onTokenExpired={handleTokenExpired}
          onBack={handleBackToDashboard}
        />
      );
    
    case 'ml-prediction':
      // NEW: ML-based prediction (using existing MainAppPage)
      if (!isAuthenticated || !user) {
        console.warn('⚠️ Unauthorized ML prediction access attempt');
        setCurrentRoute('login');
        return null;
      }
      return (
        <MainAppPage
          user={user}
          onLogout={handleLogout}
          onTokenExpired={handleTokenExpired}
          onBack={handleBackToDashboard}
        />
      );
    
    case 'main':
      // DEPRECATED: Redirect to dashboard selection for backward compatibility
      if (!isAuthenticated || !user) {
        console.warn('⚠️ Unauthorized main app access attempt');
        setCurrentRoute('login');
        return null;
      }
      // Automatically redirect to dashboard selection
      setCurrentRoute('dashboard-selection');
      return null;
    
    case 'login':
    default:
      // If user is already authenticated, redirect to appropriate page
      if (isAuthenticated && user) {
        console.log('🔄 User already authenticated, redirecting...');
        if (user.is_admin) {
          setCurrentRoute('admin');
        } else {
          setCurrentRoute('dashboard-selection');
        }
        return null;
      }
      
      return (
        <OTPLoginPage
          onLogin={handleLogin}
        />
      );
  }
}

export default App;