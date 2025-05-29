// export const API_BASE_URL = 'http://127.0.0.1:8001';

// export const apiService = {
//     // Get auth token from localStorage
//     getAuthToken: () => {
//         return localStorage.getItem('authToken');
//     },

//     // Create auth headers
//     getAuthHeaders: () => {
//         const token = apiService.getAuthToken();
//         return {
//             'Content-Type': 'application/json',
//             ...(token && { 'Authorization': `Bearer ${token}` })
//         };
//     },

//     // Register user
//     //   register: async (userData) => {
//     //     const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
//     //       method: 'POST',
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //       body: JSON.stringify(userData)
//     //     });

//     //     const data = await response.json();

//     //     if (!response.ok) {
//     //       throw new Error(data.detail || 'Registration failed');
//     //     }

//     //     return data;
//     //   },

//     register: async (userData) => {
//         console.log('📡 Making registration request to:', `${API_BASE_URL}/api/auth/register`);
//         console.log('📝 Request data:', { ...userData, password: '***' });

//         try {
//             const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData)
//             });

//             console.log('📨 Response status:', response.status);

//             const data = await response.json();
//             console.log('📨 Response data:', data);

//             if (!response.ok) {
//                 console.error('❌ Registration failed with status:', response.status);
//                 console.error('❌ Error details:', data);
//                 throw new Error(data.detail || 'Registration failed');
//             }

//             console.log('✅ Registration successful - redirecting to login!');
//             return data; // This now returns success message, not token
//         } catch (error) {
//             console.error('🚨 Network/Parse error:', error);

//             if (error.name === 'TypeError' && error.message.includes('fetch')) {
//                 throw new Error('Cannot connect to server. Is the backend running on http://localhost:8000?');
//             }

//             throw error;
//         }
//     },
//     // Login user
//     login: async (credentials) => {
//         const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(credentials)
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.detail || 'Login failed');
//         }

//         return data;
//     },

//     // Verify token
//     verifyToken: async () => {
//         const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
//             headers: apiService.getAuthHeaders(),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.detail || 'Token verification failed');
//         }

//         return data;
//     },

//     // Save prediction
//     savePrediction: async (movieData, prediction) => {
//         const response = await fetch(`${API_BASE_URL}/api/predictions/save`, {
//             method: 'POST',
//             headers: apiService.getAuthHeaders(),
//             body: JSON.stringify({
//                 movie_data: movieData,
//                 prediction: prediction
//             })
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.detail || 'Failed to save prediction');
//         }

//         return data;
//     },

//     // Get prediction history
//     getPredictionHistory: async (limit = 50) => {
//         const response = await fetch(`${API_BASE_URL}/api/predictions/history?limit=${limit}`, {
//             headers: apiService.getAuthHeaders(),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.detail || 'Failed to get prediction history');
//         }

//         return data;
//     },

//     // Your existing movie prediction API
//     predictMovie: async (movieData) => {
//         const response = await fetch(`${API_BASE_URL}/predict-performance-enhanced`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 Director: movieData.Director,
//                 Genre: movieData.Genre,
//                 Music_Director: movieData["Music Director"],
//                 Lead_Singer: movieData["Lead Singer"],
//                 Cast_1: movieData["Cast 1"],
//                 Cast_2: movieData["Cast 2"],
//                 Cast_3: movieData["Cast 3"],
//                 Cast_4: movieData["Cast 4"],
//                 Category: movieData.Category || "None"
//             })
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`API Error: ${response.status} - ${errorData.detail || 'Unknown error'}`);
//         }

//         return await response.json();
//     }
// };
export const API_BASE_URL = 'https://box-office-tool-backend.onrender.com';

