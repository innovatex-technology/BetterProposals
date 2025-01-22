import { useNavigate } from 'react-router-dom';
import QuotationCard from '../SurveyCard'; // Import the QuotationCard component

export default function SurveyListPage() {
  const navigate = useNavigate();
  
  // Sample dummy quotation data with added details for better rendering
  const dummyQuotations = [
    { id: 1, title: 'Quotation 1', description: 'Description for Quotation 1', createdOn: '2024-12-01', status: 'active', dueDate: '2024-12-15', totalAmount: 50000, discount: 10 },
    { id: 2, title: 'Quotation 2', description: 'Description for Quotation 2', createdOn: '2024-12-02', status: 'draft', dueDate: '2024-12-16', totalAmount: 30000, discount: 5 },
    { id: 3, title: 'Quotation 3', description: 'Description for Quotation 3', createdOn: '2024-12-03', status: 'draft', dueDate: '2024-12-17', totalAmount: 25000, discount: 8 },
    { id: 4, title: 'Annual IT Equipment Purchase', description: 'Quotation for annual IT equipment purchase', createdOn: '2024-12-04', status: 'completed', dueDate: '2024-12-18', totalAmount: 70000, discount: 15 },
    { id: 5, title: 'Employee Gifts Quotation', description: 'Quotation for employee satisfaction gifts', createdOn: '2024-12-05', status: 'completed', dueDate: '2024-12-19', totalAmount: 20000, discount: 10 },
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
        {dummyQuotations.map((quotation) => (
          <QuotationCard key={quotation.id} quotation={quotation} /> // Use QuotationCard to display the quotation
        ))}
      </div>
    </div>
  );
}
