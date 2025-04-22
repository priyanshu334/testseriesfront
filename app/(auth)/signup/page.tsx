"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    goal: "",
    referralCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // success or error
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Validate phone number format (basic validation)
      if (!/^\d{10,15}$/.test(formData.phone)) {
        throw new Error("Please enter a valid phone number");
      }

      // Validate password length
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const res = await axios.post("/api/users", {
        fullName: formData.fullName,
        phone: formData.phone,
        password: formData.password,
        goal: formData.goal,
        referralCode: formData.referralCode || undefined, // Send undefined if empty
      });

      setMessage({ text: "Account created successfully! Redirecting...", type: "success" });
      
      // Clear form
      setFormData({ fullName: "", phone: "", password: "", goal: "", referralCode: "" });
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Something went wrong during signup";
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-600 to-blue-500 justify-center items-center">
        <div className="relative z-10 p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8">Take the first step towards achieving your goals with us.</p>
          <div className="flex items-center space-x-4">
            <div className="h-1 w-12 bg-white rounded-full"></div>
            <p className="font-medium">Trusted by thousands</p>
          </div>
        </div>
        <img 
          src="/images/signup-bg.jpg" 
          alt="People collaborating" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="mt-3 text-gray-600">Start your journey with us today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your phone number"
                pattern="[0-9]{10,15}"
              />
              <p className="mt-1 text-xs text-gray-500">10-15 digits only</p>
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
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Create a password (min 6 characters)"
              />
            </div>
            
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                Your Goal
              </label>
              <input
                type="text"
                name="goal"
                id="goal"
                required
                value={formData.goal}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="What's your main goal?"
              />
            </div>
            
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                name="referralCode"
                id="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter referral code if you have one"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition shadow-lg flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            {message.text && (
              <div className={`p-4 rounded-lg ${
                message.type === "success" 
                  ? "bg-green-50 text-green-800" 
                  : "bg-red-50 text-red-800"
              }`}>
                {message.text}
              </div>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;