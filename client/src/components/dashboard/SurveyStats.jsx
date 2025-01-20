import { BarChart2, Users, CheckSquare } from 'lucide-react';

export default function SurveyStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <BarChart2 size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">Active Surveys</p>
            <h3 className="text-2xl font-bold">24</h3>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <BarChart2 size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">Draft Surveys</p>
            <h3 className="text-2xl font-bold">1</h3>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <BarChart2 size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">completed Surveys</p>
            <h3 className="text-2xl font-bold">24</h3>
          </div>
        </div>
      </div>
      {/* <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <Users size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-600">Total Respondents</p>
            <h3 className="text-2xl font-bold">1,234</h3>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <CheckSquare size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-600">Completion Rate</p>
            <h3 className="text-2xl font-bold">85%</h3>
          </div>
        </div>
      </div> */}
    </div>
  );
}