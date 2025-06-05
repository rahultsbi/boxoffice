
// // export const API_BASE_URL = 'http://localhost:8001'; // Update with your backend URL

// // export const apiService = {
// //     // Get auth token from localStorage with fallback
// //     getAuthToken: () => {
// //         let token = null;
// //         try {
// //             // Try localStorage first (for real applications)
// //             token = localStorage.getItem('authToken');
// //             console.log('🔑 Token from localStorage:', !!token);
// //         } catch (e) {
// //             // Fallback to memory for environments that don't support localStorage
// //             token = window.authToken || null;
// //             console.log('🔑 Token from memory (localStorage not available):', !!token);
// //         }
        
// //         if (token) {
// //             console.log('🔑 Token preview:', token.substring(0, 20) + '...');
// //         }
// //         return token;
// //     },

// //     // Set auth token with localStorage
// //     setAuthToken: (token) => {
// //         try {
// //             // Save to localStorage (persists across page refreshes)
// //             localStorage.setItem('authToken', token);
// //             console.log('🔑 Token saved to localStorage');
// //         } catch (e) {
// //             // Fallback to memory for environments that don't support localStorage
// //             window.authToken = token;
// //             console.log('🔑 Token saved to memory (localStorage not available)');
// //         }
// //     },

// //     // Clear auth token from localStorage
// //     clearAuthToken: () => {
// //         try {
// //             localStorage.removeItem('authToken');
// //             console.log('🔑 Token removed from localStorage');
// //         } catch (e) {
// //             // Fallback for environments that don't support localStorage
// //             window.authToken = null;
// //             console.log('🔑 Token cleared from memory');
// //         }
// //     },

// //     // Store user data for quick access
// //     setUserData: (userData) => {
// //         try {
// //             localStorage.setItem('userData', JSON.stringify(userData));
// //             console.log('👤 User data saved to localStorage');
// //         } catch (e) {
// //             window.userData = userData;
// //             console.log('👤 User data saved to memory');
// //         }
// //     },

// //     // Get stored user data
// //     getUserData: () => {
// //         try {
// //             const userData = localStorage.getItem('userData');
// //             return userData ? JSON.parse(userData) : null;
// //         } catch (e) {
// //             return window.userData || null;
// //         }
// //     },

// //     // Clear user data
// //     clearUserData: () => {
// //         try {
// //             localStorage.removeItem('userData');
// //             console.log('👤 User data removed from localStorage');
// //         } catch (e) {
// //             window.userData = null;
// //             console.log('👤 User data cleared from memory');
// //         }
// //     },

// //     // Check if token is valid (basic JWT validation)
// //     isTokenValid: () => {
// //         const token = apiService.getAuthToken();
// //         if (!token) return false;
        
// //         try {
// //             // Basic JWT validation
// //             const payload = JSON.parse(atob(token.split('.')[1]));
// //             const currentTime = Date.now() / 1000;
            
// //             return payload.exp > currentTime;
// //         } catch (error) {
// //             console.error('❌ Token validation error:', error);
// //             return false;
// //         }
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

// //     // Handle API errors (auto-logout on 401)
// //     handleApiError: (error, response) => {
// //         if (response && response.status === 401) {
// //             console.log('🚨 Unauthorized - clearing session');
// //             apiService.clearAuthToken();
// //             apiService.clearUserData();
// //             // Force redirect to login
// //             window.location.reload();
// //         }
// //         throw error;
// //     },

// //     // Request OTP
// //     requestOTP: async (email) => {
// //         console.log('📧 Making OTP request to:', `${API_BASE_URL}/api/auth/request-otp`);
// //         console.log('📝 Email:', email);

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/api/auth/request-otp`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ email })
// //             });

// //             console.log('📨 OTP request response status:', response.status);

// //             const data = await response.json();
// //             console.log('📨 OTP request response data:', data);

// //             if (!response.ok) {
// //                 console.error('❌ OTP request failed with status:', response.status);
// //                 console.error('❌ Error details:', data);
// //                 throw new Error(data.detail || 'Failed to send OTP');
// //             }

// //             console.log('✅ OTP request successful!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 OTP request error:', error);

// //             if (error.name === 'TypeError' && error.message.includes('fetch')) {
// //                 throw new Error('Cannot connect to server. Is the backend running on http://localhost:8001?');
// //             }

// //             throw error;
// //         }
// //     },

// //     // Verify OTP and login
// //     verifyOTP: async (email, otp) => {
// //         console.log('🔐 Making OTP verification request to:', `${API_BASE_URL}/api/auth/verify-otp`);
// //         console.log('📝 Verification data:', { email, otp: '***' });

// //         try {
// //             const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ email, otp })
// //             });

// //             console.log('📨 OTP verification response status:', response.status);

// //             const data = await response.json();
// //             console.log('📨 OTP verification response data:', {
// //                 ...data,
// //                 access_token: data.access_token ? '***TOKEN***' : 'Not provided'
// //             });

// //             if (!response.ok) {
// //                 console.error('❌ OTP verification failed with status:', response.status);
// //                 console.error('❌ Verification error details:', data);
// //                 apiService.handleApiError(new Error(data.detail || 'OTP verification failed'), response);
// //             }

// //             // Store the token and user data
// //             if (data.access_token) {
// //                 apiService.setAuthToken(data.access_token);
// //             }
// //             if (data.user) {
// //                 apiService.setUserData(data.user);
// //             }

// //             console.log('✅ OTP verification successful!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 OTP verification error:', error);
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
// //                 apiService.handleApiError(new Error(data.detail || 'Token verification failed'), response);
// //             }

// //             // Update stored user data
// //             if (data) {
// //                 apiService.setUserData(data);
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
// //                 apiService.handleApiError(new Error(data.detail || 'Failed to save prediction'), response);
// //             }

// //             console.log('✅ Prediction saved successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Save prediction error:', error);
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

// //             let data;
// //             try {
// //                 data = await response.json();
// //                 console.log('📨 Get history response data:', data);
// //             } catch (parseError) {
// //                 console.error('❌ Failed to parse history response as JSON:', parseError);
// //                 const text = await response.text();
// //                 console.error('📨 Raw history response text:', text);
// //                 throw new Error('Server returned invalid JSON response');
// //             }

// //             if (!response.ok) {
// //                 console.error('❌ Get history failed with status:', response.status);
// //                 console.error('❌ Get history error details:', data);
// //                 apiService.handleApiError(new Error(data.detail || 'Failed to get prediction history'), response);
// //             }

// //             console.log('✅ Prediction history retrieved successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Get history error:', error);
// //             throw error;
// //         }
// //     },

// //     // Movie prediction API
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
// //             throw error;
// //         }
// //     },

// //     // Logout user (with complete cleanup)
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
// //             }
// //         } catch (error) {
// //             console.error('🚨 Logout API error:', error);
// //             // Continue with client-side cleanup even if API fails
// //         }

// //         // Always clear all stored data on logout
// //         apiService.clearAuthToken();
// //         apiService.clearUserData();
// //         console.log('✅ Complete logout finished!');
        
// //         return { message: 'Logout successful' };
// //     },

// //     // Admin: Get all users
// //     getAllUsers: async () => {
// //         console.log('👥 Making get all users request to:', `${API_BASE_URL}/api/auth/admin/users`);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             const response = await fetch(`${API_BASE_URL}/api/auth/admin/users`, {
// //                 headers: headers,
// //             });

// //             const data = await response.json();

// //             if (!response.ok) {
// //                 apiService.handleApiError(new Error(data.detail || 'Failed to fetch users'), response);
// //             }

// //             console.log('✅ Users fetched successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Get users error:', error);
// //             throw error;
// //         }
// //     },

// //     // Admin: Get user predictions
// //     getUserPredictions: async (userId) => {
// //         console.log('🔍 Making get user predictions request to:', `${API_BASE_URL}/api/auth/admin/user/${userId}/predictions`);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             const response = await fetch(`${API_BASE_URL}/api/auth/admin/user/${userId}/predictions`, {
// //                 headers: headers,
// //             });

// //             const data = await response.json();

// //             if (!response.ok) {
// //                 apiService.handleApiError(new Error(data.detail || 'Failed to fetch user predictions'), response);
// //             }

// //             console.log('✅ User predictions fetched successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Get user predictions error:', error);
// //             throw error;
// //         }
// //     },

// //     // Admin: Get system stats
// //     getAdminStats: async () => {
// //         console.log('📊 Making get admin stats request to:', `${API_BASE_URL}/api/auth/admin/stats`);

// //         try {
// //             const headers = apiService.getAuthHeaders();
// //             const response = await fetch(`${API_BASE_URL}/api/auth/admin/stats`, {
// //                 headers: headers,
// //             });

// //             const data = await response.json();

// //             if (!response.ok) {
// //                 apiService.handleApiError(new Error(data.detail || 'Failed to fetch admin stats'), response);
// //             }

// //             console.log('✅ Admin stats fetched successfully!');
// //             return data;
// //         } catch (error) {
// //             console.error('🚨 Get admin stats error:', error);
// //             throw error;
// //         }
// //     },

// //     getExcelData: async () => {
// //     console.log('📊 Getting Excel data...');
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/excel-data`);
// //       if (!response.ok) {
// //         throw new Error(`API Error: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       console.log('✅ Excel data retrieved successfully!');
// //       return data;
// //     } catch (error) {
// //       console.error('🚨 Excel data error:', error);
// //       throw error;
// //     }
// //   },

