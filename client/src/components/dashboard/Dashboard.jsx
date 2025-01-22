import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Plus } from 'lucide-react';
import QuotationStats from './SurveyStats';
import QuotationFilters from './SurveyFilters';
import QuotationCard from '../SurveyCard';

const mockQuotations = [
  {
    id: 1,
    title: "Annual Safety Equipment Purchase",
    description: "Quotation for safety equipment for Q1 2024",
    status: "active",
    dueDate: "Mar 31, 2024",
    totalAmount: 45000,
    discount: 10
  },
  {
    id: 2,
    title: "Employee Satisfaction Gifts",
    description: "Quotation for employee gifts based on satisfaction survey",
    status: "draft",
    dueDate: "Apr 15, 2024",
    totalAmount: 12000,
    discount: 5
  },
  {
    id: 3,
    title: "IT Equipment Replacement",
    description: "Quotation for replacing company IT assets",
    status: "completed",
    dueDate: "Mar 25, 2024",
    totalAmount: 75000,
    discount: 15
  }
];

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Better Proposals Management</h1>
          <p className="text-gray-600">Manage and monitor your quotations</p>
        </div>
        <Link
          to="/create-quotations" // Link to the create quotation page
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus size={20} />
          <span>Create New Quotation</span>
        </Link>
      </div>

      <QuotationStats />
      <QuotationFilters />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockQuotations.map(quotation => (
          <QuotationCard key={quotation.id} quotation={quotation} />
        ))}
      </div>
    </main>
  );
}
