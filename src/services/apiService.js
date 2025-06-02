
// // export const API_BASE_URL = 'http://127.0.0.1:8001';

// // export const apiService = {
// //     // Get auth token from localStorage
// //     getAuthToken: () => {
// //         const token = localStorage.getItem('authToken');
// //         console.log('🔑 getAuthToken called, token exists:', !!token);
// //         if (token) {
// //             console.log('🔑 Token preview:', token.substring(0, 20) + '...');
// //         }
// //         return token;
// //     },

// //     // Create auth headers
// //     getAuthHeaders: () => {
// //         const token = apiService.getAuthToken();
// //         const headers = {
// //             'Content-Type': 'application/json',
// //             ...(token && { 'Authorization': `Bearer ${token}` })
// //         };
// //         console.log('📋 Auth headers created:', {
// //             'Content-Type': headers['Content-Type'],
// //             'Authorization': headers.Authorization ? 'Bearer ***' : 'Not set'
// //         });
// //         return headers;
// //     },

// //     // Register user
// //     register: async (userData) => {
// //         console.log('📡 Making registration request to:', `${API_BASE_URL}/api/auth/register`);
// //         console.log('📝 Request data:', { ...userData, password: '***' });

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(userData)
// //             });

// //             console.log('📨 Response status:', response.status);

// //             const data = await response.json();
// //             console.log('📨 Response data:', data);

// //             if (!response.ok) {
// //                 console.error('❌ Registration failed with status:', response.status);
// //                 console.error('❌ Error details:', data);
// //                 throw new Error(data.detail || 'Registration failed');
// //             }

// //             console.log('✅ Registration successful - redirecting to login!');
// //             return data; // This now returns success message, not token
// //         } catch (error) {
// //             console.error('🚨 Network/Parse error:', error);

// //             if (error.name === 'TypeError' && error.message.includes('fetch')) {
// //                 throw new Error('Cannot connect to server. Is the backend running on http://localhost:8000?');
// //             }

// //             throw error;
// //         }
// //     },

// //     // Login user
// //     login: async (credentials) => {
// //         console.log('🔐 Making login request to:', `${API_BASE_URL}/api/auth/login`);
// //         console.log('📝 Login data:', { ...credentials, password: '***' });

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(credentials)
// //             });

// //             console.log('📨 Login response status:', response.status);

// //             const data = await response.json();
// //             console.log('📨 Login response data:', {
// //                 ...data,
// //                 access_token: data.access_token ? '***TOKEN***' : 'Not provided'
// //             });

// //             if (!response.ok) {
// //                 console.error('❌ Login failed with status:', response.status);
// //                 console.error('❌ Login error details:', data);
// //                 throw new Error(data.detail || 'Login failed');
// //             }

// //             console.log('✅ Login successful!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Login network/parse error:', error);
// //             throw error;
// //         }
// //     },

// //     // Verify token
// //     verifyToken: async () => {
// //         console.log('🔍 Making token verification request to:', `${API_BASE_URL}/api/auth/verify`);
        
// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             console.log('📋 Verify token headers:', headers);

// //             const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
// //                 headers: headers,
// //             });

// //             console.log('📨 Verify token response status:', response.status);

// //             const data = await response.json();
// //             console.log('📨 Verify token response data:', data);

// //             if (!response.ok) {
// //                 console.error('❌ Token verification failed with status:', response.status);
// //                 console.error('❌ Verification error details:', data);
// //                 throw new Error(data.detail || 'Token verification failed');
// //             }

// //             console.log('✅ Token verification successful!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Token verification error:', error);
// //             throw error;
// //         }
// //     },

// //     // Save prediction
// //     savePrediction: async (movieData, prediction) => {
// //         console.log('💾 Making save prediction request to:', `${API_BASE_URL}/api/predictions/save`);
// //         console.log('📝 Movie data to save:', movieData);
// //         console.log('📊 Prediction data to save:', prediction);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             console.log('📋 Save prediction headers:', headers);

// //             const requestBody = {
// //                 movie_data: movieData,
// //                 prediction: prediction
// //             };
// //             console.log('📦 Request body:', requestBody);

// //             const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
// //                 method: 'POST',
// //                 headers: headers,
// //                 body: JSON.stringify(requestBody)
// //             });

// //             console.log('📨 Save prediction response status:', response.status);
// //             console.log('📨 Save prediction response headers:', Object.fromEntries(response.headers.entries()));

// //             let data;
// //             try {
// //                 data = await response.json();
// //                 console.log('📨 Save prediction response data:', data);
// //             } catch (parseError) {
// //                 console.error('❌ Failed to parse save prediction response as JSON:', parseError);
// //                 const text = await response.text();
// //                 console.error('📨 Raw response text:', text);
// //                 throw new Error('Server returned invalid JSON response');
// //             }

// //             if (!response.ok) {
// //                 console.error('❌ Save prediction failed with status:', response.status);
// //                 console.error('❌ Save prediction error details:', data);
// //                 throw new Error(data.detail || 'Failed to save prediction');
// //             }

// //             console.log('✅ Prediction saved successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Save prediction error:', error);
// //             console.error('🚨 Save prediction error stack:', error.stack);
// //             throw error;
// //         }
// //     },

// //     // Get prediction history
// //     getPredictionHistory: async (limit = 50) => {
// //         console.log('📊 Making get prediction history request to:', `${API_BASE_URL}/api/predictions/history?limit=${limit}`);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             console.log('📋 Get history headers:', headers);

// //             const response = await fetch(`${API_BASE_URL}/api/predictions/history?limit=${limit}`, {
// //                 headers: headers,
// //             });

// //             console.log('📨 Get history response status:', response.status);
// //             console.log('📨 Get history response headers:', Object.fromEntries(response.headers.entries()));

// //             let data;
// //             try {
// //                 data = await response.json();
// //                 console.log('📨 Get history response data:', data);
// //                 console.log('📊 History data type:', typeof data, 'Array?', Array.isArray(data));
// //                 if (Array.isArray(data)) {
// //                     console.log('📊 History length:', data.length);
// //                 }
// //             } catch (parseError) {
// //                 console.error('❌ Failed to parse history response as JSON:', parseError);
// //                 const text = await response.text();
// //                 console.error('📨 Raw history response text:', text);
// //                 throw new Error('Server returned invalid JSON response');
// //             }

// //             if (!response.ok) {
// //                 console.error('❌ Get history failed with status:', response.status);
// //                 console.error('❌ Get history error details:', data);
// //                 throw new Error(data.detail || 'Failed to get prediction history');
// //             }

