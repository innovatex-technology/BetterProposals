import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Plus } from 'lucide-react';
import SurveyStats from './SurveyStats';
import SurveyFilters from './SurveyFilters';
import SurveyCard from '../SurveyCard';

const mockSurveys = [
  {
    id: 1,
    title: "Annual Safety Inspection 2024",
    description: "Comprehensive workplace safety assessment for Q1 2024",
    status: "active",
    dueDate: "Mar 31, 2024",
    respondents: 45,
    completionRate: 68
  },
  {
    id: 2,
    title: "Employee Satisfaction Survey",
    description: "Gathering feedback on workplace environment and culture",
    status: "draft",
    dueDate: "Apr 15, 2024",
    respondents: 0,
    completionRate: 0
  },
  {
    id: 3,
    title: "IT Equipment Audit",
    description: "Inventory check of all company IT assets and their condition",
    status: "active",
    dueDate: "Mar 25, 2024",
    respondents: 89,
    completionRate: 92
  }
];

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Better Proposals & Inspections</h1>
          <p className="text-gray-600">Manage and monitor your surveys</p>
        </div>
        <Link
          to="/create-quotations" // Link to the create survey page
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus size={20} />
          <span>Create New</span>
        </Link>
      </div>

      <SurveyStats />
      <SurveyFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSurveys.map(survey => (
          <SurveyCard key={survey.id} survey={survey} />
        ))}
      </div>
    </main>
  );
}
