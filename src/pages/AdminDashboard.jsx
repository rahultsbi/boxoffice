
import React, { useState, useEffect } from "react";
import { apiService } from '../services/apiService';

function AdminDashboard({ user, onLogout, onTokenExpired }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPredictions, setUserPredictions] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log('📊 Loading admin data...');
      const [usersData, statsData] = await Promise.all([
        apiService.getAllUsers(),
        apiService.getAdminStats()
      ]);
      
      console.log('✅ Admin data loaded:', { users: usersData.length, stats: statsData });
      setUsers(usersData);
      setAdminStats(statsData);
    } catch (err) {
      console.error('❌ Failed to load admin data:', err);
      
      // Check if it's an authentication error
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        if (onTokenExpired) {
          onTokenExpired();
          return;
        }
      }
      
      setError('Failed to load admin data: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewUserPredictions = async (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      setUserPredictions(null);
      return;
    }

    setIsLoading(true);
    setError(''); // Clear previous errors
    
    try {
      console.log('🔍 Loading predictions for user:', userId);
      const data = await apiService.getUserPredictions(userId);
      console.log('✅ User predictions loaded:', data);
      
      setUserPredictions(data);
      setExpandedUser(userId);
    } catch (err) {
      console.error('❌ Failed to load user predictions:', err);
      
      // Check if it's an authentication error
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
        if (onTokenExpired) {
          onTokenExpired();
          return;
        }
      }
      
      setError('Failed to load user predictions: ' + err.message);
      // Close the expanded view on error
      setExpandedUser(null);
      setUserPredictions(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    // Convert to proper currency format (assuming amounts are in crores)
    const value = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value * 10000000); // Convert crores to rupees
  };

  const formatPredictionAmount = (amount) => {
    // For display in crores
    const value = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    return `₹${value.toFixed(1)} Cr`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">🛡️</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">{user?.email || 'Admin'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadAdminData}
                disabled={isLoading}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors"
              >
                🔄 Refresh
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('overview');
                clearError();
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => {
                setActiveTab('users');
                clearError();
                // Reset expanded user when switching tabs
                setExpandedUser(null);
                setUserPredictions(null);
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              👥 Users ({users.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                <span className="text-red-700 text-sm">{error}</span>
              </div>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-700 text-sm">Loading...</span>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {adminStats ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 text-xl">👥</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStats.users?.total || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-xl">✅</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStats.users?.active || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 text-xl">🎬</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Predictions</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStats.predictions?.total || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 text-xl">📈</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Recent (30d)</p>
                        <p className="text-2xl font-bold text-gray-900">{adminStats.predictions?.recent || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Summary */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">📋 System Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">User Activity</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• {adminStats.users?.recent_new || 0} new users in last 30 days</li>
                        <li>• {adminStats.users?.active || 0} active users total</li>
                        <li>• {adminStats.users?.total > 0 ? ((adminStats.users.active / adminStats.users.total) * 100).toFixed(1) : 0}% user activity rate</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Prediction Activity</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• {adminStats.predictions?.recent || 0} predictions in last 30 days</li>
                        <li>• {adminStats.users?.total > 0 ? (adminStats.predictions.total / adminStats.users.total).toFixed(1) : 0} avg predictions per user</li>
                        <li>• {adminStats.predictions?.total || 0} total predictions made</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Statistics...</h3>
                <p className="text-gray-600">Admin statistics will appear here</p>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">All Users ({users.length})</h2>
                  <div className="text-sm text-gray-500">
                    Click on a user to view their predictions
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Predictions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((userItem) => (
                      <React.Fragment key={userItem.id}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {userItem.username || 'Unknown User'}
                                {(userItem.email === 'admin@tsbi.in' || userItem.is_admin) && (
                                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Admin
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {userItem.email || 'No email'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              userItem.is_active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {userItem.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <span className="mr-2">{userItem.predictions_count || 0}</span>
                              {(userItem.predictions_count || 0) > 0 && (
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(userItem.last_login)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button
                              onClick={() => handleViewUserPredictions(userItem.id)}
                              className="text-blue-600 hover:text-blue-800 flex items-center transition-colors disabled:opacity-50"
                              disabled={isLoading}
                            >
                              {expandedUser === userItem.id ? (
                                <>
                                  <span className="mr-1">🔼</span>
                                  Hide Predictions
                                </>
                              ) : (
                                <>
                                  <span className="mr-1">🔽</span>
                                  View Predictions ({userItem.predictions_count || 0})
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                        
                        {/* Expanded Predictions Row */}
                        {expandedUser === userItem.id && userPredictions && (
                          <tr>
                            <td colSpan="5" className="px-6 py-6 bg-gray-50">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-900">
                                    🎬 Predictions for {userPredictions.user?.username || 'User'}
                                  </h4>
                                  <span className="text-sm text-gray-500">
                                    {userPredictions.predictions?.length || 0} total predictions
                                  </span>
                                </div>
                                
                                {userPredictions.predictions && userPredictions.predictions.length > 0 ? (
                                  <div className="grid gap-4">
                                    {userPredictions.predictions.map((pred) => (
                                      <div key={pred.id} className="bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                              <h5 className="font-semibold text-gray-900">
                                                {pred.movie_data?.Director || 'Unknown Director'}
                                              </h5>
                                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                {pred.movie_data?.Genre || 'Unknown Genre'}
                                              </span>
                                            </div>
                                            <div className="text-sm text-gray-600 space-y-1">
                                              <div className="flex flex-wrap gap-2">
                                                <span>🎭 Cast:</span>
                                                <span>{pred.movie_data?.['Cast 1'] || 'N/A'}</span>
                                                {pred.movie_data?.['Cast 2'] && (
                                                  <span>, {pred.movie_data['Cast 2']}</span>
                                                )}
                                                {pred.movie_data?.['Cast 3'] && (
                                                  <span>, {pred.movie_data['Cast 3']}</span>
                                                )}
                                              </div>
                                              {pred.movie_data?.['Music Director'] && (
                                                <div>🎵 Music: {pred.movie_data['Music Director']}</div>
                                              )}
                                              {pred.movie_data?.['Lead Singer'] && (
                                                <div>🎤 Singer: {pred.movie_data['Lead Singer']}</div>
                                              )}
                                            </div>
                                          </div>
                                          <div className="text-right ml-4">
                                            <div className="text-lg font-bold text-green-600">
                                              {formatPredictionAmount(pred.prediction?.total || pred.prediction?.predicted_revenue || 0)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                              Weekend: {formatPredictionAmount(pred.prediction?.weekend || 0)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                              {pred.prediction?.confidence || 0}% confidence
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                              {formatDate(pred.created_at)}
                                            </div>
                                          </div>
                                        </div>
                                        
                                        {/* Prediction Details */}
                                        <div className="pt-3 border-t border-gray-100">
                                          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-xs">
                                            <div>
                                              <span className="text-gray-500">Prediction ID:</span>
                                              <br />
                                              <span className="font-mono text-gray-700">
                                                {pred.id ? pred.id.slice(-8) + '...' : 'N/A'}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">Category:</span>
                                              <br />
                                              <span className="text-gray-700">
                                                {pred.movie_data?.Category || 'None'}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">Budget:</span>
                                              <br />
                                              <span className="text-gray-700">
                                                {pred.movie_data?.Budget_Estimate || 'N/A'}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">Data Source:</span>
                                              <br />
                                              <span className="text-gray-700">
                                                {pred.prediction?.data_source || 'ML Model'}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">Created:</span>
                                              <br />
                                              <span className="text-gray-700">
                                                {pred.created_at ? new Date(pred.created_at).toLocaleDateString() : 'N/A'}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">Status:</span>
                                              <br />
                                              <span className="text-green-600 font-medium">Completed</span>
                                            </div>
                                          </div>
                                          
                                          
                                          {/* {pred.prediction?.breakdown && (
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                              <h6 className="text-xs font-medium text-gray-700 mb-2">Prediction Breakdown:</h6>
                                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                                
                                                {pred.prediction.breakdown.base_prediction && (
                                                  <div>
                                                    <span className="text-gray-500">Base Prediction:</span>
                                                    <br />
                                                    <span className="text-gray-700">₹{pred.prediction.breakdown.base_prediction} Cr</span>
                                                  </div>
                                                )}
                                                {pred.prediction.breakdown.regional_multiplier && (
                                                  <div>
                                                    <span className="text-gray-500">Regional Multiplier:</span>
                                                    <br />
                                                    <span className="text-gray-700">{pred.prediction.breakdown.regional_multiplier}x</span>
                                                  </div>
                                                )}
                                                {pred.prediction.breakdown.weekend_percentage && (
                                                  <div>
                                                    <span className="text-gray-500">Weekend %:</span>
                                                    <br />
                                                    <span className="text-gray-700">{pred.prediction.breakdown.weekend_percentage}%</span>
                                                  </div>
                                                )}
                                                {pred.prediction.breakdown.genre_factor && (
                                                  <div>
                                                    <span className="text-gray-500">Genre Factor:</span>
                                                    <br />
                                                    <span className="text-gray-700">{pred.prediction.breakdown.genre_factor}x</span>
                                                  </div>
                                                )}
                                                {pred.prediction.breakdown.star_power && (
                                                  <div>
                                                    <span className="text-gray-500">Star Power:</span>
                                                    <br />
                                                    <span className="text-gray-700">{pred.prediction.breakdown.star_power}x</span>
                                                  </div>
                                                )}
                                                {pred.prediction.breakdown.director_factor && (
                                                  <div>
                                                    <span className="text-gray-500">Director Factor:</span>
                                                    <br />
                                                    <span className="text-gray-700">{pred.prediction.breakdown.director_factor}x</span>
                                                  </div>
                                                )}
                                              </div>
                                              
                                             
                                              {pred.prediction.breakdown.model_predictions && (
                                                <div className="mt-3 pt-2 border-t border-gray-200">
                                                  <h6 className="text-xs font-medium text-gray-700 mb-2">Model Predictions:</h6>
                                                  <div className="grid grid-cols-3 gap-2 text-xs">
                                                    {pred.prediction.breakdown.model_predictions.rf && (
                                                      <div>
                                                        <span className="text-gray-500">Random Forest:</span>
                                                        <br />
                                                        <span className="text-gray-700">₹{pred.prediction.breakdown.model_predictions.rf} Cr</span>
                                                      </div>
                                                    )}
                                                    {pred.prediction.breakdown.model_predictions.gb && (
                                                      <div>
                                                        <span className="text-gray-500">Gradient Boost:</span>
                                                        <br />
                                                        <span className="text-gray-700">₹{pred.prediction.breakdown.model_predictions.gb} Cr</span>
                                                      </div>
                                                    )}
                                                    {pred.prediction.breakdown.model_predictions.lr && (
                                                      <div>
                                                        <span className="text-gray-500">Linear Regression:</span>
                                                        <br />
                                                        <span className="text-gray-700">₹{pred.prediction.breakdown.model_predictions.lr} Cr</span>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              )}
                                              
                                             
                                              {pred.prediction.breakdown.ensemble_weights && (
                                                <div className="mt-3 pt-2 border-t border-gray-200">
                                                  <h6 className="text-xs font-medium text-gray-700 mb-2">Model Weights:</h6>
                                                  <div className="grid grid-cols-3 gap-2 text-xs">
                                                    {Object.entries(pred.prediction.breakdown.ensemble_weights).map(([model, weight]) => (
                                                      <div key={model}>
                                                        <span className="text-gray-500 capitalize">{model}:</span>
                                                        <br />
                                                        <span className="text-gray-700">{(weight * 100).toFixed(1)}%</span>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )} */}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-8">
                                    <div className="text-4xl mb-2">📋</div>
                                    <p className="text-gray-500 italic">
                                      No predictions yet for this user
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      Predictions will appear here when the user makes them
                                    </p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {users.length === 0 && !isLoading && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">👥</div>
                  <p className="text-gray-500">No users found</p>
                  <p className="text-xs text-gray-400 mt-1">Users will appear here when they log in</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;