// //             console.log('✅ Prediction history retrieved successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Get history error:', error);
// //             console.error('🚨 Get history error stack:', error.stack);
// //             throw error;
// //         }
// //     },

// //     // Your existing movie prediction API
// //     predictMovie: async (movieData) => {
// //         console.log('🎬 Making movie prediction request to:', `${API_BASE_URL}/predict-ml`);
        
// //         const requestData = {
// //             Director: movieData.Director,
// //             Genre: movieData.Genre,
// //             Music_Director: movieData["Music Director"],
// //             Lead_Singer: movieData["Lead Singer"],
// //             Cast_1: movieData["Cast 1"],
// //             Cast_2: movieData["Cast 2"],
// //             Cast_3: movieData["Cast 3"],
// //             Cast_4: movieData["Cast 4"],
// //             Category: movieData.Category || "None"
// //         };
// //         console.log('📝 Prediction request data:', requestData);

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/predict-ml`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(requestData)
// //             });

// //             console.log('📨 Prediction response status:', response.status);
// //             console.log('📨 Prediction response headers:', Object.fromEntries(response.headers.entries()));

// //             let data;
// //             if (!response.ok) {
// //                 try {
// //                     const errorData = await response.json();
// //                     console.error('❌ Prediction failed with status:', response.status);
// //                     console.error('❌ Prediction error details:', errorData);
// //                     throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
// //                 } catch (parseError) {
// //                     console.error('❌ Failed to parse error response:', parseError);
// //                     const text = await response.text();
// //                     console.error('📨 Raw error response:', text);
// //                     throw new Error(`API Error: ${response.status} - Unable to parse error response`);
// //                 }
// //             }

// //             try {
// //                 data = await response.json();
// //                 console.log('📨 Prediction response data:', data);
// //             } catch (parseError) {
// //                 console.error('❌ Failed to parse prediction response as JSON:', parseError);
// //                 const text = await response.text();
// //                 console.error('📨 Raw prediction response text:', text);
// //                 throw new Error('Server returned invalid JSON response');
// //             }

// //             console.log('✅ Movie prediction completed successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Movie prediction error:', error);
// //             console.error('🚨 Movie prediction error stack:', error.stack);
// //             throw error;
// //         }
// //     },

// //     // Logout user
// //     logout: async () => {
// //         console.log('🚪 Making logout request to:', `${API_BASE_URL}/api/auth/logout`);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             console.log('📋 Logout headers:', headers);

// //             const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
// //                 method: 'POST',
// //                 headers: headers,
// //             });

// //             console.log('📨 Logout response status:', response.status);

// //             if (response.ok) {
// //                 const data = await response.json();
// //                 console.log('📨 Logout response data:', data);
// //                 console.log('✅ Logout successful!');
// //                 return data;
// //             } else {
// //                 console.warn('⚠️ Logout request failed, but continuing with client-side cleanup');
// //                 return { message: 'Logout completed (client-side)' };
// //             }
// //         } catch (error) {
// //             console.error('🚨 Logout error:', error);
// //             console.warn('⚠️ Logout request failed, but continuing with client-side cleanup');
// //             // Don't throw error for logout - continue with client-side cleanup
// //             return { message: 'Logout completed (client-side)' };
// //         }
// //     }
// // };
// // apiService.js - Updated for OTP-based authentication (No localStorage)
// export const API_BASE_URL = 'http://127.0.0.1:8001';

// export const apiService = {
//     // Get auth token from memory (no localStorage in artifacts)
//     getAuthToken: () => {
//         const token = window.authToken || null;
//         console.log('🔑 getAuthToken called, token exists:', !!token);
//         if (token) {
//             console.log('🔑 Token preview:', token.substring(0, 20) + '...');
//         }
//         return token;
//     },

//     // Set auth token in memory
//     setAuthToken: (token) => {
//         window.authToken = token;
//         console.log('🔑 Token set successfully');
//     },

//     // Clear auth token from memory
//     clearAuthToken: () => {
//         window.authToken = null;
//         console.log('🔑 Token cleared');
//     },

//     // Create auth headers
//     getAuthHeaders: () => {
//         const token = apiService.getAuthToken();
//         const headers = {
//             'Content-Type': 'application/json',
//             ...(token && { 'Authorization': `Bearer ${token}` })
//         };
//         console.log('📋 Auth headers created:', {
//             'Content-Type': headers['Content-Type'],
//             'Authorization': headers.Authorization ? 'Bearer ***' : 'Not set'
//         });
//         return headers;
//     },

//     // Request OTP
//     requestOTP: async (email) => {
//         console.log('📧 Making OTP request to:', `${API_BASE_URL}/api/auth/request-otp`);
//         console.log('📝 Email:', email);

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/auth/request-otp`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email })
//             });

//             console.log('📨 OTP request response status:', response.status);

//             const data = await response.json();
//             console.log('📨 OTP request response data:', data);

//             if (!response.ok) {
//                 console.error('❌ OTP request failed with status:', response.status);
//                 console.error('❌ Error details:', data);
//                 throw new Error(data.detail || 'Failed to send OTP');
//             }

//             console.log('✅ OTP request successful!');
//             return data;
//         } catch (error) {
//             console.error('🚨 OTP request error:', error);

//             if (error.name === 'TypeError' && error.message.includes('fetch')) {
//                 throw new Error('Cannot connect to server. Is the backend running on http://localhost:8001?');
//             }

//             throw error;
//         }
//     },

//     // Verify OTP and login
//     verifyOTP: async (email, otp) => {
//         console.log('🔐 Making OTP verification request to:', `${API_BASE_URL}/api/auth/verify-otp`);
//         console.log('📝 Verification data:', { email, otp: '***' });

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, otp })
//             });

//             console.log('📨 OTP verification response status:', response.status);

//             const data = await response.json();
//             console.log('📨 OTP verification response data:', {
//                 ...data,
//                 access_token: data.access_token ? '***TOKEN***' : 'Not provided'
//             });

//             if (!response.ok) {
//                 console.error('❌ OTP verification failed with status:', response.status);
//                 console.error('❌ Verification error details:', data);
//                 throw new Error(data.detail || 'OTP verification failed');
//             }

//             // Store the token
//             if (data.access_token) {
//                 apiService.setAuthToken(data.access_token);
//             }

//             console.log('✅ OTP verification successful!');
//             return data;
//         } catch (error) {
//             console.error('🚨 OTP verification error:', error);
//             throw error;
//         }
//     },

//     // Verify token
//     verifyToken: async () => {
//         console.log('🔍 Making token verification request to:', `${API_BASE_URL}/api/auth/verify`);
        
