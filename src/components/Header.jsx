import { ClipboardList, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Navigates to the login page
  };

  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ClipboardList size={24} />
            <span className="text-xl font-bold">BetterProposals</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLoginClick}
              className="flex items-center space-x-2 hover:text-indigo-200"
            >
              <User size={20} />
              <span>signup</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
