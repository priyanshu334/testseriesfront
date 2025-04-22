'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://backend.nurdcells.com/api/users/login', formData);

      const token = response.data.token;
      localStorage.setItem('authToken', token); // Store token for authenticated requests

      setMessage(response.data.message || 'Login successful');

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'Login failed');
      } else {
        setMessage('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left - Image / Welcome */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-500 to-purple-600 justify-center items-center">
        <div className="relative z-10 p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
          <p className="text-xl mb-8">We're glad to see you again. Login to continue your journey.</p>
          <div className="flex items-center space-x-4">
            <div className="h-1 w-12 bg-white rounded-full"></div>
            <p className="font-medium">Your progress awaits</p>
          </div>
        </div>
        <img
          src="/api/placeholder/600/800"
          alt="Welcome illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Login to Your Account</h1>
            <p className="mt-3 text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition shadow-lg flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>

            {message && (
              <div
                className={`p-4 rounded-lg text-sm ${
                  message.toLowerCase().includes('success')
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account yet?{' '}
            <a href="/register" className="font-medium text-purple-600 hover:text-purple-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