//         try {
//             const headers = apiService.getAuthHeaders();
//             console.log('📋 Verify token headers:', headers);

//             const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
//                 headers: headers,
//             });

//             console.log('📨 Verify token response status:', response.status);

//             const data = await response.json();
//             console.log('📨 Verify token response data:', data);

//             if (!response.ok) {
//                 console.error('❌ Token verification failed with status:', response.status);
//                 console.error('❌ Verification error details:', data);
//                 throw new Error(data.detail || 'Token verification failed');
//             }

//             console.log('✅ Token verification successful!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Token verification error:', error);
//             throw error;
//         }
//     },

//     // Save prediction
//     savePrediction: async (movieData, prediction) => {
//         console.log('💾 Making save prediction request to:', `${API_BASE_URL}/api/predictions/save`);
//         console.log('📝 Movie data to save:', movieData);
//         console.log('📊 Prediction data to save:', prediction);

//         try {
//             const headers = apiService.getAuthHeaders();
//             console.log('📋 Save prediction headers:', headers);

//             const requestBody = {
//                 movie_data: movieData,
//                 prediction: prediction
//             };
//             console.log('📦 Request body:', requestBody);

//             const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(requestBody)
//             });

//             console.log('📨 Save prediction response status:', response.status);

//             let data;
//             try {
//                 data = await response.json();
//                 console.log('📨 Save prediction response data:', data);
//             } catch (parseError) {
//                 console.error('❌ Failed to parse save prediction response as JSON:', parseError);
//                 const text = await response.text();
//                 console.error('📨 Raw response text:', text);
//                 throw new Error('Server returned invalid JSON response');
//             }

//             if (!response.ok) {
//                 console.error('❌ Save prediction failed with status:', response.status);
//                 console.error('❌ Save prediction error details:', data);
//                 throw new Error(data.detail || 'Failed to save prediction');
//             }

//             console.log('✅ Prediction saved successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Save prediction error:', error);
//             throw error;
//         }
//     },

//     // Get prediction history
//     getPredictionHistory: async (limit = 50) => {
//         console.log('📊 Making get prediction history request to:', `${API_BASE_URL}/api/predictions/history?limit=${limit}`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             console.log('📋 Get history headers:', headers);

//             const response = await fetch(`${API_BASE_URL}/api/predictions/history?limit=${limit}`, {
//                 headers: headers,
//             });

//             console.log('📨 Get history response status:', response.status);

//             let data;
//             try {
//                 data = await response.json();
//                 console.log('📨 Get history response data:', data);
//             } catch (parseError) {
//                 console.error('❌ Failed to parse history response as JSON:', parseError);
//                 const text = await response.text();
//                 console.error('📨 Raw history response text:', text);
//                 throw new Error('Server returned invalid JSON response');
//             }

//             if (!response.ok) {
//                 console.error('❌ Get history failed with status:', response.status);
//                 console.error('❌ Get history error details:', data);
//                 throw new Error(data.detail || 'Failed to get prediction history');
//             }

//             console.log('✅ Prediction history retrieved successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get history error:', error);
//             throw error;
//         }
//     },

//     // Movie prediction API
//     predictMovie: async (movieData) => {
//         console.log('🎬 Making movie prediction request to:', `${API_BASE_URL}/predict-ml`);
        
//         const requestData = {
//             Director: movieData.Director,
//             Genre: movieData.Genre,
//             Music_Director: movieData["Music Director"],
//             Lead_Singer: movieData["Lead Singer"],
//             Cast_1: movieData["Cast 1"],
//             Cast_2: movieData["Cast 2"],
//             Cast_3: movieData["Cast 3"],
//             Cast_4: movieData["Cast 4"],
//             Category: movieData.Category || "None"
//         };
//         console.log('📝 Prediction request data:', requestData);

//         try {
//             const response = await fetch(`${API_BASE_URL}/predict-ml`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData)
//             });

//             console.log('📨 Prediction response status:', response.status);

//             let data;
//             if (!response.ok) {
//                 try {
//                     const errorData = await response.json();
//                     console.error('❌ Prediction failed with status:', response.status);
//                     console.error('❌ Prediction error details:', errorData);
//                     throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
//                 } catch (parseError) {
//                     console.error('❌ Failed to parse error response:', parseError);
//                     const text = await response.text();
//                     console.error('📨 Raw error response:', text);
//                     throw new Error(`API Error: ${response.status} - Unable to parse error response`);
//                 }
//             }

//             try {
//                 data = await response.json();
//                 console.log('📨 Prediction response data:', data);
//             } catch (parseError) {
//                 console.error('❌ Failed to parse prediction response as JSON:', parseError);
//                 const text = await response.text();
//                 console.error('📨 Raw prediction response text:', text);
//                 throw new Error('Server returned invalid JSON response');
//             }

//             console.log('✅ Movie prediction completed successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Movie prediction error:', error);
//             throw error;
//         }
//     },

//     // Logout user
//     logout: async () => {
//         console.log('🚪 Making logout request to:', `${API_BASE_URL}/api/auth/logout`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             console.log('📋 Logout headers:', headers);

//             const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
//                 method: 'POST',
//                 headers: headers,
//             });

//             console.log('📨 Logout response status:', response.status);

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('📨 Logout response data:', data);
//             }

//             // Always clear token on logout
//             apiService.clearAuthToken();
//             console.log('✅ Logout completed!');
            
//             return { message: 'Logout successful' };
//         } catch (error) {
//             console.error('🚨 Logout error:', error);
//             // Still clear token even if server request fails
//             apiService.clearAuthToken();
//             return { message: 'Logout completed (client-side)' };
//         }
//     },

//     // Admin: Get all users
//     getAllUsers: async () => {
//         console.log('👥 Making get all users request to:', `${API_BASE_URL}/api/auth/admin/users`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             const response = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
//                 headers: headers,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || 'Failed to fetch users');
//             }

//             console.log('✅ Users fetched successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get users error:', error);
//             throw error;
//         }
//     },

//     // Admin: Get user predictions
//     getUserPredictions: async (userId) => {
//         console.log('🔍 Making get user predictions request to:', `${API_BASE_URL}/api/auth/admin/user/${userId}/predictions`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             const response = await fetch(`${API_BASE_URL}/api/auth/admin/user/${userId}/predictions`, {
//                 headers: headers,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || 'Failed to fetch user predictions');
//             }

//             console.log('✅ User predictions fetched successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get user predictions error:', error);
//             throw error;
//         }
//     },