// //   // Excel Step 1 Prediction
// //   predictExcelStep1: async (stepData) => {
// //     console.log('🎬 Excel Step 1 prediction...');
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/predict-excel-step1`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(stepData)
// //       });
// //       if (!response.ok) {
// //         throw new Error(`API Error: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       console.log('✅ Excel Step 1 completed!');
// //       return data;
// //     } catch (error) {
// //       console.error('🚨 Excel Step 1 error:', error);
// //       throw error;
// //     }
// //   },

// //   // Excel Step 2 Prediction
// //   predictExcelStep2: async (stepData) => {
// //     console.log('📈 Excel Step 2 prediction...');
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/predict-excel-step2`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(stepData)
// //       });
// //       if (!response.ok) {
// //         throw new Error(`API Error: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       console.log('✅ Excel Step 2 completed!');
// //       return data;
// //     } catch (error) {
// //       console.error('🚨 Excel Step 2 error:', error);
// //       throw error;
// //     }
// //   },

// //   // Excel Step 3 Prediction
// //   predictExcelStep3: async (stepData) => {
// //     console.log('⭐ Excel Step 3 prediction...');
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/predict-excel-step3`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(stepData)
// //       });
// //       if (!response.ok) {
// //         throw new Error(`API Error: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       console.log('✅ Excel Step 3 completed!');
// //       return data;
// //     } catch (error) {
// //       console.error('🚨 Excel Step 3 error:', error);
// //       throw error;
// //     }
// //   },

// //   // Refresh Excel data
// //   refreshExcelData: async () => {
// //     console.log('🔄 Refreshing Excel data...');
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/refresh-excel-data`, {
// //         method: 'POST'
// //       });
// //       if (!response.ok) {
// //         throw new Error(`API Error: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       console.log('✅ Excel data refreshed!');
// //       return data;
// //     } catch (error) {
// //       console.error('🚨 Excel refresh error:', error);
// //       throw error;
// //     }
// //   },

// //   // Get Excel stats
// //   getExcelStats: async () => {
// //     console.log('📊 Getting Excel stats...');
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/excel-stats`);
// //       if (!response.ok) {
// //         throw new Error(`API Error: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       console.log('✅ Excel stats retrieved!');
// //       return data;
// //     } catch (error) {
// //       console.error('🚨 Excel stats error:', error);
// //       throw error;
// //     }
// //   }
// // };
// export const API_BASE_URL = 'http://localhost:8001'; // Update with your backend URL

// export const apiService = {
//     // Get auth token from localStorage with fallback
//     getAuthToken: () => {
//         let token = null;
//         try {
//             // Try localStorage first (for real applications)
//             token = localStorage.getItem('authToken');
//             console.log('🔑 Token from localStorage:', !!token);
//         } catch (e) {
//             // Fallback to memory for environments that don't support localStorage
//             token = window.authToken || null;
//             console.log('🔑 Token from memory (localStorage not available):', !!token);
//         }
        
//         if (token) {
//             console.log('🔑 Token preview:', token.substring(0, 20) + '...');
//         }
//         return token;
//     },

//     // Set auth token with localStorage
//     setAuthToken: (token) => {
//         try {
//             // Save to localStorage (persists across page refreshes)
//             localStorage.setItem('authToken', token);
//             console.log('🔑 Token saved to localStorage');
//         } catch (e) {
//             // Fallback to memory for environments that don't support localStorage
//             window.authToken = token;
//             console.log('🔑 Token saved to memory (localStorage not available)');
//         }
//     },

//     // Clear auth token from localStorage
//     clearAuthToken: () => {
//         try {
//             localStorage.removeItem('authToken');
//             console.log('🔑 Token removed from localStorage');
//         } catch (e) {
//             // Fallback for environments that don't support localStorage
//             window.authToken = null;
//             console.log('🔑 Token cleared from memory');
//         }
//     },

