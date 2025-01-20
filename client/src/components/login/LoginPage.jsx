import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function LoginPage() {
  const navigate = useNavigate(); // Initialize navigate function

  // Handle form submission
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Logic for login validation (can be added here)
    
    // After successful login, navigate to dashboard
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login to BetterProposals</h2>
        <form className="space-y-4" onSubmit={handleLogin}> {/* Attach handleLogin to form submission */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <User size={20} className="text-gray-500" />
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full bg-transparent text-gray-800 outline-none pl-3"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
              <Lock size={20} className="text-gray-500" />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full bg-transparent text-gray-800 outline-none pl-3"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="rememberMe" className="text-indigo-600" />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-indigo-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