//     // Admin: Get system stats
//     getAdminStats: async () => {
//         console.log('📊 Making get admin stats request to:', `${API_BASE_URL}/api/auth/admin/stats`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             const response = await fetch(`${API_BASE_URL}/api/auth/admin/stats`, {
//                 headers: headers,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || 'Failed to fetch admin stats');
//             }

//             console.log('✅ Admin stats fetched successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get admin stats error:', error);
//             throw error;
//         }
//     }
// };

// // export const API_BASE_URL = 'http://127.0.0.1:8001';

// // export const apiService = {
// //     // Get auth token from localStorage
// //     getAuthToken: () => {
// //         const token = localStorage.getItem('authToken');
// //         console.log('🔑 getAuthToken called, token exists:', !!token);
// //         if (token) {
// //             console.log('🔑 Token preview:', token.substring(0, 20) + '...');
// //         }
// //         return token;
// //     },

// //     // Create auth headers
// //     getAuthHeaders: () => {
// //         const token = apiService.getAuthToken();
// //         const headers = {
// //             'Content-Type': 'application/json',
// //             ...(token && { 'Authorization': `Bearer ${token}` })
// //         };
// //         console.log('📋 Auth headers created:', {
// //             'Content-Type': headers['Content-Type'],
// //             'Authorization': headers.Authorization ? 'Bearer ***' : 'Not set'
// //         });
// //         return headers;
// //     },

// //     // Register user
// //     register: async (userData) => {
// //         console.log('📡 Making registration request to:', `${API_BASE_URL}/api/auth/register`);
// //         console.log('📝 Request data:', { ...userData, password: '***' });

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(userData)
// //             });

// //             console.log('📨 Response status:', response.status);

// //             const data = await response.json();
// //             console.log('📨 Response data:', data);

// //             if (!response.ok) {
// //                 console.error('❌ Registration failed with status:', response.status);
// //                 console.error('❌ Error details:', data);
// //                 throw new Error(data.detail || 'Registration failed');
// //             }

// //             console.log('✅ Registration successful - redirecting to login!');
// //             return data; // This now returns success message, not token
// //         } catch (error) {
// //             console.error('🚨 Network/Parse error:', error);

// //             if (error.name === 'TypeError' && error.message.includes('fetch')) {
// //                 throw new Error('Cannot connect to server. Is the backend running on http://localhost:8000?');
// //             }

// //             throw error;
// //         }
// //     },

// //     // Login user
// //     login: async (credentials) => {
// //         console.log('🔐 Making login request to:', `${API_BASE_URL}/api/auth/login`);
// //         console.log('📝 Login data:', { ...credentials, password: '***' });

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(credentials)
// //             });

// //             console.log('📨 Login response status:', response.status);

// //             const data = await response.json();
// //             console.log('📨 Login response data:', {
// //                 ...data,
// //                 access_token: data.access_token ? '***TOKEN***' : 'Not provided'
// //             });

// //             if (!response.ok) {
// //                 console.error('❌ Login failed with status:', response.status);
// //                 console.error('❌ Login error details:', data);
// //                 throw new Error(data.detail || 'Login failed');
// //             }

// //             console.log('✅ Login successful!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Login network/parse error:', error);
// //             throw error;
// //         }
// //     },

// //     // Verify token
// //     verifyToken: async () => {
// //         console.log('🔍 Making token verification request to:', `${API_BASE_URL}/api/auth/verify`);
        
// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             console.log('📋 Verify token headers:', headers);

// //             const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
// //                 headers: headers,
// //             });

// //             console.log('📨 Verify token response status:', response.status);

// //             const data = await response.json();
// //             console.log('📨 Verify token response data:', data);

// //             if (!response.ok) {
// //                 console.error('❌ Token verification failed with status:', response.status);
// //                 console.error('❌ Verification error details:', data);
// //                 throw new Error(data.detail || 'Token verification failed');
// //             }

// //             console.log('✅ Token verification successful!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Token verification error:', error);
// //             throw error;
// //         }
// //     },

// //     // Save prediction
// //     savePrediction: async (movieData, prediction) => {
// //         console.log('💾 Making save prediction request to:', `${API_BASE_URL}/api/predictions/save`);
// //         console.log('📝 Movie data to save:', movieData);
// //         console.log('📊 Prediction data to save:', prediction);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             console.log('📋 Save prediction headers:', headers);

// //             const requestBody = {
// //                 movie_data: movieData,
// //                 prediction: prediction
// //             };
// //             console.log('📦 Request body:', requestBody);

// //             const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
// //                 method: 'POST',
// //                 headers: headers,
// //                 body: JSON.stringify(requestBody)
// //             });

// //             console.log('📨 Save prediction response status:', response.status);
// //             console.log('📨 Save prediction response headers:', Object.fromEntries(response.headers.entries()));

// //             let data;
// //             try {
// //                 data = await response.json();
// //                 console.log('📨 Save prediction response data:', data);
// //             } catch (parseError) {
// //                 console.error('❌ Failed to parse save prediction response as JSON:', parseError);
// //                 const text = await response.text();
// //                 console.error('📨 Raw response text:', text);
// //                 throw new Error('Server returned invalid JSON response');
// //             }

// //             if (!response.ok) {
// //                 console.error('❌ Save prediction failed with status:', response.status);
// //                 console.error('❌ Save prediction error details:', data);
// //                 throw new Error(data.detail || 'Failed to save prediction');
// //             }

// //             console.log('✅ Prediction saved successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Save prediction error:', error);
// //             console.error('🚨 Save prediction error stack:', error.stack);
// //             throw error;
// //         }
// //     },

// //     // Get prediction history
// //     getPredictionHistory: async (limit = 50) => {
// //         console.log('📊 Making get prediction history request to:', `${API_BASE_URL}/api/predictions/history?limit=${limit}`);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             console.log('📋 Get history headers:', headers);

// //             const response = await fetch(`${API_BASE_URL}/api/predictions/history?limit=${limit}`, {
// //                 headers: headers,
// //             });

// //             console.log('📨 Get history response status:', response.status);
// //             console.log('📨 Get history response headers:', Object.fromEntries(response.headers.entries()));

// //             let data;
// //             try {
// //                 data = await response.json();
// //                 console.log('📨 Get history response data:', data);
// //                 console.log('📊 History data type:', typeof data, 'Array?', Array.isArray(data));
// //                 if (Array.isArray(data)) {
// //                     console.log('📊 History length:', data.length);
// //                 }
// //             } catch (parseError) {
// //                 console.error('❌ Failed to parse history response as JSON:', parseError);
// //                 const text = await response.text();
// //                 console.error('📨 Raw history response text:', text);
// //                 throw new Error('Server returned invalid JSON response');
// //             }

