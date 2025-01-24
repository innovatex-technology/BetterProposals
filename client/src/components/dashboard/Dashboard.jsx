import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import QuotationStats from './SurveyStats';
import SurveyFilters from './SurveyFilters';
import QuotationCard from '../SurveyCard';
import { apiService } from "../common/apiService";

export default function Dashboard() {
  const [quotations, setQuotations] = useState([]);
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // State to manage the selected filter

  // Fetch quotations from the API
  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const response = await apiService({
        path: "/quotations", // Replace with your API endpoint
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError("Failed to fetch quotations: " + errorData.message);
        console.error("Failed to fetch quotations:", errorData);
        return;
      }

      const data = await response.json();
      setQuotations(data.data || []);
      setFilteredQuotations(data.data || []);
    } catch (err) {
      setError("An error occurred while fetching the quotations.");
      console.error("Error while fetching quotations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  // Filter quotations based on the selected filter
  useEffect(() => {
    if (filter === 'all') {
      setFilteredQuotations(quotations);
    } else {
      setFilteredQuotations(quotations.filter((quotation) => quotation.status === filter));
    }
  }, [filter, quotations]);

  // Calculate the counts for quotation statuses
  const counts = filteredQuotations.reduce(
    (acc, quotation) => {
      if (quotation.status === "active") acc.activeProposals++;
      if (quotation.status === "draft") acc.draftProposals++;
      if (quotation.status === "completed") acc.completedProposals++;
      return acc;
    },
    { activeProposals: 0, draftProposals: 0, completedProposals: 0 }
  );

  if (loading) {
    return <div className="text-center">Loading quotations...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Better Proposals Management</h1>
          <p className="text-gray-600">Manage and monitor your quotations</p>
        </div>
        <Link
          to="/create-quotations"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700"
        >
          <Plus size={20} />
          <span>Create New Quotation</span>
        </Link>
      </div>

      {/* Pass the counts to QuotationStats */}
      <QuotationStats 
        activeProposals={counts.activeProposals}
        draftProposals={counts.draftProposals}
        completedProposals={counts.completedProposals}
      />
      
      <SurveyFilters setFilter={setFilter} /> {/* Pass setFilter to handle filter change */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuotations.length > 0 ? (
          filteredQuotations.map((quotation) => (
            <QuotationCard key={quotation.id || quotation._id} quotation={quotation} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No quotations available</div>
        )}
      </div>
    </main>
  );
}
