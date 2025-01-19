import { Calendar, Users, CheckSquare, ExternalLink, Edit, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SurveyCard({ survey }) {
  const navigate = useNavigate();
  const [shareLink, setShareLink] = useState('');

  // Handle actions based on survey status
  const handleViewDetails = () => {
    navigate(`/reports/${survey.id}`); // Navigate to the Survey Report Page with the survey ID
  };

  const handleCreateSurvey = () => {
    navigate(`/create-quotations`); // Navigate to the Create Survey Page
  };

  const handleGenerateLink = () => {
    const generatedLink = `${window.location.origin}/user-survey/${survey.id}`; // Generate a unique link
    setShareLink(generatedLink); // Store the link for copying
  };

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink); // Copy the link to the clipboard
      alert('Link copied to clipboard!'); // Display a confirmation message
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{survey.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            survey.status === 'active'
              ? 'bg-green-100 text-green-800'
              : survey.status === 'completed'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {survey.status}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{survey.description}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Calendar size={16} className="mr-1" />
          <span>{survey.dueDate}</span>
        </div>
        
        {/* Display Respondents and Completion Rate only when status is 'completed' */}
        {survey.status === 'completed' && (
          <>
            <div className="flex items-center">
              <Users size={16} className="mr-1" />
              <span>{survey.respondents} respondents</span>
            </div>
            <div className="flex items-center">
              <CheckSquare size={16} className="mr-1" />
              <span>{survey.completionRate}% completed</span>
            </div>
          </>
        )}
      </div>

      {/* Conditional Button Rendering */}
      <div className="flex justify-end gap-4">
        {survey.status === 'completed' && (
          <button
            onClick={handleViewDetails}
            className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>View Details</span>
            <ExternalLink size={16} />
          </button>
        )}

        {survey.status === 'draft' && (
          <button
            onClick={handleCreateSurvey}
            className="text-yellow-600 hover:text-yellow-800 flex items-center space-x-1"
          >
            <span>Edit Survey</span>
            <Edit size={16} />
          </button>
        )}

        {survey.status === 'active' && (
          <div>
            <button
              onClick={handleGenerateLink}
              className="text-green-600 hover:text-green-800 flex items-center space-x-1"
            >
              <span>Generate Link</span>
              <Share2 size={16} />
            </button>
            {shareLink && (
              <div className="mt-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="border px-2 py-1 text-sm w-64"
                />
                <button
                  onClick={handleCopyLink}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  Copy Link
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