// //             if (!response.ok) {
// //                 console.error('❌ Get history failed with status:', response.status);
// //                 console.error('❌ Get history error details:', data);
// //                 throw new Error(data.detail || 'Failed to get prediction history');
// //             }

// //             console.log('✅ Prediction history retrieved successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Get history error:', error);
// //             console.error('🚨 Get history error stack:', error.stack);
// //             throw error;
// //         }
// //     },

// //     // Your existing movie prediction API
// //     predictMovie: async (movieData) => {
// //         console.log('🎬 Making movie prediction request to:', `${API_BASE_URL}/predict-ml`);
        
// //         const requestData = {
// //             Director: movieData.Director,
// //             Genre: movieData.Genre,
// //             Music_Director: movieData["Music Director"],
// //             Lead_Singer: movieData["Lead Singer"],
// //             Cast_1: movieData["Cast 1"],
// //             Cast_2: movieData["Cast 2"],
// //             Cast_3: movieData["Cast 3"],
// //             Cast_4: movieData["Cast 4"],
// //             Category: movieData.Category || "None"
// //         };
// //         console.log('📝 Prediction request data:', requestData);

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/predict-ml`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify(requestData)
// //             });

// //             console.log('📨 Prediction response status:', response.status);
// //             console.log('📨 Prediction response headers:', Object.fromEntries(response.headers.entries()));

// //             let data;
// //             if (!response.ok) {
// //                 try {
// //                     const errorData = await response.json();
// //                     console.error('❌ Prediction failed with status:', response.status);
// //                     console.error('❌ Prediction error details:', errorData);
// //                     throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
// //                 } catch (parseError) {
// //                     console.error('❌ Failed to parse error response:', parseError);
// //                     const text = await response.text();
// //                     console.error('📨 Raw error response:', text);
// //                     throw new Error(`API Error: ${response.status} - Unable to parse error response`);
// //                 }
// //             }

// //             try {
// //                 data = await response.json();
// //                 console.log('📨 Prediction response data:', data);
// //             } catch (parseError) {
// //                 console.error('❌ Failed to parse prediction response as JSON:', parseError);
// //                 const text = await response.text();
// //                 console.error('📨 Raw prediction response text:', text);
// //                 throw new Error('Server returned invalid JSON response');
// //             }

// //             console.log('✅ Movie prediction completed successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Movie prediction error:', error);
// //             console.error('🚨 Movie prediction error stack:', error.stack);
// //             throw error;
// //         }
// //     },

// //     // Logout user
// //     logout: async () => {
// //         console.log('🚪 Making logout request to:', `${API_BASE_URL}/api/auth/logout`);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             console.log('📋 Logout headers:', headers);

// //             const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
// //                 method: 'POST',
// //                 headers: headers,
// //             });

// //             console.log('📨 Logout response status:', response.status);

// //             if (response.ok) {
// //                 const data = await response.json();
// //                 console.log('📨 Logout response data:', data);
// //                 console.log('✅ Logout successful!');
// //                 return data;
// //             } else {
// //                 console.warn('⚠️ Logout request failed, but continuing with client-side cleanup');
// //                 return { message: 'Logout completed (client-side)' };
// //             }
// //         } catch (error) {
// //             console.error('🚨 Logout error:', error);
// //             console.warn('⚠️ Logout request failed, but continuing with client-side cleanup');
// //             // Don't throw error for logout - continue with client-side cleanup
// //             return { message: 'Logout completed (client-side)' };
// //         }
// //     }
// // };
// // apiService.js - Updated for OTP-based authentication (No localStorage)
// export const API_BASE_URL = 'http://127.0.0.1:8001';

// export const apiService = {
//     // Get auth token from memory (no localStorage in artifacts)
//     getAuthToken: () => {
//         const token = window.authToken || null;
//         console.log('🔑 getAuthToken called, token exists:', !!token);
//         if (token) {
//             console.log('🔑 Token preview:', token.substring(0, 20) + '...');
//         }
//         return token;
//     },

//     // Set auth token in memory
//     setAuthToken: (token) => {
//         window.authToken = token;
//         console.log('🔑 Token set successfully');
//     },

//     // Clear auth token from memory
//     clearAuthToken: () => {
//         window.authToken = null;
//         console.log('🔑 Token cleared');
//     },

//     // Create auth headers
//     getAuthHeaders: () => {
//         const token = apiService.getAuthToken();
//         const headers = {
//             'Content-Type': 'application/json',
//             ...(token && { 'Authorization': `Bearer ${token}` })
//         };
//         console.log('📋 Auth headers created:', {
//             'Content-Type': headers['Content-Type'],
//             'Authorization': headers.Authorization ? 'Bearer ***' : 'Not set'
//         });
//         return headers;
//     },

//     // Request OTP
//     requestOTP: async (email) => {
//         console.log('📧 Making OTP request to:', `${API_BASE_URL}/api/auth/request-otp`);
//         console.log('📝 Email:', email);

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/auth/request-otp`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email })
//             });

//             console.log('📨 OTP request response status:', response.status);

//             const data = await response.json();
//             console.log('📨 OTP request response data:', data);

//             if (!response.ok) {
//                 console.error('❌ OTP request failed with status:', response.status);
//                 console.error('❌ Error details:', data);
//                 throw new Error(data.detail || 'Failed to send OTP');
//             }

//             console.log('✅ OTP request successful!');
//             return data;
//         } catch (error) {
//             console.error('🚨 OTP request error:', error);

//             if (error.name === 'TypeError' && error.message.includes('fetch')) {
//                 throw new Error('Cannot connect to server. Is the backend running on http://localhost:8001?');
//             }

//             throw error;
//         }
//     },

//     // Verify OTP and login
//     verifyOTP: async (email, otp) => {
//         console.log('🔐 Making OTP verification request to:', `${API_BASE_URL}/api/auth/verify-otp`);
//         console.log('📝 Verification data:', { email, otp: '***' });

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, otp })
//             });

//             console.log('📨 OTP verification response status:', response.status);

//             const data = await response.json();
//             console.log('📨 OTP verification response data:', {
//                 ...data,
//                 access_token: data.access_token ? '***TOKEN***' : 'Not provided'
//             });

//             if (!response.ok) {
//                 console.error('❌ OTP verification failed with status:', response.status);
//                 console.error('❌ Verification error details:', data);
//                 throw new Error(data.detail || 'OTP verification failed');
//             }

