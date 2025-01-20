import { Filter } from 'lucide-react';

export default function SurveyFilters() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-2">
        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
          All
        </button>
        <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          Active
        </button>
        <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
          Drafts
        </button>
        <button className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
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