//     // Store user data for quick access
//     setUserData: (userData) => {
//         try {
//             localStorage.setItem('userData', JSON.stringify(userData));
//             console.log('👤 User data saved to localStorage');
//         } catch (e) {
//             window.userData = userData;
//             console.log('👤 User data saved to memory');
//         }
//     },

//     // Get stored user data
//     getUserData: () => {
//         try {
//             const userData = localStorage.getItem('userData');
//             return userData ? JSON.parse(userData) : null;
//         } catch (e) {
//             return window.userData || null;
//         }
//     },

//     // Clear user data
//     clearUserData: () => {
//         try {
//             localStorage.removeItem('userData');
//             console.log('👤 User data removed from localStorage');
//         } catch (e) {
//             window.userData = null;
//             console.log('👤 User data cleared from memory');
//         }
//     },

//     // Check if token is valid (basic JWT validation)
//     isTokenValid: () => {
//         const token = apiService.getAuthToken();
//         if (!token) return false;
        
//         try {
//             // Basic JWT validation
//             const payload = JSON.parse(atob(token.split('.')[1]));
//             const currentTime = Date.now() / 1000;
            
//             return payload.exp > currentTime;
//         } catch (error) {
//             console.error('❌ Token validation error:', error);
//             return false;
//         }
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

//     // Handle API errors (auto-logout on 401)
//     handleApiError: (error, response) => {
//         if (response && response.status === 401) {
//             console.log('🚨 Unauthorized - clearing session');
//             apiService.clearAuthToken();
//             apiService.clearUserData();
//             // Force redirect to login
//             window.location.reload();
//         }
//         throw error;
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
//                 apiService.handleApiError(new Error(data.detail || 'OTP verification failed'), response);
//             }

//             // Store the token and user data
//             if (data.access_token) {
//                 apiService.setAuthToken(data.access_token);
//             }
//             if (data.user) {
//                 apiService.setUserData(data.user);
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
//                 apiService.handleApiError(new Error(data.detail || 'Token verification failed'), response);
//             }

//             // Update stored user data
//             if (data) {
//                 apiService.setUserData(data);
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
//                 apiService.handleApiError(new Error(data.detail || 'Failed to save prediction'), response);
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
//                 apiService.handleApiError(new Error(data.detail || 'Failed to get prediction history'), response);
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

//     // Logout user (with complete cleanup)
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
//         } catch (error) {
//             console.error('🚨 Logout API error:', error);
//             // Continue with client-side cleanup even if API fails
//         }

//         // Always clear all stored data on logout
//         apiService.clearAuthToken();
//         apiService.clearUserData();
//         console.log('✅ Complete logout finished!');
        
//         return { message: 'Logout successful' };
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
//                 apiService.handleApiError(new Error(data.detail || 'Failed to fetch users'), response);
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
//                 apiService.handleApiError(new Error(data.detail || 'Failed to fetch user predictions'), response);
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
//                 apiService.handleApiError(new Error(data.detail || 'Failed to fetch admin stats'), response);
//             }

//             console.log('✅ Admin stats fetched successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get admin stats error:', error);
//             throw error;
//         }
//     },

//     // Get Excel data
//     getExcelData: async () => {
//         console.log('📊 Getting Excel data...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/excel-data`);
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log('✅ Excel data retrieved successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel data error:', error);
//             throw error;
//         }
//     },

//     // Basic Excel Step 1 Prediction (original)
//     predictExcelStep1: async (stepData) => {
//         console.log('🎬 Excel Step 1 prediction...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/predict-excel-step1`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(stepData)
//             });
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log('✅ Excel Step 1 completed!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel Step 1 error:', error);
//             throw error;
//         }
//     },

//     // Basic Excel Step 2 Prediction (original)
//     predictExcelStep2: async (stepData) => {
//         console.log('📈 Excel Step 2 prediction...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/predict-excel-step2`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(stepData)
//             });
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log('✅ Excel Step 2 completed!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel Step 2 error:', error);
//             throw error;
//         }
//     },

//     // Basic Excel Step 3 Prediction (original)
//     predictExcelStep3: async (stepData) => {
//         console.log('⭐ Excel Step 3 prediction...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/predict-excel-step3`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(stepData)
//             });
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log('✅ Excel Step 3 completed!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel Step 3 error:', error);
//             throw error;
//         }
//     },

//     // 🔥 NEW ENHANCED METHODS WITH DATABASE SAVING

//     // Enhanced Excel Step 1 Prediction with optional saving
//     predictExcelStep1Enhanced: async (stepData, saveToDatabase = false) => {
//         console.log('🎬 Excel Step 1 prediction with saving option...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/predict-excel-step1`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(stepData)
//             });
            
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
            
//             const data = await response.json();
//             console.log('✅ Excel Step 1 completed!');
            
//             // Optionally save to database
//             if (saveToDatabase) {
//                 try {
//                     await apiService.savePredictionStep(stepData, data, 'step1');
//                 } catch (saveError) {
//                     console.warn('⚠️ Failed to save step 1 to database:', saveError);
//                 }
//             }
            
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel Step 1 error:', error);
//             throw error;
//         }
//     },

//     // Enhanced Excel Step 2 Prediction with optional saving
//     predictExcelStep2Enhanced: async (stepData, saveToDatabase = false) => {
//         console.log('📈 Excel Step 2 prediction with saving option...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/predict-excel-step2`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(stepData)
//             });
            
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
            
//             const data = await response.json();
//             console.log('✅ Excel Step 2 completed!');
            
//             // Optionally save to database
//             if (saveToDatabase) {
//                 try {
//                     await apiService.savePredictionStep(stepData, data, 'step2');
//                 } catch (saveError) {
//                     console.warn('⚠️ Failed to save step 2 to database:', saveError);
//                 }
//             }
            
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel Step 2 error:', error);
//             throw error;
//         }
//     },

//     // Enhanced Excel Step 3 Prediction with automatic saving
//     predictExcelStep3Enhanced: async (stepData, fullMovieData, saveToDatabase = true) => {
//         console.log('⭐ Excel Step 3 prediction with automatic saving...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/predict-excel-step3`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(stepData)
//             });
            
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
            
//             const data = await response.json();
//             console.log('✅ Excel Step 3 completed!');
            