//             // Store the token
//             if (data.access_token) {
//                 apiService.setAuthToken(data.access_token);
//             }

//             console.log('✅ OTP verification successful!');
//             return data;
//         } catch (error) {
//             console.error('🚨 OTP verification error:', error);
//             throw error;
//         }
//     },

//     // Verify token
//     verifyToken: async () => {
//         console.log('🔍 Making token verification request to:', `${API_BASE_URL}/api/auth/verify`);
        
//         try {
//             const headers = apiService.getAuthHeaders();
//             console.log('📋 Verify token headers:', headers);

//             const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
//                 headers: headers,
//             });

//             console.log('📨 Verify token response status:', response.status);

//             const data = await response.json();
//             console.log('📨 Verify token response data:', data);

//             if (!response.ok) {
//                 console.error('❌ Token verification failed with status:', response.status);
//                 console.error('❌ Verification error details:', data);
//                 throw new Error(data.detail || 'Token verification failed');
//             }

//             console.log('✅ Token verification successful!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Token verification error:', error);
//             throw error;
//         }
//     },

//     // Save prediction
//     savePrediction: async (movieData, prediction) => {
//         console.log('💾 Making save prediction request to:', `${API_BASE_URL}/api/predictions/save`);
//         console.log('📝 Movie data to save:', movieData);
//         console.log('📊 Prediction data to save:', prediction);

//         try {
//             const headers = apiService.getAuthHeaders();
//             console.log('📋 Save prediction headers:', headers);

//             const requestBody = {
//                 movie_data: movieData,
//                 prediction: prediction
//             };
//             console.log('📦 Request body:', requestBody);

//             const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(requestBody)
//             });

//             console.log('📨 Save prediction response status:', response.status);

//             let data;
//             try {
//                 data = await response.json();
//                 console.log('📨 Save prediction response data:', data);
//             } catch (parseError) {
//                 console.error('❌ Failed to parse save prediction response as JSON:', parseError);
//                 const text = await response.text();
//                 console.error('📨 Raw response text:', text);
//                 throw new Error('Server returned invalid JSON response');
//             }

//             if (!response.ok) {
//                 console.error('❌ Save prediction failed with status:', response.status);
//                 console.error('❌ Save prediction error details:', data);
//                 throw new Error(data.detail || 'Failed to save prediction');
//             }

//             console.log('✅ Prediction saved successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Save prediction error:', error);
//             throw error;
//         }
//     },

//     // Get prediction history
//     getPredictionHistory: async (limit = 50) => {
//         console.log('📊 Making get prediction history request to:', `${API_BASE_URL}/api/predictions/history?limit=${limit}`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             console.log('📋 Get history headers:', headers);

//             const response = await fetch(`${API_BASE_URL}/api/predictions/history?limit=${limit}`, {
//                 headers: headers,
//             });

//             console.log('📨 Get history response status:', response.status);

//             let data;
//             try {
//                 data = await response.json();
//                 console.log('📨 Get history response data:', data);
//             } catch (parseError) {
//                 console.error('❌ Failed to parse history response as JSON:', parseError);
//                 const text = await response.text();
//                 console.error('📨 Raw history response text:', text);
//                 throw new Error('Server returned invalid JSON response');
//             }

//             if (!response.ok) {
//                 console.error('❌ Get history failed with status:', response.status);
//                 console.error('❌ Get history error details:', data);
//                 throw new Error(data.detail || 'Failed to get prediction history');
//             }

//             console.log('✅ Prediction history retrieved successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get history error:', error);
//             throw error;
//         }
//     },

//     // Movie prediction API
//     predictMovie: async (movieData) => {
//         console.log('🎬 Making movie prediction request to:', `${API_BASE_URL}/predict-ml`);
        
//         const requestData = {
//             Director: movieData.Director,
//             Genre: movieData.Genre,
//             Music_Director: movieData["Music Director"],
//             Lead_Singer: movieData["Lead Singer"],
//             Cast_1: movieData["Cast 1"],
//             Cast_2: movieData["Cast 2"],
//             Cast_3: movieData["Cast 3"],
//             Cast_4: movieData["Cast 4"],
//             Category: movieData.Category || "None"
//         };
//         console.log('📝 Prediction request data:', requestData);

//         try {
//             const response = await fetch(`${API_BASE_URL}/predict-ml`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestData)
//             });

//             console.log('📨 Prediction response status:', response.status);

//             let data;
//             if (!response.ok) {
//                 try {
//                     const errorData = await response.json();
//                     console.error('❌ Prediction failed with status:', response.status);
//                     console.error('❌ Prediction error details:', errorData);
//                     throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
//                 } catch (parseError) {
//                     console.error('❌ Failed to parse error response:', parseError);
//                     const text = await response.text();
//                     console.error('📨 Raw error response:', text);
//                     throw new Error(`API Error: ${response.status} - Unable to parse error response`);
//                 }
//             }

//             try {
//                 data = await response.json();
//                 console.log('📨 Prediction response data:', data);
//             } catch (parseError) {
//                 console.error('❌ Failed to parse prediction response as JSON:', parseError);
//                 const text = await response.text();
//                 console.error('📨 Raw prediction response text:', text);
//                 throw new Error('Server returned invalid JSON response');
//             }

//             console.log('✅ Movie prediction completed successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Movie prediction error:', error);
//             throw error;
//         }
//     },

//     // Logout user
//     logout: async () => {
//         console.log('🚪 Making logout request to:', `${API_BASE_URL}/api/auth/logout`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             console.log('📋 Logout headers:', headers);

//             const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
//                 method: 'POST',
//                 headers: headers,
//             });

//             console.log('📨 Logout response status:', response.status);

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('📨 Logout response data:', data);
//             }

//             // Always clear token on logout
//             apiService.clearAuthToken();
//             console.log('✅ Logout completed!');
            
//             return { message: 'Logout successful' };
//         } catch (error) {
//             console.error('🚨 Logout error:', error);
//             // Still clear token even if server request fails
//             apiService.clearAuthToken();
//             return { message: 'Logout completed (client-side)' };
//         }
//     },

//     // Admin: Get all users
//     getAllUsers: async () => {
//         console.log('👥 Making get all users request to:', `${API_BASE_URL}/api/auth/admin/users`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             const response = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
//                 headers: headers,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || 'Failed to fetch users');
//             }

//             console.log('✅ Users fetched successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get users error:', error);
//             throw error;
//         }
//     },

