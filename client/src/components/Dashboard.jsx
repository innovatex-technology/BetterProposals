// import { useState } from 'react';
// import { Plus, Filter } from 'lucide-react';
// import SurveyCard from './SurveyCard';

// const mockSurveys = [
//   {
//     id: 1,
//     title: "Annual Safety Inspection 2024",
//     description: "Comprehensive workplace safety assessment for Q1 2024",
//     status: "active",
//     dueDate: "Mar 31, 2024",
//     respondents: 45,
//     completionRate: 68
//   },
//   {
//     id: 2,
//     title: "Employee Satisfaction Survey",
//     description: "Gathering feedback on workplace environment and culture",
//     status: "draft",
//     dueDate: "Apr 15, 2024",
//     respondents: 0,
//     completionRate: 0
//   }
// ];

// export default function Dashboard() {
//   const [filter, setFilter] = useState('all'); // Set default filter to 'all'

//   // Filter surveys based on the selected filter state
//   const filteredSurveys = mockSurveys.filter(survey => {
//     if (filter === 'all') return true;
//     if (filter === 'active' && survey.status === 'active') return true;
//     if (filter === 'drafts' && survey.status === 'draft') return true;
//     if (filter === 'drafts' && survey.status === 'draft') return true;
//     return false;
//   });

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">Better Proposals & Inspections</h1>
//         <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700">
//           <Plus size={20} />
//           <span>Create New</span>
//         </button>
//       </div>

//       <div className="flex justify-between items-center mb-6">
//         <div className="flex space-x-2">
//           <button
//             className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200`}
//             onClick={() => setFilter('all')}
//           >
//             All
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-gray-200 text-gray-800' : 'text-gray-600'} hover:bg-gray-100`}
//             onClick={() => setFilter('active')}
//           >
//             Active
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${filter === 'drafts' ? 'bg-gray-200 text-gray-800' : 'text-gray-600'} hover:bg-gray-100`}
//             onClick={() => setFilter('drafts')}
//           >
//             Drafts
//           </button>
//         </div>
//         <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
//           <Filter size={20} />
//           <span>Filter</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredSurveys.map(survey => (
//           <SurveyCard key={survey.id} survey={survey} />
//         ))}
//       </div>
//     </div>
//   );
// }