//             // Automatically save final prediction to database
//             if (saveToDatabase && fullMovieData) {
//                 try {
//                     await apiService.saveCompletePrediction(fullMovieData, data);
//                     console.log('💾 Final prediction saved to database!');
//                 } catch (saveError) {
//                     console.error('❌ Failed to save final prediction:', saveError);
//                     // Don't throw error - prediction succeeded even if saving failed
//                 }
//             }
            
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel Step 3 error:', error);
//             throw error;
//         }
//     },

//     // Save individual prediction step
//     savePredictionStep: async (stepData, predictionResult, stepNumber) => {
//         console.log(`💾 Saving prediction ${stepNumber} to database...`);
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const requestBody = {
//                 step_number: stepNumber,
//                 step_data: stepData,
//                 step_result: predictionResult,
//                 timestamp: new Date().toISOString()
//             };
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/save-step`, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(requestBody)
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to save prediction step');
//             }

//             const data = await response.json();
//             console.log(`✅ Prediction ${stepNumber} saved successfully!`);
//             return data;
//         } catch (error) {
//             console.error(`🚨 Save ${stepNumber} error:`, error);
//             throw error;
//         }
//     },

//     // Save complete prediction (all 3 steps)
//     saveCompletePrediction: async (movieData, finalPrediction) => {
//         console.log('💾 Saving complete Excel prediction to database...');
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const requestBody = {
//                 movie_data: {
//                     ...movieData,
//                     prediction_method: 'Excel Historical Data Analysis (3 Steps)',
//                     data_source: 'Google Sheets Historical Data'
//                 },
//                 prediction: {
//                     weekend_collection: finalPrediction.weekend,
//                     total_collection: finalPrediction.total,
//                     breakdown: finalPrediction.breakdown,
//                     confidence: apiService.calculateConfidence(movieData, finalPrediction),
//                     prediction_type: 'excel_3_step',
//                     completed_at: new Date().toISOString()
//                 }
//             };
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(requestBody)
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to save complete prediction');
//             }

//             const data = await response.json();
//             console.log('✅ Complete prediction saved successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Save complete prediction error:', error);
//             throw error;
//         }
//     },

//     // Calculate confidence score based on data quality
//     calculateConfidence: (movieData, prediction) => {
//         let confidence = 70; // Base confidence

//         // Add confidence for complete cast & crew data
//         if (movieData.director && movieData.director !== '') confidence += 5;
//         if (movieData.cast_1 && movieData.cast_1 !== '') confidence += 5;
//         if (movieData.cast_2 && movieData.cast_2 !== '') confidence += 3;
//         if (movieData.cast_3 && movieData.cast_3 !== '') confidence += 2;
//         if (movieData.cast_4 && movieData.cast_4 !== '') confidence += 1;
//         if (movieData.music_director && movieData.music_director !== '') confidence += 3;
//         if (movieData.lead_singer && movieData.lead_singer !== '') confidence += 2;

//         // Add confidence for marketing data quality
//         if (movieData.teaser_views && movieData.teaser_views > 50) confidence += 2;
//         if (movieData.trailer_views && movieData.trailer_views > 50) confidence += 2;
//         if (movieData.best_hits && movieData.best_hits > 50) confidence += 1;
//         if (movieData.poster_views && movieData.poster_views > 50) confidence += 1;

//         // Add confidence for review data quality
//         if (movieData.imdb_rating && movieData.imdb_rating > 7) confidence += 3;
//         if (movieData.critics_review && movieData.critics_review > 6) confidence += 2;

//         // Add confidence for genre and category specificity
//         if (movieData.genre && movieData.genre !== '') confidence += 2;
//         if (movieData.category && movieData.category !== 'None') confidence += 2;

//         // Reasonable prediction range bonus
//         if (prediction.total >= 10 && prediction.total <= 500) confidence += 3;

//         // Cap at 95%
//         return Math.min(95, Math.max(65, confidence));
//     },

//     // Get prediction history with filters
//     getPredictionHistoryFiltered: async (filters = {}) => {
//         console.log('📊 Getting filtered prediction history...');
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const queryParams = new URLSearchParams();
//             if (filters.limit) queryParams.append('limit', filters.limit);
//             if (filters.prediction_type) queryParams.append('type', filters.prediction_type);
//             if (filters.date_from) queryParams.append('date_from', filters.date_from);
//             if (filters.date_to) queryParams.append('date_to', filters.date_to);
            
//             const url = `${API_BASE_URL}/api/predictions/history${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
            
//             const response = await fetch(url, { headers: headers });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to get prediction history');
//             }

//             const data = await response.json();
//             console.log('✅ Filtered prediction history retrieved!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get filtered history error:', error);
//             throw error;
//         }
//     },

//     // Get prediction statistics for user
//     getPredictionStats: async () => {
//         console.log('📈 Getting prediction statistics...');
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/stats`, {
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to get prediction stats');
//             }

//             const data = await response.json();
//             console.log('✅ Prediction statistics retrieved!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get prediction stats error:', error);
//             throw error;
//         }
//     },

//     // Refresh Excel data
//     refreshExcelData: async () => {
//         console.log('🔄 Refreshing Excel data...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/refresh-excel-data`, {
//                 method: 'POST'
//             });
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log('✅ Excel data refreshed!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel refresh error:', error);
//             throw error;
//         }
//     },

//     // Get Excel stats
//     getExcelStats: async () => {
//         console.log('📊 Getting Excel stats...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/excel-stats`);
//             if (!response.ok) {
//                 throw new Error(`API Error: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log('✅ Excel stats retrieved!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Excel stats error:', error);
//             throw error;
//         }
//     },

//     // Delete a specific prediction
//     deletePrediction: async (predictionId) => {
//         console.log(`🗑️ Deleting prediction ${predictionId}...`);
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/history/${predictionId}`, {
//                 method: 'DELETE',
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to delete prediction');
//             }

//             const data = await response.json();
//             console.log('✅ Prediction deleted successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Delete prediction error:', error);
//             throw error;
//         }
//     },

//     // Export predictions to CSV
//     exportPredictions: async (format = 'csv') => {
//         console.log(`📤 Exporting predictions as ${format}...`);
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/export?format=${format}`, {
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to export predictions');
//             }

//             // For file downloads, return the blob
//             if (format === 'csv' || format === 'xlsx') {
//                 const blob = await response.blob();
//                 console.log('✅ Predictions exported successfully!');
//                 return blob;
//             } else {
//                 const data = await response.json();
//                 console.log('✅ Predictions exported successfully!');
//                 return data;
//             }
//         } catch (error) {
//             console.error('🚨 Export predictions error:', error);
//             throw error;
//         }
//     },

//     // Search predictions by movie title or cast
//     searchPredictions: async (query, filters = {}) => {
//         console.log(`🔍 Searching predictions for: ${query}...`);
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const queryParams = new URLSearchParams();
//             queryParams.append('q', query);
//             if (filters.limit) queryParams.append('limit', filters.limit);
//             if (filters.date_from) queryParams.append('date_from', filters.date_from);
//             if (filters.date_to) queryParams.append('date_to', filters.date_to);
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/search?${queryParams.toString()}`, {
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to search predictions');
//             }

//             const data = await response.json();
//             console.log('✅ Prediction search completed!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Search predictions error:', error);
//             throw error;
//         }
//     },

//     // Bulk operations for predictions
//     bulkDeletePredictions: async (predictionIds) => {
//         console.log(`🗑️ Bulk deleting ${predictionIds.length} predictions...`);
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/bulk-delete`, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify({ prediction_ids: predictionIds })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to bulk delete predictions');
//             }

//             const data = await response.json();
//             console.log('✅ Bulk delete completed successfully!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Bulk delete error:', error);
//             throw error;
//         }
//     },

//     // Compare predictions (for analysis)
//     comparePredictions: async (predictionIds) => {
//         console.log(`📊 Comparing ${predictionIds.length} predictions...`);
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/compare`, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify({ prediction_ids: predictionIds })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to compare predictions');
//             }

//             const data = await response.json();
//             console.log('✅ Prediction comparison completed!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Compare predictions error:', error);
//             throw error;
//         }
//     },

//     // Get prediction insights and analytics
//     getPredictionAnalytics: async (timeRange = '30d') => {
//         console.log(`📈 Getting prediction analytics for ${timeRange}...`);
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/analytics?range=${timeRange}`, {
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to get prediction analytics');
//             }

//             const data = await response.json();
//             console.log('✅ Prediction analytics retrieved!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get analytics error:', error);
//             throw error;
//         }
//     },

//     // Save prediction with custom metadata
//     savePredictionWithMetadata: async (movieData, prediction, metadata = {}) => {
//         console.log('💾 Saving prediction with custom metadata...');
//         try {
//             const enhancedPrediction = {
//                 ...prediction,
//                 metadata: {
//                     source: 'excel_prediction_tool',
//                     version: '2.0',
//                     user_notes: metadata.notes || '',
//                     tags: metadata.tags || [],
//                     is_favorite: metadata.is_favorite || false,
//                     custom_fields: metadata.custom_fields || {},
//                     ...metadata
//                 }
//             };

//             return await apiService.savePrediction(movieData, enhancedPrediction);
//         } catch (error) {
//             console.error('🚨 Save prediction with metadata error:', error);
//             throw error;
//         }
//     },

//     // Get favorite predictions
//     getFavoritePredictions: async (limit = 20) => {
//         console.log('⭐ Getting favorite predictions...');
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/favorites?limit=${limit}`, {
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to get favorite predictions');
//             }

//             const data = await response.json();
//             console.log('✅ Favorite predictions retrieved!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Get favorites error:', error);
//             throw error;
//         }
//     },

//     // Toggle favorite status
//     toggleFavoritePrediction: async (predictionId) => {
//         console.log(`⭐ Toggling favorite status for prediction ${predictionId}...`);
//         try {
//             const headers = apiService.getAuthHeaders();
            
//             const response = await fetch(`${API_BASE_URL}/api/predictions/${predictionId}/toggle-favorite`, {
//                 method: 'POST',
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to toggle favorite status');
//             }

//             const data = await response.json();
//             console.log('✅ Favorite status toggled!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Toggle favorite error:', error);
//             throw error;
//         }
//     },

//     // Health check for the API
//     healthCheck: async () => {
//         console.log('🏥 Performing API health check...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/health`);
            
//             if (!response.ok) {
//                 throw new Error(`Health check failed: ${response.status}`);
//             }
            
//             const data = await response.json();
//             console.log('✅ API health check passed!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Health check error:', error);
//             throw error;
//         }
//     },

//     // Prediction validation and quality check
//     validatePrediction: async (movieData) => {
//         console.log('🔍 Validating prediction data...');
//         try {
//             const response = await fetch(`${API_BASE_URL}/api/predictions/validate`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ movie_data: movieData })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || 'Failed to validate prediction');
//             }

//             const data = await response.json();
//             console.log('✅ Prediction validation completed!');
//             return data;
//         } catch (error) {
//             console.error('🚨 Validation error:', error);
//             throw error;
//         }
//     }
// };
export const API_BASE_URL = 'http://localhost:8001'; // Update with your backend URL

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
    },

    // Get Excel data
    getExcelData: async () => {
        console.log('📊 Getting Excel data...');
        try {
            const response = await fetch(`${API_BASE_URL}/excel-data`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('✅ Excel data retrieved successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Excel data error:', error);
            throw error;
        }
    },

    // Basic Excel Step 1 Prediction (original)
    predictExcelStep1: async (stepData) => {
        console.log('🎬 Excel Step 1 prediction...');
        try {
            const response = await fetch(`${API_BASE_URL}/predict-excel-step1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stepData)
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('✅ Excel Step 1 completed!');
            return data;
        } catch (error) {
            console.error('🚨 Excel Step 1 error:', error);
            throw error;
        }
    },

    // Basic Excel Step 2 Prediction (original)
    predictExcelStep2: async (stepData) => {
        console.log('📈 Excel Step 2 prediction...');
        try {
            const response = await fetch(`${API_BASE_URL}/predict-excel-step2`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stepData)
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('✅ Excel Step 2 completed!');
            return data;
        } catch (error) {
            console.error('🚨 Excel Step 2 error:', error);
            throw error;
        }
    },

    // Basic Excel Step 3 Prediction (original)
    predictExcelStep3: async (stepData) => {
        console.log('⭐ Excel Step 3 prediction...');
        try {
            const response = await fetch(`${API_BASE_URL}/predict-excel-step3`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stepData)
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('✅ Excel Step 3 completed!');
            return data;
        } catch (error) {
            console.error('🚨 Excel Step 3 error:', error);
            throw error;
        }
    },

    // 🔥 NEW ENHANCED METHODS WITH DATABASE SAVING

    // Enhanced Excel Step 1 Prediction with optional saving
    predictExcelStep1Enhanced: async (stepData, saveToDatabase = false) => {
        console.log('🎬 Excel Step 1 prediction with saving option...');
        try {
            const response = await fetch(`${API_BASE_URL}/predict-excel-step1`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stepData)
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Excel Step 1 completed!');
            
            // Optionally save to database
            if (saveToDatabase) {
                try {
                    await apiService.savePredictionStep(stepData, data, 'step1');
                } catch (saveError) {
                    console.warn('⚠️ Failed to save step 1 to database:', saveError);
                }
            }
            
            return data;
        } catch (error) {
            console.error('🚨 Excel Step 1 error:', error);
            throw error;
        }
    },

    // Enhanced Excel Step 2 Prediction with optional saving
    predictExcelStep2Enhanced: async (stepData, saveToDatabase = false) => {
        console.log('📈 Excel Step 2 prediction with saving option...');
        try {
            const response = await fetch(`${API_BASE_URL}/predict-excel-step2`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stepData)
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Excel Step 2 completed!');
            
            // Optionally save to database
            if (saveToDatabase) {
                try {
                    await apiService.savePredictionStep(stepData, data, 'step2');
                } catch (saveError) {
                    console.warn('⚠️ Failed to save step 2 to database:', saveError);
                }
            }
            
            return data;
        } catch (error) {
            console.error('🚨 Excel Step 2 error:', error);
            throw error;
        }
    },

    // Enhanced Excel Step 3 Prediction with automatic saving
    predictExcelStep3Enhanced: async (stepData, fullMovieData, saveToDatabase = true) => {
        console.log('⭐ Excel Step 3 prediction with automatic saving...');
        try {
            const response = await fetch(`${API_BASE_URL}/predict-excel-step3`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stepData)
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Excel Step 3 completed!');
            
            // Automatically save final prediction to database
            if (saveToDatabase && fullMovieData) {
                try {
                    await apiService.saveCompletePrediction(fullMovieData, data);
                    console.log('💾 Final prediction saved to database!');
                } catch (saveError) {
                    console.error('❌ Failed to save final prediction:', saveError);
                    // Don't throw error - prediction succeeded even if saving failed
                }
            }
            
            return data;
        } catch (error) {
            console.error('🚨 Excel Step 3 error:', error);
            throw error;
        }
    },

    // Save individual prediction step
    savePredictionStep: async (stepData, predictionResult, stepNumber) => {
        console.log(`💾 Saving prediction ${stepNumber} to database...`);
        try {
            const headers = apiService.getAuthHeaders();
            
            const requestBody = {
                step_number: stepNumber,
                step_data: stepData,
                step_result: predictionResult,
                timestamp: new Date().toISOString()
            };
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/save-step`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to save prediction step');
            }

            const data = await response.json();
            console.log(`✅ Prediction ${stepNumber} saved successfully!`);
            return data;
        } catch (error) {
            console.error(`🚨 Save ${stepNumber} error:`, error);
            throw error;
        }
    },

    // Save complete prediction (all 3 steps)
    saveCompletePrediction: async (movieData, finalPrediction) => {
        console.log('💾 Saving complete Excel prediction to database...');
        console.log('🔍 DEBUG - Raw movie data received:', movieData);
        console.log('🔍 DEBUG - Final prediction received:', finalPrediction);
        
        try {
            const headers = apiService.getAuthHeaders();
            
            // 🔧 ENHANCED: Better data cleaning and mapping
            const cleanedMovieData = {
                // Core movie information (multiple formats for compatibility)
                
                Director: movieData.Director || movieData.director || 'Unknown',
                Genre: movieData.Genre || movieData.genre || 'Unknown',
                'Cast 1': movieData['Cast 1'] || movieData.cast_1 || movieData.cast1 || 'Unknown',
                'Cast 2': movieData['Cast 2'] || movieData.cast_2 || movieData.cast2 || 'Unknown',
                'Cast 3': movieData['Cast 3'] || movieData.cast_3 || movieData.cast3 || '',
                'Cast 4': movieData['Cast 4'] || movieData.cast_4 || movieData.cast4 || '',
                'Music Director': movieData['Music Director'] || movieData.music_director || movieData.musicDirector || '',
                'Lead Singer': movieData['Lead Singer'] || movieData.lead_singer || movieData.leadSinger || '',
                Category: movieData.Category || movieData.category || 'None',
                
                // Additional data
                Movie_Title: movieData.Movie_Title || `${movieData.Director || movieData.director || 'Unknown'} Movie`,
                prediction_method: movieData.prediction_method || 'Excel Historical Data Analysis (3 Steps)',
                data_source: movieData.data_source || 'Google Sheets Historical Data',
                
                // Technical data
                adjustment_percentage: movieData.adjustment_percentage || 0,
                teaser_views: movieData.teaser_views || 50,
                trailer_views: movieData.trailer_views || 50,
                best_hits: movieData.best_hits || 50,
                poster_views: movieData.poster_views || 50,
                imdb_rating: movieData.imdb_rating || 6.5,
                critics_review: movieData.critics_review || 5.0,
                
                // Metadata
                prediction_created: movieData.prediction_created || new Date().toISOString()
            };
            
            console.log('✅ DEBUG - Cleaned movie data:', cleanedMovieData);
            
            const requestBody = {
                movie_data: cleanedMovieData,
                prediction: {
                    weekend: finalPrediction.weekend || 0,
                    total: finalPrediction.total || 0,
                    breakdown: finalPrediction.breakdown || {},
                    data_source: 'Google Sheets Historical Data',

                    confidence: apiService.calculateConfidence(cleanedMovieData, finalPrediction),
                    prediction_type: 'excel_3_step',
                    completed_at: new Date().toISOString()
                }
            };
            
            console.log('📦 DEBUG - Final request body:', requestBody);
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ Save failed with response:', errorData);
                throw new Error(errorData.detail || 'Failed to save complete prediction');
            }

            const data = await response.json();
            console.log('✅ Complete prediction saved successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Save complete prediction error:', error);
            throw error;
        }
    },
//     saveCompletePrediction: async (movieData, finalPrediction) => {
//     console.log('💾 Saving complete Excel prediction to database...');
//     console.log('🔍 DEBUG - Raw movie data received:', movieData);
//     console.log('🔍 DEBUG - Final prediction received:', finalPrediction);
    
//     try {
//         const headers = apiService.getAuthHeaders();
        
//         // 🎯 FLATTENED DATA STRUCTURE - Store everything at the root level for easy access
//         const flattenedMovieData = {
//             // ✅ CONSISTENT FIELD NAMES (snake_case for backend compatibility)
//             director: movieData.director || 'Unknown',
//             genre: movieData.genre || 'Unknown',
//             cast_1: movieData.cast_1 || 'Unknown',
//             cast_2: movieData.cast_2 || 'Unknown',
//             cast_3: movieData.cast_3 || '',
//             cast_4: movieData.cast_4 || '',
//             music_director: movieData.music_director || '',
//             lead_singer: movieData.lead_singer || '',
//             category: movieData.category || 'None',
            
//             // 💰 PREDICTION VALUES (most important - these MUST be preserved)
//             weekend_collection: Number(finalPrediction.weekend || 0),
//             total_collection: Number(finalPrediction.total || 0),
            
//             // 📊 TECHNICAL METRICS
//             adjustment_percentage: Number(movieData.adjustment_percentage || 0),
//             teaser_views: Number(movieData.teaser_views || 50),
//             trailer_views: Number(movieData.trailer_views || 50),
//             best_hits: Number(movieData.best_hits || 50),
//             poster_views: Number(movieData.poster_views || 50),
//             imdb_rating: Number(movieData.imdb_rating || 6.5),
//             critics_review: Number(movieData.critics_review || 5.0),
            
//             // 🎯 CONFIDENCE AND METADATA
//             confidence_score: Number(apiService.calculateConfidence(movieData, finalPrediction)),
//             prediction_method: movieData.prediction_method || 'Excel Historical Data Analysis (3 Steps)',
//             data_source: movieData.data_source || 'Google Sheets Historical Data',
            
//             // 🕒 TIMESTAMPS
//             prediction_created: movieData.prediction_created || new Date().toISOString(),
//             movie_title: movieData.movie_title || `${movieData.director || 'Unknown'} Movie`,
            
//             // 🏷️ DISPLAY HELPERS
//             cast_display: [
//                 movieData.cast_1,
//                 movieData.cast_2,
//                 movieData.cast_3,
//                 movieData.cast_4
//             ].filter(Boolean).join(', '),
            
//             // 📋 BREAKDOWN DATA (for advanced users)
//             prediction_breakdown: finalPrediction.breakdown || {},
//             prediction_type: 'excel_3_step'
//         };
        
//         console.log('✅ DEBUG - Flattened movie data with collections:', {
//             weekend_collection: flattenedMovieData.weekend_collection,
//             total_collection: flattenedMovieData.total_collection,
//             director: flattenedMovieData.director,
//             genre: flattenedMovieData.genre
//         });
        
//         // 🎯 SIMPLIFIED REQUEST STRUCTURE - All data in movie_data for easy retrieval
//         const requestBody = {
//             movie_data: flattenedMovieData,
//             prediction: {
//                 // 🔄 DUPLICATE VALUES for compatibility with existing code
//                 weekend_collection: flattenedMovieData.weekend_collection,
//                 total_collection: flattenedMovieData.total_collection,
//                 confidence: flattenedMovieData.confidence_score,
//                 prediction_type: 'excel_3_step',
//                 method: 'Excel Historical Data Analysis (3 Steps)',
//                 completed_at: new Date().toISOString(),
                
//                 // 📊 ORIGINAL BREAKDOWN for reference
//                 original_breakdown: finalPrediction.breakdown || {}
//             }
//         };
        
//         console.log('📦 DEBUG - Final request body with collections:', {
//             'movie_data.weekend_collection': requestBody.movie_data.weekend_collection,
//             'movie_data.total_collection': requestBody.movie_data.total_collection,
//             'prediction.weekend_collection': requestBody.prediction.weekend_collection,
//             'prediction.total_collection': requestBody.prediction.total_collection
//         });
        
//         const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(requestBody)
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('❌ Save failed with response:', errorData);
//             throw new Error(errorData.detail || 'Failed to save complete prediction');
//         }

//         const data = await response.json();
//         console.log('✅ Complete prediction saved successfully!');
//         return data;
//     } catch (error) {
//         console.error('🚨 Save complete prediction error:', error);
//         throw error;
//     }
// },

    // Calculate confidence score based on data quality
    calculateConfidence: (movieData, prediction) => {
        let confidence = 70; // Base confidence

        // Add confidence for complete cast & crew data
        if (movieData.director && movieData.director !== '') confidence += 5;
        if (movieData.cast_1 && movieData.cast_1 !== '') confidence += 5;
        if (movieData.cast_2 && movieData.cast_2 !== '') confidence += 3;
        if (movieData.cast_3 && movieData.cast_3 !== '') confidence += 2;
        if (movieData.cast_4 && movieData.cast_4 !== '') confidence += 1;
        if (movieData.music_director && movieData.music_director !== '') confidence += 3;
        if (movieData.lead_singer && movieData.lead_singer !== '') confidence += 2;

        // Add confidence for marketing data quality
        if (movieData.teaser_views && movieData.teaser_views > 50) confidence += 2;
        if (movieData.trailer_views && movieData.trailer_views > 50) confidence += 2;
        if (movieData.best_hits && movieData.best_hits > 50) confidence += 1;
        if (movieData.poster_views && movieData.poster_views > 50) confidence += 1;

        // Add confidence for review data quality
        if (movieData.imdb_rating && movieData.imdb_rating > 7) confidence += 3;
        if (movieData.critics_review && movieData.critics_review > 6) confidence += 2;

        // Add confidence for genre and category specificity
        if (movieData.genre && movieData.genre !== '') confidence += 2;
        if (movieData.category && movieData.category !== 'None') confidence += 2;

        // Reasonable prediction range bonus
        if (prediction.total >= 10 && prediction.total <= 500) confidence += 3;

        // Cap at 95%
        return Math.min(95, Math.max(65, confidence));
    },

    // Get prediction history with filters
    getPredictionHistoryFiltered: async (filters = {}) => {
        console.log('📊 Getting filtered prediction history...');
        try {
            const headers = apiService.getAuthHeaders();
            
            const queryParams = new URLSearchParams();
            if (filters.limit) queryParams.append('limit', filters.limit);
            if (filters.prediction_type) queryParams.append('type', filters.prediction_type);
            if (filters.date_from) queryParams.append('date_from', filters.date_from);
            if (filters.date_to) queryParams.append('date_to', filters.date_to);
            
            const url = `${API_BASE_URL}/api/predictions/history${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
            
            const response = await fetch(url, { headers: headers });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to get prediction history');
            }

            const data = await response.json();
            console.log('✅ Filtered prediction history retrieved!');
            return data;
        } catch (error) {
            console.error('🚨 Get filtered history error:', error);
            throw error;
        }
    },

    // Get prediction statistics for user
    getPredictionStats: async () => {
        console.log('📈 Getting prediction statistics...');
        try {
            const headers = apiService.getAuthHeaders();
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/stats`, {
                headers: headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to get prediction stats');
            }

            const data = await response.json();
            console.log('✅ Prediction statistics retrieved!');
            return data;
        } catch (error) {
            console.error('🚨 Get prediction stats error:', error);
            throw error;
        }
    },

    // Refresh Excel data
    refreshExcelData: async () => {
        console.log('🔄 Refreshing Excel data...');
        try {
            const response = await fetch(`${API_BASE_URL}/refresh-excel-data`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('✅ Excel data refreshed!');
            return data;
        } catch (error) {
            console.error('🚨 Excel refresh error:', error);
            throw error;
        }
    },

    // Get Excel stats
    getExcelStats: async () => {
        console.log('📊 Getting Excel stats...');
        try {
            const response = await fetch(`${API_BASE_URL}/excel-stats`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('✅ Excel stats retrieved!');
            return data;
        } catch (error) {
            console.error('🚨 Excel stats error:', error);
            throw error;
        }
    },

    // Delete a specific prediction
    deletePrediction: async (predictionId) => {
        console.log(`🗑️ Deleting prediction ${predictionId}...`);
        try {
            const headers = apiService.getAuthHeaders();
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/history/${predictionId}`, {
                method: 'DELETE',
                headers: headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to delete prediction');
            }

            const data = await response.json();
            console.log('✅ Prediction deleted successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Delete prediction error:', error);
            throw error;
        }
    },

    // Export predictions to CSV
    exportPredictions: async (format = 'csv') => {
        console.log(`📤 Exporting predictions as ${format}...`);
        try {
            const headers = apiService.getAuthHeaders();
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/export?format=${format}`, {
                headers: headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to export predictions');
            }

            // For file downloads, return the blob
            if (format === 'csv' || format === 'xlsx') {
                const blob = await response.blob();
                console.log('✅ Predictions exported successfully!');
                return blob;
            } else {
                const data = await response.json();
                console.log('✅ Predictions exported successfully!');
                return data;
            }
        } catch (error) {
            console.error('🚨 Export predictions error:', error);
            throw error;
        }
    },

    // Search predictions by movie title or cast
    searchPredictions: async (query, filters = {}) => {
        console.log(`🔍 Searching predictions for: ${query}...`);
        try {
            const headers = apiService.getAuthHeaders();
            
            const queryParams = new URLSearchParams();
            queryParams.append('q', query);
            if (filters.limit) queryParams.append('limit', filters.limit);
            if (filters.date_from) queryParams.append('date_from', filters.date_from);
            if (filters.date_to) queryParams.append('date_to', filters.date_to);
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/search?${queryParams.toString()}`, {
                headers: headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to search predictions');
            }

            const data = await response.json();
            console.log('✅ Prediction search completed!');
            return data;
        } catch (error) {
            console.error('🚨 Search predictions error:', error);
            throw error;
        }
    },

    // Bulk operations for predictions
    bulkDeletePredictions: async (predictionIds) => {
        console.log(`🗑️ Bulk deleting ${predictionIds.length} predictions...`);
        try {
            const headers = apiService.getAuthHeaders();
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/bulk-delete`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ prediction_ids: predictionIds })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to bulk delete predictions');
            }

            const data = await response.json();
            console.log('✅ Bulk delete completed successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Bulk delete error:', error);
            throw error;
        }
    },

    // Compare predictions (for analysis)
    comparePredictions: async (predictionIds) => {
        console.log(`📊 Comparing ${predictionIds.length} predictions...`);
        try {
            const headers = apiService.getAuthHeaders();
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/compare`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ prediction_ids: predictionIds })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to compare predictions');
            }

            const data = await response.json();
            console.log('✅ Prediction comparison completed!');
            return data;
        } catch (error) {
            console.error('🚨 Compare predictions error:', error);
            throw error;
        }
    },

    // Get prediction insights and analytics
    getPredictionAnalytics: async (timeRange = '30d') => {
        console.log(`📈 Getting prediction analytics for ${timeRange}...`);
        try {
            const headers = apiService.getAuthHeaders();
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/analytics?range=${timeRange}`, {
                headers: headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to get prediction analytics');
            }

            const data = await response.json();
            console.log('✅ Prediction analytics retrieved!');
            return data;
        } catch (error) {
            console.error('🚨 Get analytics error:', error);
            throw error;
        }
    },

    // Save prediction with custom metadata
    savePredictionWithMetadata: async (movieData, prediction, metadata = {}) => {
        console.log('💾 Saving prediction with custom metadata...');
        try {
            const enhancedPrediction = {
                ...prediction,
                metadata: {
                    source: 'excel_prediction_tool',
                    version: '2.0',
                    user_notes: metadata.notes || '',
                    tags: metadata.tags || [],
                    is_favorite: metadata.is_favorite || false,
                    custom_fields: metadata.custom_fields || {},
                    ...metadata
                }
            };

            return await apiService.savePrediction(movieData, enhancedPrediction);
        } catch (error) {
            console.error('🚨 Save prediction with metadata error:', error);
            throw error;
        }
    },

    // Get favorite predictions
    getFavoritePredictions: async (limit = 20) => {
        console.log('⭐ Getting favorite predictions...');
        try {
            const headers = apiService.getAuthHeaders();
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/favorites?limit=${limit}`, {
                headers: headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to get favorite predictions');
            }

            const data = await response.json();
            console.log('✅ Favorite predictions retrieved!');
            return data;
        } catch (error) {
            console.error('🚨 Get favorites error:', error);
            throw error;
        }
    },

    // Toggle favorite status
    toggleFavoritePrediction: async (predictionId) => {
        console.log(`⭐ Toggling favorite status for prediction ${predictionId}...`);
        try {
            const headers = apiService.getAuthHeaders();
            
            const response = await fetch(`${API_BASE_URL}/api/predictions/${predictionId}/toggle-favorite`, {
                method: 'POST',
                headers: headers,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to toggle favorite status');
            }

            const data = await response.json();
            console.log('✅ Favorite status toggled!');
            return data;
        } catch (error) {
            console.error('🚨 Toggle favorite error:', error);
            throw error;
        }
    },

    // Health check for the API
    healthCheck: async () => {
        console.log('🏥 Performing API health check...');
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            
            if (!response.ok) {
                throw new Error(`Health check failed: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ API health check passed!');
            return data;
        } catch (error) {
            console.error('🚨 Health check error:', error);
            throw error;
        }
    },

    // Prediction validation and quality check
    validatePrediction: async (movieData) => {
        console.log('🔍 Validating prediction data...');
        try {
            const response = await fetch(`${API_BASE_URL}/api/predictions/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movie_data: movieData })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to validate prediction');
            }

            const data = await response.json();
            console.log('✅ Prediction validation completed!');
            return data;
        } catch (error) {
            console.error('🚨 Validation error:', error);
            throw error;
        }
    }
};