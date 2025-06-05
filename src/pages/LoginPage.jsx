
import { useState, useEffect } from "react";
import { apiService } from '../services/apiService';

function OTPLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // OTP Timer effect
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRequestOTP = async () => {
    if (!email.endsWith('@tsbi.in')) {
      setError('Email must be from @tsbi.in domain');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('📧 Requesting OTP for:', email);
      const result = await apiService.requestOTP(email);
      console.log('✅ OTP request successful:', result);
      
      setOtpSent(true);
      setOtpTimer(600); // 10 minutes
      setError('');
    } catch (err) {
      console.error('❌ OTP request failed:', err);
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('🔐 Verifying OTP for:', email);
      const result = await apiService.verifyOTP(email, otp);
      console.log('✅ OTP verification successful:', result);
      
      onLogin(result.user);
    } catch (err) {
      console.error('❌ OTP verification failed:', err);
      setError(err.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setOtpSent(false);
    setOtp('');
    setOtpTimer(0);
    setError('');
  };

  const handleResendOTP = async () => {
    await handleRequestOTP();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎬</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
               Box Office Predictor
            </h1>
            <p className="text-gray-600">
              {otpSent ? 'Enter verification code' : 'Secure OTP-based login'}
            </p>
          </div>

          {!otpSent ? (
            // Email Input Stage
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
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📧
                  </span>
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300"
                    placeholder="your.email@tsbi.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleRequestOTP()}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be a @tsbi.in email address
                </p>
              </div>

              <button
                onClick={handleRequestOTP}
                disabled={isLoading || !email}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                  isLoading || !email
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Sending OTP...
                  </div>
                ) : (
                  '📤 Send OTP'
                )}
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>🔒 Secure Login:</strong> No registration required! 
                  Your account will be created automatically when you login with OTP.
                </p>
              </div>
            </div>
          ) : (
            // OTP Verification Stage
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  <span className="text-green-700 text-sm">
                    OTP sent to <strong>{email}</strong>
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter 6-digit OTP
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔑
                  </span>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-center text-2xl tracking-widest font-mono"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    Check your email for the verification code
                  </p>
                  {otpTimer > 0 && (
                    <div className="flex items-center text-sm text-blue-600">
                      <span className="mr-1">⏰</span>
                      {formatTime(otpTimer)}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleVerifyOTP}
                  disabled={isLoading || otp.length !== 6}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    isLoading || otp.length !== 6
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 transform hover:scale-105 shadow-lg'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      Verifying...
                    </div>
                  ) : (
                    '🔐 Verify & Login'
                  )}
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={handleBackToEmail}
                    className="flex-1 py-2 px-4 text-gray-600 hover:text-gray-800 text-sm transition-colors"
                  >
                    ← Change Email
                  </button>
                  
                  {otpTimer === 0 && (
                    <button
                      onClick={handleResendOTP}
                      disabled={isLoading}
                      className="flex-1 py-2 px-4 text-blue-600 hover:text-blue-800 text-sm transition-colors disabled:opacity-50"
                    >
                      🔄 Resend OTP
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Admin Demo Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>🧪 Demo Info:</strong><br />
              • Use any @tsbi.in email for regular user<br />
              • Use admin@tsbi.in for admin access<br />
              • No actual emails sent in demo mode
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPLoginPage;