// In SurveyStats.js
import { BarChart2 } from 'lucide-react';

export default function SurveyStats({ activeProposals, draftProposals, completedProposals }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Active Proposal Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <BarChart2 size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600">Active Proposal</p>
            <h3 className="text-2xl font-bold">{activeProposals}</h3>
          </div>
        </div>
      </div>

      {/* Draft Proposal Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <BarChart2 size={24} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-600">Draft Proposal</p>
            <h3 className="text-2xl font-bold">{draftProposals}</h3>
          </div>
        </div>
      </div>

      {/* Completed Proposal Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <BarChart2 size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-gray-600">Completed Proposal</p>
            <h3 className="text-2xl font-bold">{completedProposals}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
