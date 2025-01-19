import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Calendar, Users, CheckSquare, Edit2, ArrowLeftCircle } from 'lucide-react';

export default function SurveyReportPage() {
  const { surveyId } = useParams(); // Access the survey ID from the URL
  const navigate = useNavigate(); // Hook to handle navigation
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    // Simulate fetching survey data with dummy content
    const fetchSurvey = async () => {
      const data = {
        id: surveyId, // Dynamic ID based on the route
        title: "Employee Satisfaction Survey",
        description: "Gathering feedback on workplace environment and culture",
        dueDate: "2024-12-31",
        respondents: 150,
        completionRate: 75,
        questions: [
          {
            id: 1,
            text: "How satisfied are you with the work environment?",
            type: "multiple-choice",
            options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
            responses: [
              "Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied",
              "Satisfied", "Neutral", "Neutral", "Very Satisfied", "Dissatisfied"
            ]
          },
          {
            id: 2,
            text: "Do you feel valued by your team and management?",
            type: "multiple-choice",
            options: ["Yes", "No", "Sometimes"],
            responses: [
              "Yes", "Yes", "Sometimes", "Yes", "No", "Yes", "Sometimes", "Yes"
            ]
          },
          {
            id: 3,
            text: "What can be improved in the workplace culture?",
            type: "text",
            responses: [
              "More team-building activities", "Better communication", "Flexible working hours", "More recognition for work"
            ]
          },
          {
            id: 4,
            text: "How often do you feel stressed at work?",
            type: "multiple-choice",
            options: ["Never", "Occasionally", "Frequently", "Always"],
            responses: [
              "Occasionally", "Frequently", "Never", "Occasionally", "Frequently", "Never"
            ]
          }
        ]
      };

      setSurvey(data); // Set the survey data to the state
    };

    fetchSurvey();
  }, [surveyId]);

  if (!survey) {
    return <div className="text-center">Loading...</div>; // Show a loading state while fetching the data
  }

  const calculateResponseCounts = (responses, options) => {
    const counts = options.reduce((acc, option) => {
      acc[option] = 0; // Initialize counts for each option
      return acc;
    }, {});

    // Count the responses
    responses.forEach(response => {
      if (counts.hasOwnProperty(response)) {
        counts[response]++;
      }
    });

    return counts;
  };

  // Function to find the most selected option
  const getMostPopularOption = (counts) => {
    return Object.keys(counts).reduce((max, option) => counts[option] > counts[max] ? option : max, Object.keys(counts)[0]);
  };

  const handleBackClick = () => {
    navigate('/'); // Redirect to the dashboard
  };

  return (
    <div className="flex flex-col bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">{survey.title}</h2>
        <div className="flex space-x-4">
          <button onClick={handleBackClick} className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1">
            <ArrowLeftCircle size={16} />
            <span>Back to Dashboard</span>
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1">
            <Edit2 size={16} />
            <span>Edit Survey</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <p className="text-gray-600">{survey.description}</p>
        <div className="flex gap-4 text-sm text-gray-500 mt-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{survey.dueDate}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{survey.respondents} respondents</span>
          </div>
          <div className="flex items-center">
            <CheckSquare size={16} className="mr-1" />
            <span>{survey.completionRate}% completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Questions Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Survey Responses</h3>
          {survey.questions.map((question, index) => (
            <div key={question.id} className="mb-6">
              <h4 className="font-semibold text-lg mb-2">{question.text}</h4>
              {question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  <h5 className="font-medium">Options:</h5>
                  {question.options.map((option, i) => {
                    const responseCounts = calculateResponseCounts(question.responses, question.options);
                    const maxOption = getMostPopularOption(responseCounts);
                    return (
                      <div key={i} className={`flex justify-between text-gray-600 ${option === maxOption ? 'text-green-600 font-semibold' : ''}`}>
                        <span>{option}</span>
                        <span>{responseCounts[option]} users</span>
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Display responses */}
              {question.type === 'text' && (
                <div className="mt-2">
                  <h5 className="font-medium">Responses:</h5>
                  <ul className="text-gray-600">
                    {question.responses.map((response, i) => (
                      <li key={i}>{response}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Survey Stats</h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Respondents</span>
              <span className="text-lg font-semibold text-gray-800">{survey.respondents}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Completion Rate</span>
              <span className="text-lg font-semibold text-gray-800">{survey.completionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Due Date</span>
              <span className="text-lg font-semibold text-gray-800">{survey.dueDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
