// In SurveyFilters.js
import { Filter } from 'lucide-react';

export default function SurveyFilters({ setFilter }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-2">
        <button 
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setFilter('draft')}
        >
          Drafts
        </button>
        <button 
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
        <Filter size={20} />
        <span>Filter</span>
      </button>
    </div>
  );
}