//     // Admin: Get user predictions
//     getUserPredictions: async (userId) => {
//         console.log('🔍 Making get user predictions request to:', `${API_BASE_URL}/api/auth/admin/user/${userId}/predictions`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             const response = await fetch(`${API_BASE_URL}/api/auth/admin/user/${userId}/predictions`, {
//                 headers: headers,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || 'Failed to fetch user predictions');
//             }

//             console.log('✅ User predictions fetched successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get user predictions error:', error);
//             throw error;
//         }
//     },

//     // Admin: Get system stats
//     getAdminStats: async () => {
//         console.log('📊 Making get admin stats request to:', `${API_BASE_URL}/api/auth/admin/stats`);

//         try {
//             const headers = apiService.getAuthHeaders();
//             const response = await fetch(`${API_BASE_URL}/api/auth/admin/stats`, {
//                 headers: headers,
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.detail || 'Failed to fetch admin stats');
//             }

//             console.log('✅ Admin stats fetched successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get admin stats error:', error);
//             throw error;
//         }
//     }
// };
export const API_BASE_URL = 'https://box-office-tool-backend.onrender.com';

export const apiService = {
    // Get auth token from localStorage with fallback
    getAuthToken: () => {
        let token = null;
        try {
            // Try localStorage first (for real applications)
            token = localStorage.getItem('authToken');
            console.log('🔑 Token from localStorage:', !!token);
        } catch (e) {
            // Fallback to memory for environments that don't support localStorage
            token = window.authToken || null;
            console.log('🔑 Token from memory (localStorage not available):', !!token);
        }
        
        if (token) {
            console.log('🔑 Token preview:', token.substring(0, 20) + '...');
        }
        return token;
    },

    // Set auth token with localStorage
    setAuthToken: (token) => {
        try {
            // Save to localStorage (persists across page refreshes)
            localStorage.setItem('authToken', token);
            console.log('🔑 Token saved to localStorage');
        } catch (e) {
            // Fallback to memory for environments that don't support localStorage
            window.authToken = token;
            console.log('🔑 Token saved to memory (localStorage not available)');
        }
    },

    // Clear auth token from localStorage
    clearAuthToken: () => {
        try {
            localStorage.removeItem('authToken');
            console.log('🔑 Token removed from localStorage');
        } catch (e) {
            // Fallback for environments that don't support localStorage
            window.authToken = null;
            console.log('🔑 Token cleared from memory');
        }
    },

    // Store user data for quick access
    setUserData: (userData) => {
        try {
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('👤 User data saved to localStorage');
        } catch (e) {
            window.userData = userData;
            console.log('👤 User data saved to memory');
        }
    },

    // Get stored user data
    getUserData: () => {
        try {
            const userData = localStorage.getItem('userData');
            return userData ? JSON.parse(userData) : null;
        } catch (e) {
            return window.userData || null;
        }
    },

    // Clear user data
    clearUserData: () => {
        try {
            localStorage.removeItem('userData');
            console.log('👤 User data removed from localStorage');
        } catch (e) {
            window.userData = null;
            console.log('👤 User data cleared from memory');
        }
    },

    // Check if token is valid (basic JWT validation)
    isTokenValid: () => {
        const token = apiService.getAuthToken();
        if (!token) return false;
        
        try {
            // Basic JWT validation
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            
            return payload.exp > currentTime;
        } catch (error) {
            console.error('❌ Token validation error:', error);
            return false;
        }
    },

    // Create auth headers
    getAuthHeaders: () => {
        const token = apiService.getAuthToken();
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
        console.log('📋 Auth headers created:', {
            'Content-Type': headers['Content-Type'],
            'Authorization': headers.Authorization ? 'Bearer ***' : 'Not set'
        });
        return headers;
    },

    // Handle API errors (auto-logout on 401)
    handleApiError: (error, response) => {
        if (response && response.status === 401) {
            console.log('🚨 Unauthorized - clearing session');
            apiService.clearAuthToken();
            apiService.clearUserData();
            // Force redirect to login
            window.location.reload();
        }
        throw error;
    },

    // Request OTP
    requestOTP: async (email) => {
        console.log('📧 Making OTP request to:', `${API_BASE_URL}/api/auth/request-otp`);
        console.log('📝 Email:', email);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/request-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            console.log('📨 OTP request response status:', response.status);

            const data = await response.json();
            console.log('📨 OTP request response data:', data);

            if (!response.ok) {
                console.error('❌ OTP request failed with status:', response.status);
                console.error('❌ Error details:', data);
                throw new Error(data.detail || 'Failed to send OTP');
            }

            console.log('✅ OTP request successful!');
            return data;
        } catch (error) {
            console.error('🚨 OTP request error:', error);

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Cannot connect to server. Is the backend running on http://localhost:8001?');
            }

            throw error;
        }
    },

    // Verify OTP and login
    verifyOTP: async (email, otp) => {
        console.log('🔐 Making OTP verification request to:', `${API_BASE_URL}/api/auth/verify-otp`);
        console.log('📝 Verification data:', { email, otp: '***' });

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp })
            });

            console.log('📨 OTP verification response status:', response.status);

            const data = await response.json();
            console.log('📨 OTP verification response data:', {
                ...data,
                access_token: data.access_token ? '***TOKEN***' : 'Not provided'
            });

            if (!response.ok) {
                console.error('❌ OTP verification failed with status:', response.status);
                console.error('❌ Verification error details:', data);
                apiService.handleApiError(new Error(data.detail || 'OTP verification failed'), response);
            }

            // Store the token and user data
            if (data.access_token) {
                apiService.setAuthToken(data.access_token);
            }
            if (data.user) {
                apiService.setUserData(data.user);
            }

            console.log('✅ OTP verification successful!');
            return data;
        } catch (error) {
            console.error('🚨 OTP verification error:', error);
            throw error;
        }
    },

    // Verify token
    verifyToken: async () => {
        console.log('🔍 Making token verification request to:', `${API_BASE_URL}/api/auth/verify`);
        
        try {
            const headers = apiService.getAuthHeaders();
            console.log('📋 Verify token headers:', headers);

            const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
                headers: headers,
            });

            console.log('📨 Verify token response status:', response.status);

            const data = await response.json();
            console.log('📨 Verify token response data:', data);

            if (!response.ok) {
                console.error('❌ Token verification failed with status:', response.status);
                console.error('❌ Verification error details:', data);
                apiService.handleApiError(new Error(data.detail || 'Token verification failed'), response);
            }

            // Update stored user data
            if (data) {
                apiService.setUserData(data);
            }

            console.log('✅ Token verification successful!');
            return data;
        } catch (error) {
            console.error('🚨 Token verification error:', error);
            throw error;
        }
    },

    // Save prediction
    savePrediction: async (movieData, prediction) => {
        console.log('💾 Making save prediction request to:', `${API_BASE_URL}/api/predictions/save`);
        console.log('📝 Movie data to save:', movieData);
        console.log('📊 Prediction data to save:', prediction);

        try {
            const headers = apiService.getAuthHeaders();
            console.log('📋 Save prediction headers:', headers);

            const requestBody = {
                movie_data: movieData,
                prediction: prediction
            };
            console.log('📦 Request body:', requestBody);

            const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            console.log('📨 Save prediction response status:', response.status);

            let data;
            try {
                data = await response.json();
                console.log('📨 Save prediction response data:', data);
            } catch (parseError) {
                console.error('❌ Failed to parse save prediction response as JSON:', parseError);
                const text = await response.text();
                console.error('📨 Raw response text:', text);
                throw new Error('Server returned invalid JSON response');
            }

            if (!response.ok) {
                console.error('❌ Save prediction failed with status:', response.status);
                console.error('❌ Save prediction error details:', data);
                apiService.handleApiError(new Error(data.detail || 'Failed to save prediction'), response);
            }

            console.log('✅ Prediction saved successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Save prediction error:', error);
            throw error;
        }
    },

    // Get prediction history
    getPredictionHistory: async (limit = 50) => {
        console.log('📊 Making get prediction history request to:', `${API_BASE_URL}/api/predictions/history?limit=${limit}`);

        try {
            const headers = apiService.getAuthHeaders();
            console.log('📋 Get history headers:', headers);

            const response = await fetch(`${API_BASE_URL}/api/predictions/history?limit=${limit}`, {
                headers: headers,
            });

            console.log('📨 Get history response status:', response.status);

            let data;
            try {
                data = await response.json();
                console.log('📨 Get history response data:', data);
            } catch (parseError) {
                console.error('❌ Failed to parse history response as JSON:', parseError);
                const text = await response.text();
                console.error('📨 Raw history response text:', text);
                throw new Error('Server returned invalid JSON response');
            }

            if (!response.ok) {
                console.error('❌ Get history failed with status:', response.status);
                console.error('❌ Get history error details:', data);
                apiService.handleApiError(new Error(data.detail || 'Failed to get prediction history'), response);
            }

            console.log('✅ Prediction history retrieved successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Get history error:', error);
            throw error;
        }
    },

    // Movie prediction API
    predictMovie: async (movieData) => {
        console.log('🎬 Making movie prediction request to:', `${API_BASE_URL}/predict-ml`);
        
        const requestData = {
            Director: movieData.Director,
            Genre: movieData.Genre,
            Music_Director: movieData["Music Director"],
            Lead_Singer: movieData["Lead Singer"],
            Cast_1: movieData["Cast 1"],
            Cast_2: movieData["Cast 2"],
            Cast_3: movieData["Cast 3"],
            Cast_4: movieData["Cast 4"],
            Category: movieData.Category || "None"
        };
        console.log('📝 Prediction request data:', requestData);

        try {
            const response = await fetch(`${API_BASE_URL}/predict-ml`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            console.log('📨 Prediction response status:', response.status);

            let data;
            if (!response.ok) {
                try {
                    const errorData = await response.json();
                    console.error('❌ Prediction failed with status:', response.status);
                    console.error('❌ Prediction error details:', errorData);
                    throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
                } catch (parseError) {
                    console.error('❌ Failed to parse error response:', parseError);
                    const text = await response.text();
                    console.error('📨 Raw error response:', text);
                    throw new Error(`API Error: ${response.status} - Unable to parse error response`);
                }
            }

            try {
                data = await response.json();
                console.log('📨 Prediction response data:', data);
            } catch (parseError) {
                console.error('❌ Failed to parse prediction response as JSON:', parseError);
                const text = await response.text();
                console.error('📨 Raw prediction response text:', text);
                throw new Error('Server returned invalid JSON response');
            }

            console.log('✅ Movie prediction completed successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Movie prediction error:', error);
            throw error;
        }
    },

    // Logout user (with complete cleanup)
    logout: async () => {
        console.log('🚪 Making logout request to:', `${API_BASE_URL}/api/auth/logout`);

        try {
            const headers = apiService.getAuthHeaders();
            console.log('📋 Logout headers:', headers);

            const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                headers: headers,
            });

            console.log('📨 Logout response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('📨 Logout response data:', data);
            }
        } catch (error) {
            console.error('🚨 Logout API error:', error);
            // Continue with client-side cleanup even if API fails
        }

        // Always clear all stored data on logout
        apiService.clearAuthToken();
        apiService.clearUserData();
        console.log('✅ Complete logout finished!');
        
        return { message: 'Logout successful' };
    },

    // Admin: Get all users
    getAllUsers: async () => {
        console.log('👥 Making get all users request to:', `${API_BASE_URL}/api/auth/admin/users`);

        try {
            const headers = apiService.getAuthHeaders();
            const response = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
                headers: headers,
            });

            const data = await response.json();

            if (!response.ok) {
                apiService.handleApiError(new Error(data.detail || 'Failed to fetch users'), response);
            }

            console.log('✅ Users fetched successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Get users error:', error);
            throw error;
        }
    },

    // Admin: Get user predictions
    getUserPredictions: async (userId) => {
        console.log('🔍 Making get user predictions request to:', `${API_BASE_URL}/api/auth/admin/user/${userId}/predictions`);

        try {
            const headers = apiService.getAuthHeaders();
            const response = await fetch(`${API_BASE_URL}/api/auth/admin/user/${userId}/predictions`, {
                headers: headers,
            });

            const data = await response.json();

            if (!response.ok) {
                apiService.handleApiError(new Error(data.detail || 'Failed to fetch user predictions'), response);
            }

            console.log('✅ User predictions fetched successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Get user predictions error:', error);
            throw error;
        }
    },

    // Admin: Get system stats
    getAdminStats: async () => {
        console.log('📊 Making get admin stats request to:', `${API_BASE_URL}/api/auth/admin/stats`);

        try {
            const headers = apiService.getAuthHeaders();
            const response = await fetch(`${API_BASE_URL}/api/auth/admin/stats`, {
                headers: headers,
            });

            const data = await response.json();

            if (!response.ok) {
                apiService.handleApiError(new Error(data.detail || 'Failed to fetch admin stats'), response);
            }

            console.log('✅ Admin stats fetched successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Get admin stats error:', error);
            throw error;
        }
    }
};