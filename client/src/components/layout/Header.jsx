import { ClipboardList, Bell, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

export default function Header() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const location = useLocation(); // Get the current location

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };
  
  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  // Check if the current path is the root path `/`
  const isRootPath = location.pathname === '/';
  const isLoginPath = location.pathname === '/login';
  const isSignupPath = location.pathname === '/signup';

  return (
    <header className="bg-indigo-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ClipboardList size={24} />
            <span className="text-xl font-bold">BetterProposals</span>
          </div>

          {/* Navigation Links (Hide if on root path `/`) */}
          {!isRootPath && !isLoginPath && !isSignupPath && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/profile" className="hover:text-indigo-200">
                Profile
              </Link>
              <Link to="/dashboard" className="hover:text-indigo-200">
                Dashboard
              </Link>
              <Link to="/quotations" className="hover:text-indigo-200">
              Quotations
              </Link>
              <Link to="/reports" className="hover:text-indigo-200">
                Reports
              </Link>
              <Link to="/user-survey" className="hover:text-indigo-200">
                User Surveys
              </Link>
            </nav>
          )}


          {/* Notifications and Login/Signup */}
           {/* Navigation Links (Hide if on root path `/`) */}
           {isRootPath &&(
          <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-indigo-700 rounded-full">
                <Bell size={20} />
              </button>
            <button
              onClick={handleLoginClick} // Call the handleLoginClick function when clicked
              className="flex items-center space-x-2 hover:bg-indigo-700 px-3 py-2 rounded-lg"
            >
              <User size={20} />
              <span>Login</span>
            </button>
            <button
              onClick={handleSignUpClick} // Call the handleLoginClick function when clicked
              className="flex items-center space-x-2 hover:bg-indigo-700 px-3 py-2 rounded-lg"
            >
              {/* <User size={20} /> */}
              <span>Sign up</span>
            </button>
          </div>
           )} 
        </div>
      </div>
    </header>
  );
}