export const apiService = {
    // Get auth token from localStorage
    getAuthToken: () => {
        const token = localStorage.getItem('authToken');
        console.log('🔑 getAuthToken called, token exists:', !!token);
        if (token) {
            console.log('🔑 Token preview:', token.substring(0, 20) + '...');
        }
        return token;
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

    // Register user
    register: async (userData) => {
        console.log('📡 Making registration request to:', `${API_BASE_URL}/api/auth/register`);
        console.log('📝 Request data:', { ...userData, password: '***' });

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            console.log('📨 Response status:', response.status);

            const data = await response.json();
            console.log('📨 Response data:', data);

            if (!response.ok) {
                console.error('❌ Registration failed with status:', response.status);
                console.error('❌ Error details:', data);
                throw new Error(data.detail || 'Registration failed');
            }

            console.log('✅ Registration successful - redirecting to login!');
            return data; // This now returns success message, not token
        } catch (error) {
            console.error('🚨 Network/Parse error:', error);

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Cannot connect to server. Is the backend running on http://localhost:8000?');
            }

            throw error;
        }
    },

    // Login user
    login: async (credentials) => {
        console.log('🔐 Making login request to:', `${API_BASE_URL}/api/auth/login`);
        console.log('📝 Login data:', { ...credentials, password: '***' });

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            console.log('📨 Login response status:', response.status);

            const data = await response.json();
            console.log('📨 Login response data:', {
                ...data,
                access_token: data.access_token ? '***TOKEN***' : 'Not provided'
            });

            if (!response.ok) {
                console.error('❌ Login failed with status:', response.status);
                console.error('❌ Login error details:', data);
                throw new Error(data.detail || 'Login failed');
            }

            console.log('✅ Login successful!');
            return data;
        } catch (error) {
            console.error('🚨 Login network/parse error:', error);
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
                throw new Error(data.detail || 'Token verification failed');
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
            console.log('📨 Save prediction response headers:', Object.fromEntries(response.headers.entries()));

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
                throw new Error(data.detail || 'Failed to save prediction');
            }

            console.log('✅ Prediction saved successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Save prediction error:', error);
            console.error('🚨 Save prediction error stack:', error.stack);
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
            console.log('📨 Get history response headers:', Object.fromEntries(response.headers.entries()));

            let data;
            try {
                data = await response.json();
                console.log('📨 Get history response data:', data);
                console.log('📊 History data type:', typeof data, 'Array?', Array.isArray(data));
                if (Array.isArray(data)) {
                    console.log('📊 History length:', data.length);
                }
            } catch (parseError) {
                console.error('❌ Failed to parse history response as JSON:', parseError);
                const text = await response.text();
                console.error('📨 Raw history response text:', text);
                throw new Error('Server returned invalid JSON response');
            }

            if (!response.ok) {
                console.error('❌ Get history failed with status:', response.status);
                console.error('❌ Get history error details:', data);
                throw new Error(data.detail || 'Failed to get prediction history');
            }

            console.log('✅ Prediction history retrieved successfully!');
            return data;
        } catch (error) {
            console.error('🚨 Get history error:', error);
            console.error('🚨 Get history error stack:', error.stack);
            throw error;
        }
    },

    // Your existing movie prediction API
    predictMovie: async (movieData) => {
        console.log('🎬 Making movie prediction request to:', `${API_BASE_URL}/predict-performance-enhanced`);
        
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
            const response = await fetch(`${API_BASE_URL}/predict-performance-enhanced`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            console.log('📨 Prediction response status:', response.status);
            console.log('📨 Prediction response headers:', Object.fromEntries(response.headers.entries()));

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
            console.error('🚨 Movie prediction error stack:', error.stack);
            throw error;
        }
    },

    // Logout user
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
                console.log('✅ Logout successful!');
                return data;
            } else {
                console.warn('⚠️ Logout request failed, but continuing with client-side cleanup');
                return { message: 'Logout completed (client-side)' };
            }
        } catch (error) {
            console.error('🚨 Logout error:', error);
            console.warn('⚠️ Logout request failed, but continuing with client-side cleanup');
            // Don't throw error for logout - continue with client-side cleanup
            return { message: 'Logout completed (client-side)' };
        }
    }
};