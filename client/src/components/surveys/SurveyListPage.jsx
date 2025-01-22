import { useNavigate } from 'react-router-dom';
import SurveyCard from '../SurveyCard'; // Import the SurveyCard component

export default function SurveyListPage() {
  const navigate = useNavigate();
  
  // Sample dummy survey data with added details for better rendering
  const dummySurveys = [
    { id: 1, title: 'Survey 1', description: 'Description for Survey 1', createdOn: '2024-12-01', status: 'active', dueDate: '2024-12-15', respondents: 50, completionRate: 75 },
    { id: 2, title: 'Survey 2', description: 'Description for Survey 2', createdOn: '2024-12-02', status: 'draft', dueDate: '2024-12-16', respondents: 30, completionRate: 50 },
    { id: 3, title: 'Survey 3', description: 'Description for Survey 3', createdOn: '2024-12-03', status: 'draft', dueDate: '2024-12-17', respondents: 20, completionRate: 80 },
    { id: 4, title: 'Employee Satisfaction Survey', description: 'Gathering feedback on workplace environment and culture', createdOn: '2024-12-04', status: 'completed', dueDate: '2024-12-18', respondents: 100, completionRate: 90 },
    { id: 5, title: 'Survey 5', description: 'Description for Survey 5', createdOn: '2024-12-05', status: 'completed', dueDate: '2024-12-19', respondents: 70, completionRate: 60 },
  ];

  // Assuming we are handling login state here (could be from context or global state)
  const isLoggedIn = true; // Replace with actual login state logic

  if (!isLoggedIn) {
    // If user is not logged in, redirect to login page
    navigate('/');
  }

  return (
    
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quotations List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummySurveys.map((survey) => (
          <SurveyCard key={survey.id} survey={survey} /> // Use SurveyCard to display the survey
        ))}
      </div>
    </div>
  );
}
