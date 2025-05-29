// import { useState } from "react";
// import { apiService } from '../services/apiService';

// function RegisterPage({ onRegister, onNavigateToLogin }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     setError('');

//     if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (!formData.email.endsWith('@tsbi.in')) {
//       setError('Email must be from @tsbi.in domain');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await apiService.register({
//         username: formData.username,
//         email: formData.email,
//         password: formData.password
//       });
      
//       localStorage.setItem('authToken', response.access_token);
//       localStorage.setItem('user', JSON.stringify(response.user));
      
//       onRegister(response.user);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           <div className="text-center mb-8">
//             <div className="text-4xl mb-4">📝</div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">
//               Create Account
//             </h1>
//             <p className="text-gray-600">Join TMDB Box Office Predictor</p>
//           </div>

//           <div className="space-y-6">
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-red-500">⚠️</span>
//                   <span className="text-red-700 text-sm">{error}</span>
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 required
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
//                 placeholder="Choose a unique username"
//                 value={formData.username}
//                 onChange={(e) => setFormData({...formData, username: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 required
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
//                 placeholder="username@tsbi.in"
//                 value={formData.email}
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
//                 placeholder="Create a secure password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
//               />
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
//                 isLoading
//                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 transform hover:scale-105 shadow-lg'
//               }`}
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
//                   Creating Account...
//                 </div>
//               ) : (
//                 '✨ Create Account'
//               )}
//             </button>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600 text-sm">
//               Already have an account?{' '}
//               <button
//                 onClick={onNavigateToLogin}
//                 className="text-blue-600 hover:text-blue-700 font-semibold"
//               >
//                 Sign In
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;

import { useState } from "react";
import { apiService } from '../services/apiService';

function RegisterPage({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    console.log('🔍 Registration started with data:', {
      username: formData.username,
      email: formData.email,
      password: '***'
    });

    setError('');
    setSuccess(false);

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.endsWith('@tsbi.in')) {
      setError('Email must be from @tsbi.in domain');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      console.log('📡 Sending registration request...');
      
      const response = await apiService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      console.log('✅ Registration successful:', response);
      
      // Show success message
      setSuccess(true);
      
      // Clear form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        onNavigateToLogin();
      }, 2000);
      
    } catch (error) {
      console.error('❌ Registration failed:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Show success screen
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Account Created Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Your account has been created. You can now sign in with your credentials.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 text-sm">
                🎉 Welcome to TMDB Box Office Predictor!
              </p>
            </div>
            <button
              onClick={onNavigateToLogin}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg transition-all duration-200"
            >
              🔐 Go to Sign In
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Redirecting automatically in 2 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">📝</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join TMDB Box Office Predictor</p>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">Must be unique</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
                placeholder="username@tsbi.in"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">Must end with @tsbi.in</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 transform hover:scale-105 shadow-lg'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                '✨ Create Account'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;